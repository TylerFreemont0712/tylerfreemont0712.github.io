---
pid: rootward
lang: en
title: Rootward
permalink: /projects/rootward/
alt_url: /ja/projects/rootward/
dwg: TF-101
sheet: P1
og_image: /assets/og/rootward.png
description: >-
  Rootward — a programming roguelite in Godot 4.7 where every spell is a real
  Python or JavaScript function run in a WASI sandbox, and Big-O decides who
  acts first. Case study by Tyler Freemont.
tagline: >-
  A roguelite deckbuilder where your hand of cards is a program, every card is a
  real algorithm in Python or JavaScript, and Big-O decides who acts first.
links:
  - { label: Source on GitHub, url: "https://github.com/TylerFreemont0712/rootward-godot" }
  - { label: TypeScript prototype, url: "https://github.com/TylerFreemont0712/rootward" }
tb:
  - [Type, Single-player roguelite deckbuilder]
  - [Engine, "Godot 4.7, typed GDScript (untyped code is a compile error)"]
  - [Platform, "Desktop, Linux x86_64 · unreleased"]
  - [Built, "Sep–Oct 2026 · ~10 days in Godot, after a ~6-day TypeScript prototype"]
  - [Languages, English · Japanese]
  - [Status, "Playable end to end · balance early · bug audit open"]
dims:
  - { v: "31k", k: "lines of typed GDScript" }
  - { v: "390", k: "tests in 57 gdUnit4 suites" }
  - { v: "139", k: "algorithm cards, with upgrades" }
  - { v: "216", k: "functions, each in Python and JS" }
  - { v: "20", k: "guardian bosses" }
  - { v: "44", k: "architecture decision records" }
fig: "Fig. 2 — Assembly: how a cast flows from the scenes to the sandbox and back · Scale NTS"
notes:
  - t: Rules core
    d: Pure and seeded — no nodes, no file or network I/O, all randomness from one ported sfc32 generator, state as plain dictionaries that save as JSON.
  - t: Run session
    d: Takes commands from the scenes and memoises each spell run by its exact input, so the preview the player reads is the very run the cast lands.
  - t: Sandbox host
    d: One wasmtime process per job, off the main thread, with time, memory and output caps, a fresh /work folder, a read-only standard library and no network.
  - t: wasmtime guest
    d: CPython 3.14 and QuickJS-ng compiled to WASI, pinned by SHA-256. A tracer counts loops and recursion identically in both languages.
  - t: TypeScript fixtures
    d: 36 seeded runs and 3,789 steps recorded from the prototype engine. The port had to reproduce them before it was allowed to diverge.
  - t: Balance bot
    d: Tries up to ~2,000 card orderings a turn through the real sandbox and rules. It set foe HP so the bot wins 53% of runs, with every paradigm at 33% or better.
toc:
  - { id: problem, label: Problem }
  - { id: play, label: How it plays }
  - { id: sandbox, label: The sandbox }
  - { id: trust, label: Trusting the output }
  - { id: port, label: Proving the port }
  - { id: content, label: Content & balance }
  - { id: deviations, label: Known deviations }
---

## <span class="no">01</span> Problem {#problem}

Games that teach programming usually either simulate code with a toy language
or ask you to write something and grade it off to the side of the fun. I wanted
the code itself to be the mechanic: a spell that does damage because of what a
real function returns, so that choosing the better algorithm is also the better
move. It also had to be playable in Japanese as well as English.

## <span class="no">02</span> How it plays {#play}

