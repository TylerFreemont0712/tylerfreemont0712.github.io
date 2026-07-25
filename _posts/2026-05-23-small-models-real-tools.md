---
layout: post
lang: en
permalink: /writing/small-models-real-tools/
alt_url: /ja/writing/small-models-real-tools/
title: "What breaks when you give a 1.7B model real tools"
tags: [agents, local-LLM, tool-calling, llama.cpp]
description: >-
  A small local model with filesystem and shell access does not fail the way a
  frontier model fails. Notes from building an agent runtime around models small
  enough to run on hardware I own.
---

The agent in [AIOS]({{ '/projects#aios' | relative_url }}) has real tools. It
lists directories, greps, reads and writes files, runs `bash`, and searches the
web. Pointing a frontier model at that set is mostly a solved problem. Pointing
a 1.7B model at it is a different exercise, and most of what I learned came from
watching the small model fail in ways the big one never does.

## Failure is malformed, not wrong

The mental model people bring to this is that a small model will make bad
decisions — pick the wrong file, write worse code. That happens, but it is not
the thing that breaks the run. What breaks the run is that the model produces a
tool call that is *nearly* valid.

The shapes repeat. A parameter that should be a string arrives as a
single-element list. A required field is omitted because the model inferred it
from earlier context and assumed you would too. An optional field is invented
because it was in a different tool's schema three turns ago. Arguments come back
as a JSON string containing JSON rather than an object. A path is relative when
the schema said absolute.

A frontier model does these things occasionally. A 1.7B model does them
constantly, and the difference is qualitative rather than quantitative: you
cannot treat malformed calls as an exception path when they are a substantial
fraction of all calls. They are the normal case, and the tool layer is where
they have to be absorbed.

## Reject specifically or watch it loop

The instinct is to be permissive — coerce the list to a string, fill in the
missing field, accept what you can guess. I tried that and it is worse than it
sounds, because a coerced call that runs and does the wrong thing is far harder
to recover from than a rejected call. The model gets a plausible success, builds
on it, and you find out four turns later when something unrelated breaks.

Strict validation is right. But strictness alone produces the other failure
mode, which is the loop: reject, model retries with the same mistake, reject,
retry. I have seen a model make eight identical malformed calls in a row because
the error told it *that* it was wrong and not *how*.

What actually breaks the loop is an error message written for the model rather
than for a log file. Not `ValidationError: expected str`. Something closer to:

```
edit_file failed: "path" must be a string, received a list of one string.
Call it again with path="src/main.py" instead of path=["src/main.py"].
```

Naming the field, the received shape, the expected shape, and a corrected
example. That last part does most of the work. Small models are far better at
copying a demonstrated fix than at deriving one from a description of a rule.

The other half is a retry budget with a change of strategy. After two identical
failures, more retries do not help. Better to stop, surface the failure to the
user, and let the run end honestly than to spend twenty turns and a lot of
tokens converging on nothing.

## Keep the schema surface small

The strongest lever is not error handling — it is not showing the model tools it
does not need.

Reliability drops noticeably as the number of simultaneously available tools
grows, and it drops faster than you would expect. With a handful of tools a
small model picks correctly. With twenty it starts reaching for the wrong one,
and it starts blending schemas: calling tool A with tool B's parameters, because
both are in context and both look reasonable.

Scoping tools to what the current task plausibly needs helped more than any
prompt change I made. It also has a pleasant second-order effect: a smaller
schema means a shorter system prompt, which on a small model with a modest
context window is real budget you get back for the actual work.

## Show the tool output

The screenshot on the [project page]({{ '/projects#aios' | relative_url }})
shows a `web_search` call with the raw results left visible above the model's
summary. That is deliberate, and it is the single most useful debugging decision
in the whole system.

When a small model gives you a wrong answer, there are two candidate
explanations: the retrieval was bad, or the reasoning over good retrieval was
bad. Those have completely different fixes — one is a search backend problem,
the other is a model or prompt problem. If you collapse the tool output into the
final answer, you cannot tell them apart, and you will spend an afternoon tuning
a prompt to fix what was actually a search returning nothing useful.

Leaving the raw output in the transcript costs some visual clutter and buys you
the ability to diagnose. On a small model, where things go wrong often, that
trade is not close.

## What small models are genuinely good at

It would be easy to read the above as an argument for just using a bigger model,
so: the 1.7B model in that screenshot answered a real question, through a real
search, at **135 tokens per second with 98 ms to first token**, on hardware
sitting in my apartment, with nothing leaving the network.

That latency changes what the thing is *for*. Single-step, well-scoped work —
summarise this, search and cite, extract these fields, rename these files — is
where a small local model is not a compromise but the better option, because a
frontier API round trip is slower than the whole local inference. Give it a
narrow tool set and a task that fits in one or two steps and it is genuinely
good.

The multi-step autonomous refactor is where it falls apart, and no amount of
tool-layer engineering fixes that. Knowing which side of the line a task sits on
is most of using these models well.
