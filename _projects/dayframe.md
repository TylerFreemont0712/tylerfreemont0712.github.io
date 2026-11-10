---
pid: dayframe
lang: en
title: DayFrame
permalink: /projects/dayframe/
alt_url: /ja/projects/dayframe/
dwg: TF-103
sheet: P3
og_image: /assets/og/dayframe.png
description: >-
  DayFrame — a private desktop planner for Windows and Linux (Python, PySide6)
  that keeps one set of records behind Kanban, Map, Calendar, Tickets, a Git-aware
  Code page and a timer, with optional LAN sync. Case study by Tyler Freemont.
tagline: >-
  One set of records behind every view of a working day — board, map, calendar,
  tickets, code and timer — kept on your own machine and synced only if you ask.
links:
  - { label: Source on GitHub, url: "https://github.com/TylerFreemont0712/DayFrame" }
tb:
  - [Type, Desktop planner for projects, tickets, time and code]
  - [Platform, "Windows and Linux · CI on both"]
  - [Stack, "Python 3.12–3.14 · PySide6 (Qt Widgets) · SQLite · git CLI"]
  - [Built, "Nov 2026 · version 0.7.0 · public history from 4 Nov"]
  - [Status, "In use · run from source or a self-built bundle"]
dims:
  - { v: "16.6k", k: "lines of Python (code only)" }
  - { v: "161", k: "tests" }
  - { v: "932", k: "assertions" }
  - { v: "6", k: "pages around one ticket model" }
  - { v: "2", k: "operating systems in CI" }
fig: "Fig. 2 — Assembly: every write is one transaction, with its sync record · Scale NTS"
notes:
  - t: UI pages
    d: Home, Projects, Tickets, Code, Calendar and Time, one module each. Kanban, Map and Calendar are painted views over the same snapshot, so a ticket is never copied between pages.
  - t: Store
    d: Every write goes through Store.command and is one SQLite transaction together with its outbox row. Domain rules live below it in a layer with no Qt and no SQLite.
  - t: Sync
    d: An optional hub on your own network. TLS is required off loopback with the certificate fingerprint pinned, field-level merges are automatic, and real conflicts are listed for you to resolve.
  - t: Code page
    d: Git runs as a subprocess that never prompts, never force-pushes and pulls fast-forward only. Each ticket keeps changesets — saved diffs that sync between devices.
toc:
  - { id: problem, label: Problem }
  - { id: approach, label: Approach }
  - { id: records, label: One set of records }
  - { id: map, label: The Map }
  - { id: code, label: Code and changesets }
  - { id: sync, label: Private sync }
  - { id: process, label: Process }
  - { id: deviations, label: Known deviations }
---

## <span class="no">01</span> Problem {#problem}

A day of project work is spread across a board, a calendar, a ticket list, a
timer and a terminal — and most planners keep a separate copy of the work in
each. I wanted the opposite: one ticket that is the same ticket on the Kanban
lane, on the Map, in the table, on the calendar and under the timer, stored on
my own machine rather than in someone else's account.

DayFrame is the organised successor to an earlier workspace of mine, Ty Work Hub.
It drops the issue-tracker integration and the local-model drafting, and puts the
effort into the data model, the views and the safety of every write.

## <span class="no">02</span> Approach {#approach}

A PySide6 (Qt Widgets) desktop app with a local SQLite database and no cloud
account. The navigation rail switches between Home, Projects, Tickets, Code,
Calendar and Time; Quick Add in the bottom bar creates a ticket or an event in
one atomic step, and Ctrl+K searches every ticket. Eight themes, each with its own
colour schemes and a custom scheme with a colour wheel, plus independent font,
density and text-size settings.

{% include shot.html src="/assets/program-images/dayframe-home.webp" w=1280 h=800 label="Detail A" alt="DayFrame's Home dashboard with demo data: a focus timer beside four figures for overdue, due today, in progress and done today; priority tasks with stage symbols; a week strip of seven day cards; a Day Agenda; countdown tiles; and an upcoming list." caption="Home (demo data): the timer beside four figures that open the matching ticket list, a week strip, the day's agenda and countdowns to major events." %}

## <span class="no">03</span> One set of records {#records}

The source is layered, and imports point one way only — `ui → sync → data → core`:

- **`core`** holds validation, dates, dependency rules and the calendar
  projections shared by Home and Calendar. It has no Qt and no SQLite, so it is
  tested without either.
- **`data`** is the `Store`: migrations (the database is at schema 6), backup and
  import. Every write is a single `Store.command(...)` call that commits the
  change and its sync record in one SQLite transaction, so a crash cannot leave a
  change that never reaches the other devices.
