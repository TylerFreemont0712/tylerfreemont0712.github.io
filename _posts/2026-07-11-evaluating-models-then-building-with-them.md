---
layout: post
lang: en
permalink: /writing/evaluating-then-building/
title: "Two years of grading model output, then building on it"
tags: [RLHF, evaluation, agents]
description: >-
  I have written RLHF preference data since 2024 and spent the last stretch
  building agent systems. The evaluation work changed how I build, mostly by
  making me distrust output that looks right.
---

Since January 2024 I have produced RLHF preference data and written technical
justifications on code, maths and reasoning tasks used in frontier-model
training. Since March I have been building production LLM infrastructure. Those
two jobs sound adjacent and are, but the useful part was not the overlap — it
was how much the grading work changed my defaults as a builder.

## Plausible and wrong is the default failure

If you rank model output for long enough you stop reading it as prose and start
reading it as a claim to be checked. The failure that dominates is not garbled
output or refusals. It is output that is well-organised, correctly formatted,
confident, and wrong in one specific load-bearing place.

In code, that means a function called with the wrong arity, a variable that was
never defined, an import of a module that does not exist, an off-by-one in the
loop bound. Everything around the error is fine. The error is one token. And
because the surrounding structure is competent, the whole thing reads as correct
until you actually check the one thing that matters.

Grading thousands of these gives you a fairly unpleasant instinct: the more
fluent the output, the more carefully you check it. That instinct is the single
most useful thing I brought into building systems.

It is also, directly, why
[LLM Council]({{ '/projects#llm-council' | relative_url }}) validates generated
code at the AST level before anything is written to disk. Parse the output, walk
the tree, check that names resolve and calls match their definitions. Not because
AST checking is clever, but because after enough evaluation work you stop
believing that code which *looks* right *is* right, and you want the machine to
check the boring properties before a human spends attention on it.

## Agentic evaluation is different work

Rating a single response is a bounded task: here is a prompt, here is an answer,
is it good. Rating an agent trajectory is not. You are looking at a sequence of
tool calls and intermediate reasoning, and the interesting question is where it
first went wrong — which is frequently several steps before the point where it
became visibly wrong.

A trajectory can reach the correct final answer through a broken path: a tool
call that failed silently, a retry that succeeded for an unrelated reason, an
assumption that happened to hold. Scored on the final answer alone, that passes.
It should not, because the path will not generalise.

That reframed how I log agent runs. The transcript needs to make the *decision
points* recoverable, not just the outcome — which tool was called, what came
back, what the model did with it. It is the same reason the
[web search screenshot]({{ '/projects#aios' | relative_url }}) keeps raw tool
output visible above the summary. If you can only see the answer, you can only
evaluate the answer, and the answer is the least informative part of a failed
run.

## Instruction-following is a real axis

Evaluation work makes you separate two things that get conflated: is the answer
correct, and did the model do what was asked. A response can be technically
excellent and still fail, because the request was for three bullet points and it
produced nine paragraphs, or the request specified a format and it improvised.

This matters more in systems than in chat. A chat user shrugs and rephrases. A
pipeline parsing that output breaks. When I write a system prompt now I am much
more explicit about format than I used to be, and much more inclined to validate
the shape rather than trust the instruction was followed — because I have
graded a very large number of responses that ignored one clause of a four-clause
instruction while nailing the other three.

## What it does not teach you

Being honest about the limits: evaluation work does not teach you to build
systems. It teaches you what bad output looks like, which is a specific and
narrow skill. It says nothing about deployment, latency budgets, memory, or
whether a design will survive contact with real users. Those I learned from
infrastructure work and from things breaking.

But there is one thing the combination gives you that neither gives alone. When
a system I built produces a wrong answer, I have a decent prior on whether the
model failed, the prompt failed, the retrieval failed, or the plumbing failed.
Most debugging time in LLM systems goes to answering that question, and having
spent two years looking at exactly how models go wrong shortens it considerably.
