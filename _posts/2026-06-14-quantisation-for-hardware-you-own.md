---
layout: post
lang: en
permalink: /writing/quantisation-for-your-hardware/
title: "Picking a quantisation for the hardware you already have"
tags: [llama.cpp, quantisation, local-LLM, GGUF]
description: >-
  The VRAM arithmetic that decides which model you can actually run, why the KV
  cache is the part people forget, and why I usually end up with a smaller model
  at higher precision rather than the reverse.
---

The question I get asked most about local inference is which model to run. The
useful version of that question is: given this much VRAM, what is the best thing
that fits — *including everything else that has to fit alongside it.*

## The arithmetic

Weights first. A GGUF quantisation's name tells you roughly the bits per weight:
`q8_0` is about 8, `q4_K_M` about 4.5 in practice once you account for the
mixed precision it uses on sensitive tensors. So:

```
weights ≈ parameters × bits_per_weight ÷ 8
```

A 7B at `q4_K_M` is roughly 7e9 × 4.5 ÷ 8 ≈ 3.9 GB. At `q8_0`, about 7 GB.

That is the number everyone computes, and then they are surprised when a 3.9 GB
model does not comfortably fit in 6 GB of VRAM. The missing piece is the KV
cache, which grows with context length and is not small:

```
kv_cache ≈ 2 × layers × kv_heads × head_dim × context × bytes_per_element
```

The `2` is keys and values. The thing to notice is that context is a linear
term, so the cache you need at 32k context is eight times what you need at 4k.
On a 7B-class model with a long context this can rival the weights. I have seen
people fit a model, set `--ctx-size 32768` because more is better, and get an
out-of-memory error they blame on the model.

Then add a few hundred megabytes for the compute buffers, plus whatever your
desktop environment is already holding. Budget for the total, not the weights.

## The trade I keep making

Given a fixed VRAM budget you can spend it on more parameters at lower
precision, or fewer parameters at higher precision. The received wisdom is that
more parameters wins, and for general knowledge and open-ended reasoning that is
usually true.

For the work I actually do with local models it frequently is not. Tool-calling
and structured output degrade badly under aggressive quantisation — worse, in my
experience, than prose does. A heavily quantised larger model produces JSON with
a trailing comma, or drifts from the schema in the way I wrote about in
[the post on small models with real tools]({{ '/writing/small-models-real-tools/' | relative_url }}).
A smaller model at `q8_0` is more likely to emit exactly the shape you asked
for.

That is why the model in that screenshot is `qwen3-1.7b-q8_0` rather than
something larger at `q4`. For a pipeline whose value depends on a tool call
being well-formed, format reliability is worth more than breadth of knowledge,
and near-full precision on a small model buys format reliability.

The rules of thumb I have settled on:

- **Below `q4`, be suspicious.** `q3` and `q2` variants exist and they measure
  acceptably on benchmarks that score prose. Structured output falls off a cliff.
- **`q4_K_M` is the sensible default** for general chat and drafting where you
  want the largest model you can fit.
- **`q8_0` for anything with a schema** — tool calls, JSON extraction, function
  calling — if you can afford the memory at the parameter count you need.
- **Cut context before you cut precision.** Most tasks do not need 32k. Fitting
  `q8_0` at 8k beats `q4` at 32k for the majority of real work.

## Measure it on your own tasks

All of the above is a starting point, not a conclusion, and the only thing that
settles it is measuring on the work you actually care about. Public benchmarks
answer a different question than "does this model reliably produce my tool
schema on my prompts."

This is why AIOS has a bench app in it: I wanted to point the same handful of
representative tasks at several model-and-quantisation combinations and compare
tokens per second, time to first token, and — the part benchmarks skip — how
often the output was structurally valid. That last number is what decides it for
agent work, and it is not in any leaderboard.

Ten prompts drawn from your real workload, run against three candidates, will
tell you more than any amount of reading. Including reading this.

## Offload, if you must

If a model genuinely will not fit, `llama.cpp` will put some layers on the GPU
and run the rest on CPU. It works, and it is much slower — the transfer across
the bus dominates, and throughput drops by an order of magnitude rather than a
few percent.

Partial offload is a reasonable answer for a batch job you leave running. It is
not a reasonable answer for anything interactive, and it is usually a signal
that a smaller model at a sensible quantisation was the right call from the
start.