- **`ui`** has one module per page. Network and password hashing run on a thread
  pool; Qt widgets are only touched on the GUI thread, and timer durations come
  from stored timestamps rather than tick counts.

Ticket saves send only the changed fields, so editing one field does not
overwrite a change that arrived by sync in another.

{% include shot.html src="/assets/program-images/dayframe-kanban.webp" w=1280 h=800 label="Detail B" alt="DayFrame's Kanban board with demo data: five lanes from Not Started to Complete, each stage with its own symbol and colour, and ticket cards carrying labels and a Code badge." caption="Kanban (demo data): five lanes, a symbol and colour per stage, drag with a destination ghost and Undo. The same cards appear on the Map and in the table." %}

## <span class="no">04</span> The Map {#map}

The Map is a nested board of sections and tickets with parent/child links,
dependencies and sequence links:

- **Nothing moves by accident.** Classifying, linking or nesting needs a
  1.5-second hold with a ghost preview and a release to confirm. Manual
  placement and Undo are kept.
- **Links stay readable.** Every link leaves and enters a card at a right angle,
  with an arrowhead flush on the card edge. Links sharing a side are spread out,
  and routes follow the channels between columns instead of passing under cards.
- **Invalid structure is refused.** Cycles and cross-project links are rejected
  by the same rules in `core` that the store and hub enforce.

{% include shot.html src="/assets/program-images/dayframe-map.webp" w=1280 h=800 label="Detail C" alt="DayFrame's project Map with demo data: three sections — Frontend, Backend and Content — holding ticket cards, with solid parent/child links, dashed dependency links routed around cards, and a hint line explaining the hold-to-confirm gesture." caption="The Map (demo data): sections nested with their cards, a dashed dependency routed around unrelated cards, and the drag-and-hold hint along the bottom." %}

## <span class="no">05</span> Code and changesets {#code}

Each project connects one Git repository, with a separate checkout folder per
device. Each ticket keeps *changesets*: saved working-tree changes whose diff is
stored and synced, so work can be shelved on one ticket and picked up on another —
even in a second clone.

- Git runs as a subprocess with `GIT_TERMINAL_PROMPT=0`, bounded waits and
  background workers. It never force-pushes, pulls are `--ff-only`, and a push is
  refused while the branch is behind. Every action shows the command first.
- The page has a working tree (stage, unstage, discard), a history view with a
  commit graph, branches with ahead/behind, and a change browser with a file tree
  and numbered unified or split diffs that highlight in-line edits.
- An optional GitHub token, kept in the OS credential store, adds checks,
  pull requests and issues. Tests run it against a local fake API, and error
  messages never contain the token.

{% include shot.html src="/assets/program-images/dayframe-code.webp" w=1280 h=800 label="Detail D" alt="DayFrame's Code page with demo data: ticket cards beside a changed-file tree and a numbered diff with highlighted edits." caption="The Code page (demo data): tickets and their changesets on the left, a changed-file tree and a numbered diff on the right." %}

## <span class="no">06</span> Private sync {#sync}

Sync is optional. A small headless hub with no Qt runs on a machine you control.
TLS is required for anything other than loopback, and each client pins the hub's
certificate fingerprint. Changes travel through the transactional outbox;
independent fields merge automatically, and real conflicts are listed so you can
keep your version or take the hub's. Device credentials live in the OS keyring,
and tests run the real client against the real hub, including a large Unicode
diff and a comment with a screenshot.

## <span class="no">07</span> Process {#process}

The repository carries a written working agreement for the coding agents and me,
a code map of every module, accepted product requirements, a status document that
separates what is delivered from what was tested and where, and a changelog.
CI runs the database, sync and native UI tests on Windows and Ubuntu; building a
packaged bundle is opt-in. Tests never open the live profile.

<div class="deviations">
<h3 id="deviations">△ Known deviations</h3>
<ul>
<li>There is no installer or GitHub Release; DayFrame runs from source or from a bundle you build yourself.</li>
<li>Layouts were checked by screenshot at 1280×800 and 980×640 on Windows. The Linux build passes CI but has not been run on the author's own Linux desktop, and the Code page has not been exercised against the real GitHub API.</li>
<li>Reminders, richer recurrence, Team features and a mobile companion are not built yet.</li>
<li>Public history starts on 4 November 2026. The database file is still named <code>timemanager.db</code> from before the rename, so existing profiles keep working.</li>
</ul>
</div>