A run starts by drafting a **paradigm** — Divide &amp; Conquer, Search &amp;
Index, Greedy, Brute Force or Dynamic Programming — each a school of algorithms
with its own speed class. The cards are real algorithms (merge sort, binary
search, knapsack, Kadane's, quickselect), each a function from a volley of bolts
to a volley of bolts, written in both Python and JavaScript. You play cards left
to right into a five-slot `main.py`, and that program is what runs.

{% include shot.html src="/assets/program-images/rootward-cast.jpg" w=1600 h=900 label="Detail A" alt="A fight in Rootward. A witch casts a glowing magic circle toward a fire sprite named Tally Wisp. Below the stage, a program panel shows main.py built from four cards, each call annotated with its complexity and operations, and a race bar where the player's 21 operations sit just ahead of the Wisp's tempo of 28." caption="A cast landing. The code on the right is the program the four played cards wrote; every call is annotated with its complexity, the <code>n</code> it was given and the ops it cost. 21 ops against the Wisp's tempo of 28, so the volley lands first — and the game says so." %}

The program's work races the foes' tempo. Work is each card's Big-O applied to
the volley size the sandbox actually measured at that stage, so a card that
grows the volley pays for it. Any foe whose tempo is below your work acts before
your volley lands, and a program over the ring's ops budget times out and lands
nothing. An O(n²) brute-force card buys enormous damage at the price of
initiative.

{% include shot.html src="/assets/program-images/rootward-race.webp" w=1600 h=900 label="Detail B" alt="A regular fight in the Interrupt Foundry against a Segfault Specter and a Race Condition Imp. Each foe shows its intent and tempo in ops, the hand holds six cards with Big-O badges, main.py is still empty, and the race bar runs from 0 to the ring's 1024-op budget." caption="The speed race before a turn: each foe's intent carries its tempo (the Imp acts at 20 ops, the Specter at 64), the hand shows each card's Big-O, and the race bar runs to the ring's 1,024-op budget." %}

<div class="shot-pair">
{% include shot.html src="/assets/program-images/rootward-paradigms.jpg" w=1296 h=580 label="Detail C" alt="The paradigm draft: three cards offering Dynamic Programming at O(n·H), Search and Index at O(log n) and Brute Force at O(n squared), each with two signature algorithm cards." caption="The draft. The speed class on each paradigm is the trade-off the rest of the run plays out." %}
{% include shot.html src="/assets/program-images/rootward-map.jpg" w=1600 h=900 label="Detail D" alt="The route map of one ring: a branching network of rooms for fights, elites, rests, forges and caches over a painted machine shaft." caption="One ring of the descent. Maps come from the run's seed, so a bug report replays from the seed and the commands." %}
</div>

## <span class="no">03</span> The sandbox {#sandbox}

The sandbox was the riskiest piece, so it came first. Player programs must never
run in the game's own process, and Godot's WebAssembly add-on has no WASI
filesystem, which rules out CPython. The answer was the `wasmtime` CLI as a
sidecar process per job, running CPython and QuickJS compiled to WASI, all three
pinned by version and SHA-256.

- A job sees only a fresh `/work` folder and a standard library made read-only on
  the host — WASI has no `chmod`, so a program cannot undo it. No network, no
  environment, no child processes.
- Time is enforced by epoch interruption, memory and output are capped, and a
  wall-clock backstop kills the process. Exit codes map to `ok`,
  `compile-error`, `runtime-error`, `timeout` and `oom` — a crash becomes a game
  outcome, not an exception.
- 22 tests ported from the prototype's malicious-code suite hold that line:
  endless loops, memory bombs, runaway output, host-file access and a symlink
  escape during cleanup.
- Precompiling to `.cwasm` took start-up from about 0.8 s to 0.03 s. A turn now
  measures about **74 ms in Python and 11 ms in JavaScript** on a background
  thread — fast enough that the spell preview is a real run too.

{% include shot.html src="/assets/program-images/rootward-program.jpg" w=1600 h=900 label="Detail E" alt="The program panel stretched over the stage to show all of main.py: a program function calling salvo, fire_constant, merge_strike and amplify in order, then each card's source with comments, and a summary line reading initiative, one bolt, 33 damage." caption="The whole program, read before running it. Each card's source is the real function, comments included, and the footer is the preview of what this exact program will do." %}

## <span class="no">04</span> Trusting the output {#trust}

Player code returns data, and the rules — not the code — decide what it means.
Every bolt is clamped (at most 128 bolts, 9,999 power) and resolved against
weaknesses, shields and foe traits. The rules live in a pure, seeded layer — no
nodes, no I/O, no `randf()` — and the scenes only render state and send
commands. Saves are atomic, written after every command.

Because the rules are data-driven, guardians can be built around computer-science
ideas: the **Cache Lich** keeps an LRU cache of the last six powers that hit it
and shrugs off repeats; **Karp** is stunned if some of your bolts sum exactly to
its target, a subset-sum certificate; **the Quine** reprints your last program at
you; and **the Mutator** applies mutation-testing operators (`>=` → `>`,
`max` → `min`) to your cards' real source and runs the mutants.

## <span class="no">05</span> Proving the port {#port}

Rootward started as a TypeScript browser game: a React client and a local
Fastify server running Python in Pyodide and JavaScript in QuickJS. After about
six days I decided it would become a larger game and rewrote it in Godot — a new
repository rather than a migration, because Godot has no JavaScript host for
those sandboxes.

The rules were ported first and proven against the old engine: the GDScript
rules reproduce **36 seeded runs and 3,789 steps** and 2,517 recorded unit
calls, with the 32-bit random number generator emulated bit for bit (masks and a
split `imul`). Only then were they allowed to diverge. A rule changed on purpose
re-records its reference results, and the diff is reviewed like code.

## <span class="no">06</span> Content &amp; balance {#content}

Content is treated like code. Cards are JSONC with schemas, plus a `.py` and a
`.js` file each; a validation script runs all 375 worked examples in the sandbox
in both languages. Japanese overlays are keyed by the English text, and the
content is fully covered (653 of 653 strings).

{% include shot.html src="/assets/program-images/rootward-guardians.webp" w=1200 h=1067 label="Detail F" alt="A labelled grid of sixteen guardian sprites, among them ouroboros, unhandled-exception, short-circuit, cache-lich, malloc-matron, page-fault, thunk, call-stack-colossus, int-max, profiler, livelock-dancer, the-quine, root-compiler, mutator and karp." caption="Sixteen of the twenty guardians, each built around a programming idea. Art and music come from a scripted generative pipeline (ComfyUI, Blender-retargeted VRM characters); every asset has a fallback, so a missing file never breaks a screen." %}

Balance is set by simulation. A bot enumerates up to about 2,000 orderings of
the hand each turn, runs them through the real sandbox in one job, simulates each
with the real rules and plays the best. Comparing variants on the same seeds set
foe HP per ring to ×2.4, ×3.6 and ×4.6 — a 53% bot win rate, with every
paradigm at 33% or better.

It was built with AI coding agents under a written working agreement kept in the
repository: tests first for the rules and the sandbox, untyped GDScript is a
compile error, a screenshot before anything visible counts as done, and 44
decision records for choices a later reader might question.

<div class="deviations">
<h3 id="deviations">△ Known deviations</h3>
<ul>
<li>Desktop only, developed and tested on Linux. The ~100 MB sandbox runtime is fetched by a script, not stored in the repository.</li>
<li>No web build yet: every cast launches a native process, which a browser cannot. A port would run QuickJS and Pyodide in the browser, as the prototype did.</li>
<li>Players compose pre-written card functions; writing free-form code was a feature of the TypeScript prototype.</li>
<li>Balance is early, and a self-audit from 1 October lists 33 open findings, several rated high.</li>
<li>Generated music uses a model licensed for non-commercial use, which would have to change before any release.</li>
</ul>
</div>
