---
pid: aios
lang: en
title: AIOS
permalink: /projects/aios/
alt_url: /ja/projects/aios/
dwg: TF-102
sheet: P2
og_image: /assets/og/aios.png
description: >-
  AIOS — a self-hosted AI workspace for the whole LAN: local and cloud models
  behind one provider layer, a permissioned coding agent with guardrails built
  for small local models, MCP, and a model benchmark graded entirely in code.
tagline: >-
  A self-hosted AI workspace that serves a whole local network from one machine —
  and measures the models it runs instead of trusting them.
links:
  - { label: Source on GitHub, url: "https://github.com/TylerFreemont0712/AIOS-v1" }
  - { label: Voice & auth branch, url: "https://github.com/TylerFreemont0712/AIOS-v1/tree/voice-streaming-transducer" }
tb:
  - [Type, "Self-hosted web desktop + Node server"]
  - [Runtime, "Node (ESM, no build step for app code) · Express 5 · ws · node:sqlite"]
  - [Serves, "Any device on the LAN, paired by token"]
  - [Built, "Jul–Sep 2026 · main plus a 17-commit voice branch"]
  - [Status, "In daily use · single user"]
dims:
  - { v: "39k", k: "lines of first-party code" }
  - { v: "86", k: "built-in agent tools" }
  - { v: "241", k: "REST routes" }
  - { v: "22", k: "benchmark tests" }
  - { v: "194", k: "executed edge-case assertions" }
  - { v: "304", k: "end-to-end assertions" }
fig: "Fig. 2 — Assembly: one hub, an agent loop, and a benchmark that shares its provider layer · Scale NTS"
notes:
  - t: Hub server
    d: Express REST and a WebSocket hub on port 7777. Apps stay mounted when you switch away, so an agent run or a terminal session survives navigation.
  - t: Agent loop
    d: Every write goes through an approval gate. Each file the agent writes is syntax-checked at once (esbuild, JSON.parse, Python ast, bash -n) and failures go back in the tool result.
  - t: Tool belt
    d: 86 built-ins in 10 groups, MCP servers over stdio and streamable HTTP, and tools the agent writes itself — run in node:vm, with no write access unless declared.
  - t: Provider layer
    d: One stream shape for Anthropic, Ollama and OpenAI-compatible servers, reasoning included from each, plus process management for llama-server.
  - t: Bench
    d: 22 tests graded in code — parsed, matched or executed — never by another model. Time to first token and tokens per second are recorded next to quality.
toc:
  - { id: problem, label: Problem }
  - { id: approach, label: Approach }
  - { id: guardrails, label: Guardrails }
  - { id: bench, label: The benchmark }
  - { id: measuring, label: Measuring, not guessing }
  - { id: deviations, label: Known deviations }
---

## <span class="no">01</span> Problem {#problem}

Using capable models at home or in a small office means either sending
everything to a third-party API or running a separate tool for each task — one
app for chat, another for coding, another for notes, none aware of the others,
and all tied to the one machine with the GPU. I wanted a single place that runs
on the box with the hardware and is usable from any device on the network, with
local models as the default and cloud providers as an opt-in.

## <span class="no">02</span> Approach {#approach}

A zero-build Node server on port 7777 serves a web desktop to the LAN and holds
the long-lived state. One provider layer speaks three wire protocols — Anthropic
Messages, Ollama and OpenAI-compatible (llama.cpp, LM Studio, vLLM) — and AIOS
manages `llama-server` itself, so where inference happens is a per-conversation
choice, not an architectural one. On top sit sixteen apps: chat, a coding agent,
research, an Obsidian-backed vault, models &amp; bench, files, real terminals
(node-pty), a planner and more.

{% include shot.html src="/assets/program-images/aios-agent-web-search.png" w=748 h=646 label="Detail A" alt="A chat turn in AIOS answering a question about current events. A collapsed reasoning panel reads 'Thought for 3s'. Below it a web_search tool call, marked done, shows its query and the raw results it pulled back through a self-hosted SearXNG instance. The model's answer follows, and a footer reports 135.4 tokens per second at 98 milliseconds to first token." caption="A tool call end to end on a 1.7B model running locally: reasoning, a <code>web_search</code> through self-hosted SearXNG, the raw sources it read, then the answer — 135.4 tok/s and 98 ms to first token in this run. The raw results stay visible on purpose: when a small model is wrong, you need to see whether retrieval or reasoning failed." %}

## <span class="no">03</span> Guardrails for small models {#guardrails}

The coding agent explores a project with `list_dir`, `glob`, `grep` and
`read_file`, changes it with `write_file` and `edit_file`, runs `bash`, and
reaches the network with `web_search` — so a model's output is handed real write
access to a real filesystem. Small local models follow tool schemas far less
reliably than frontier models, so the design is built around how they fail:

