---
pid: ty-work-hub
lang: en
title: Ty Work Hub
permalink: /projects/ty-work-hub/
alt_url: /ja/projects/ty-work-hub/
dwg: TF-103
sheet: P3
og_image: /assets/og/ty-work-hub.png
description: >-
  Ty Work Hub — a Windows and Linux desktop workspace (Python, PyQt6) that puts
  tickets, Git and SVN, time tracking and notes in one window, with a local LLM
  that drafts only from evidence it is handed. Case study by Tyler Freemont.
tagline: >-
  One window for a working day of tickets, Git and SVN, time tracking and notes —
  with a local LLM that drafts only from evidence it is handed.
links:
  - { label: Source on GitHub, url: "https://github.com/TylerFreemont0712/ty-work-hub" }
tb:
  - [Type, Desktop workspace for day-to-day software work]
  - [Platform, "Windows and Linux · CI on both"]
  - [Stack, "Python 3.12 · PyQt6 · git and svn CLIs · llama.cpp"]
  - [Built, "Aug–Sep 2026 · public since 17 Sep"]
  - [Status, "In use · dated releases with verification notes"]
dims:
  - { v: "15k", k: "lines of Python (code only)" }
  - { v: "521", k: "assertions in 6 test suites" }
  - { v: "9", k: "workspaces" }
  - { v: "10k", k: "tickets, constant widget count" }
  - { v: "2", k: "operating systems in CI" }
fig: "Fig. 2 — Assembly: the evidence the local model is allowed to draft from · Scale NTS"
notes:
  - t: UI shell
    d: Nine workspaces around the selected ticket. Tables are virtual models with painted cells — no widgets per row — and a test holds that at 10,000 tickets.
  - t: Git / SVN
    d: Every git call uses literal pathspecs, no terminal prompts and bounded waits. A commit must match the SHA-256 of the staged patch the user previewed.
  - t: Local LLM client
    d: A strict JSON schema, enforced by llama.cpp as a grammar. Context is trimmed by priority, and the files-touched list comes from the parsed patch — never from the model.
  - t: Timer engine
    d: Time accounting with no Qt and no I/O. Sessions are stored as they happened and the work schedule is applied on read, so changing it recalculates history correctly.
toc:
  - { id: problem, label: Problem }
  - { id: approach, label: Approach }
  - { id: grounded, label: Grounded drafts }
  - { id: scm, label: Source control }
  - { id: scale, label: Speed & correctness }
  - { id: process, label: Process }
  - { id: deviations, label: Known deviations }
---

## <span class="no">01</span> Problem {#problem}

A working day of software tickets is spent switching between an issue tracker,
source control, notes and a timer — and, when the team works in Japanese, writing the ticket
comments in Japanese. Each switch loses context. I wanted one window around the
ticket in front of me, and help from a local model that could draft the routine
writing without inventing anything.

## <span class="no">02</span> Approach {#approach}

A PyQt6 desktop app pulls my tickets from Nulab Backlog on a background thread
and keeps an offline cache. Around the selected ticket it offers nine workspaces —
Today, Tasks, Ticket studio, Review board, Source control, Notes &amp; knowledge,
Calendar, Time insights and Standup — with Git and SVN side by side. A local
llama.cpp server drafts ticket briefs, Obsidian notes and Japanese Backlog
comments, and I review every draft before anything is written. The API key lives
in the OS keyring, never in a config file.

{% include shot.html src="/assets/program-images/tywork-today.webp" w=1480 h=940 label="Detail A" alt="The Today workspace in Ty Work Hub with demo data: tiles for assigned, in-progress, resolved and due tickets and time logged today; a 'Your next moves' queue; a work timer; upcoming deadlines; an inbox; and a seven-day bar chart of logged time." caption="The Today workspace (demo data): what is assigned, what is due, the timer, the next deadlines and a week of logged time — the first screen of the day." %}

## <span class="no">03</span> Grounded drafts {#grounded}

The model is useful only if it cannot make things up about the work, so its
inputs and outputs are both pinned down:

- **Evidence in.** A draft is grounded in the ticket and its comment history,
  the existing Obsidian note and the ticket's *verified* patch diff. When the
  prompt has to shrink to fit the server's context window, it is trimmed in
  priority order — the note first, then older comments — and the ticket and the
  patches are kept.
- **Structure out.** Requests use `response_format` with a strict JSON schema,
  which llama.cpp enforces as a grammar, so a draft always parses.
- **No authority over facts.** In a Japanese Backlog comment, the list of files
  touched is taken from the parsed patch, not from the model. As the code puts
  it: a model never gets authority to add file names.
- **Japanese done properly.** The streamed response is decoded explicitly as
  UTF-8 — a fix for mojibake in Japanese output that now has a byte-level
  regression test. Generation can be cancelled and reports progress.

## <span class="no">04</span> Source control you can trust {#scm}

- Every git command runs with `--literal-pathspecs`, `GIT_TERMINAL_PROMPT=0` and
  bounded, cancellable waits. Paths with `..`, absolute paths and `.git` are
  rejected, and pull is fast-forward only.
- **A commit must match what you saw.** The commit is refused if the SHA-256 of
  the staged patch differs from the one the user previewed — if anything changed
  in between, you look again.
- Classic SVN has no shelve, so the app has a **patch shelf**: create a patch,
  verify it, then revert only the files in it. Manifests are versioned, hashed,
  written atomically and checked to stay inside the shelf.
- Integration tests run against temporary Git repositories with a local bare
  remote, and against a real local SVN repository in CI.

## <span class="no">05</span> Speed &amp; correctness {#scale}

The task and review tables are virtual Qt models with painted cells, so the task
table creates no widgets per row; search is indexed as tickets arrive and
debounced at 120 ms. A test asserts that 10,000 tickets use a constant widget
count.

Time accounting is a pure module with no Qt and no I/O. Sessions are stored with
their real start and end, and the work schedule — working days and any number of
breaks — is applied when totals are read. Change the schedule and history is
recalculated correctly; tests cover overnight sessions, weekends and breaks.

## <span class="no">06</span> Process {#process}

The repository carries a written working agreement for the coding agents and me —
boundaries, "never block the GUI thread", safety rules for files and commands,
and a definition of done — and a dated roadmap whose release notes record what
was verified and what was not. CI runs on Windows and Ubuntu, with a real SVN
integration job.

<div class="deviations">
<h3 id="deviations">△ Known deviations</h3>
<ul>
<li>Nulab Backlog is the only issue tracker supported.</li>
<li>The roadmap records two things as not yet exercised live: keyring unlock and admin prompts on every Linux distribution, and live Backlog and llama.cpp after the September rewrite.</li>
<li>Public history starts on 17 September 2026; earlier development happened in a private project.</li>
</ul>
</div>