- **A lean tool loadout.** Only a small core of tool schemas is sent each turn;
  the rest are listed in a short directory and loaded on demand with a
  `load_tools` meta-tool. Sending every schema had cost about 4,200 tokens of a
  32k local context window on every turn.
- **Check every write.** Each file the agent writes is syntax-checked
  immediately, and the failure is appended to that same tool result, so the model
  sees its mistake while it still has the context to fix it. In review mode,
  files with remaining problems go back as fix requests for a bounded number of
  rounds.
- **Approve, then act.** Write tools pass an approval gate (allow, always,
  deny), and MCP tools without a read-only hint are gated the same way. File tools
  are confined to the project root; `bash` starts there and runs with a scrubbed
  environment.
- **Learn per project.** The agent turns its own mistakes into short
  "next time" lessons stored with the project, and coding playbooks are chosen by
  the detected stack and fitted into the prompt within a budget.
- **Constrain the format.** Where output has to be machine-read — receipt
  parsing, for example — a JSON schema is compiled by llama.cpp into a grammar, so
  the model cannot return malformed JSON.

<div class="shot-pair">
{% include shot.html src="/assets/program-images/aios-home-services.png" w=733 h=692 label="Detail B" alt="AIOS home screen. A services panel shows live status for each dependency: SearXNG connected, llama.cpp serving qwen3-1.7b-q8_0, Ollama not running, Anthropic with no key, the Obsidian vault connected, GitHub authenticated. Below, a grid of twelve apps." caption="Every dependency reports its own health. A stopped Ollama or a missing API key is a normal state, not an error." %}
{% include shot.html src="/assets/program-images/aios-files-editor.png" w=955 h=647 label="Detail C" alt="The AIOS file browser and editor: a tree of the repository on the left and a CodeMirror editor with line numbers on the right, showing AIOS's own README." caption="Editing AIOS's own source from inside AIOS, so a change the agent proposes can be read and corrected where it was made." %}
</div>

## <span class="no">04</span> The benchmark {#bench}

Choosing a local model by reputation does not work: what matters is how it does
on your hardware, on your kind of task. So AIOS has a benchmark, and it is
**graded entirely in code** — parsed, regex-matched or executed — never by another
LLM.

- **22 tests in 8 categories**, built to be hard to pass by accident: a null
  trap in strict JSON, distractor twins beside each extraction target, needles
  planted at 5%, 50% and 95% depth of about 6,000 tokens of noise, a question
  about a paper that does not exist, a choice between two near-identical tools,
  and a format rule that has to survive four turns.
- **35 coding problems run for real** in Python, Node, Go and C++ against
  **194 edge-case assertions**, with per-case breakdowns — edge cases are where
  models actually separate.
- **Reasoning models get a fair budget.** The token cap is split into answer
  plus thinking, scaled to the reasoning level; a flat cap had been scoring
  reasoning models zero by cutting them off mid-thought.
- **Quality and speed together.** Each run records time to first token and
  tokens per second. The leaderboard keeps only the latest result per model and
  test, names a best model per category, and ranks by
  `value = 0.7 · quality + 0.3 · min(1, tok/s ÷ 40)`. A sweep mode serves and
  benches every local GGUF in turn.

## <span class="no">05</span> Measuring, not guessing {#measuring}

The newest work — a voice stack, real authentication and Tailscale remote
access — lives on the
[`voice-streaming-transducer`](https://github.com/TylerFreemont0712/AIOS-v1/tree/voice-streaming-transducer)
branch (+20,000 lines), and it brought two more harnesses with it:

- **Speech recognition** is scored by word error rate on synthesised audio,
  with the caveat stated in the script that absolute numbers are optimistic and
  only relative comparisons hold. Three fixes took streaming WER from
  **39.7% to 28.7%, 25.2% and then 20.3%**. Contextual biasing was tried too; it
  made things worse (25.0% → 26.4%), so it stayed off.
- **Receipt reading** is scored against receipts I confirmed by hand. The
  learned per-shop corrections are switched off by default when benchmarking,
  because replaying them would be handing the model the answer sheet.

<div class="deviations">
<h3 id="deviations">△ Known deviations</h3>
<ul>
<li>Built for a trusted home or small-office network and a single user. On <code>main</code>, LAN access relies on a pairing token; the voice branch adds proper authentication with lockout.</li>
<li><code>bash</code> is approval-gated and starts in the project folder, but it is not sandboxed.</li>
<li>Agent quality tracks the model: a small local model is noticeably worse at multi-step edits than a frontier one — which is why the benchmark exists.</li>
<li>The tok/s figure above is a single run from a screenshot, not a benchmark result.</li>
</ul>
</div>
