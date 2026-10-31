---
pid: voxel-rootward
lang: en
title: Rootward Voxel
permalink: /projects/voxel-rootward/
alt_url: /ja/projects/voxel-rootward/
dwg: TF-104
sheet: P4
og_image: /assets/og/voxel-rootward.png
description: >-
  Rootward Voxel — a standalone Godot game in which you learn Python by changing
  a fantasy town. Your first program runs in a sandbox, and the town answers it.
  Case study by Tyler Freemont.
tagline: >-
  A standalone Godot game where a young lodger learns to program by changing a
  fantasy town with real Python, and every program is previewed before it is applied.
links:
  - { label: Source on GitHub, url: "https://github.com/TylerFreemont0712/Rootward-Voxel" }
tb:
  - [Type, Standalone game · learn Python by programming the world]
  - [Engine, "Godot 4.7.2, typed GDScript"]
  - [Platform, "Desktop, developed on Linux · Linux launcher installer · unreleased"]
  - [Built, "Oct 2026 · 66 design reviews dated 22–31 October"]
  - [Status, "Selected journey playable from the first morning to the town square · two earlier journeys archived"]
dims:
  - { v: "29k", k: "lines of GDScript, without blanks or comments" }
  - { v: "2,136", k: "checks in 45 headless test scripts" }
  - { v: "4", k: "areas make up the selected journey" }
  - { v: "18", k: "anonymous townspeople in Rootward Square" }
  - { v: "42", k: "models on the active asset shelf" }
fig: "Fig. 4 — Assembly: how a line of Python moves from the notebook through the sandbox and the rules into the world · Scale NTS"
notes:
  - t: Rules core
    d: Plain data and pure functions in core/, with no nodes and no file or network I/O. Every command a program returns is checked here before the world changes.
  - t: Area documents
    d: Terrain, buildings, lamps, gates and zones are JSON in content/areas/. Sparks uses four of them, workshop-loft, workshop-floor, haverlund-lane and haverlund-square.
  - t: Session and notebook
    d: The session holds one playthrough. Test code shows a preview, Apply commits that same validated result, and Undo reverts it. Code reaches only what you stand beside.
  - t: Sandbox host
    d: A copied, pinned Wasmtime and CPython runner in sandbox/, with its hashes in PROVENANCE.json. Player code never runs in the game's own process.
  - t: Art and scenes
    d: Blender sources are exported to GLB by scripts/world-art.sh. The 3D view follows the character and draws the state; it decides nothing about walkability.
toc:
  - { id: problem, label: Problem }
  - { id: play, label: How it plays }
  - { id: town, label: The town }
  - { id: sandbox, label: The sandbox }
  - { id: concepts, label: Concept to build }
  - { id: checks, label: Checks }
  - { id: limits, label: Known limits }
---

## <span class="no">01</span> Problem {#problem}

Most programming tutorials end at a terminal. Rootward Voxel keeps the output
in the world instead. A program that prints a greeting shows it above the
character in the room, and a program that lights a lamp lights it. The aim is
for a beginner's first lesson to be a single `print` call, and for the next
lesson to change something they can see.

## <span class="no">02</span> How it plays {#play}

A new journey begins above Nell's automaton workshop in Haverlund. The first
page, Field Notes /00, asks for a `print` call, either as an editable block or
as Python. **Test code** ghost-types the output above the character, and
**Speak** sends the same validated message to Hotaru, who has been dozing while
Nell is out on calls. A greeting addressed to her wakes her and stamps the
first job done.

{% include shot.html src="/assets/program-images/voxel-loft.webp" w=1280 h=720 label="Detail A" alt="The loft at the start of the first morning. A Python program in Field Notes prints Hello, Mira! and Good morning, Rowan. to the output tape, and the ghost print hovers above the traveller." caption="The loft. Field Notes /00 runs real Python: <strong>Test code</strong> ghost-types the output above the traveller, and <strong>Speak</strong> sends it to Hotaru." %}

The next chapter, *The waiting ticket → The landing light → The morning round*,
moves from one call to lists and `for` loops. A worked example introduces them
one lamp at a time. Test previews translucent light at the real fittings, and
Apply commits the same result. Editing a program clears an old test, and a
syntax error names its line.

{% include shot.html src="/assets/program-images/voxel-workshop.webp" w=1280 h=720 label="Detail B" alt="Nell's workshop floor from the stairs: herringbone boards, workbenches, a stove, a tool wall and the green shop doors. A job card for The waiting ticket is pinned in the corner." caption="Nell's workshop floor, with the first job, a waiting ticket, pinned by the window. Inspections use <strong>F</strong>." %}

## <span class="no">03</span> The town {#town}

Walk out through the green doors onto **Spindle Lane**, a cobbled terrace above
a painted harbour. Tram No. 7 comes up out of its cutting about once every
minute and a half. Each tram brings two or three adult passengers, and two
anonymous children are out on the lane. They keep their own routes and fade out
at the town gate.

<div class="shot-pair">
{% include shot.html src="/assets/program-images/voxel-lane.webp" w=1280 h=720 label="Detail C" alt="Spindle Lane above the harbour: a cobbled terrace with half-timbered houses, a post box, a bench and a small green. Grey figures show anonymous townspeople walking their routes." caption="Spindle Lane above the harbour. The grey figures are anonymous townspeople going about their own routes." %}
{% include shot.html src="/assets/program-images/voxel-tram.webp" w=1280 h=720 label="Detail D" alt="Tram No. 7 at the halt below the lane, beside its shelter and a stone retaining wall lined with glowing power pillars." caption="Tram No. 7 at the halt below the lane, arriving about once every minute and a half." %}
</div>

**Rootward Square** is the hub: a separate saved 72×64 area with the Rootwell at
its centre, a market, shops, a bank, a café and a lawned garden. Eighteen
anonymous townspeople walk it, along with two named villagers, Mira and Rowan,
and eleven robots on postal, gardening, lighting, maintenance and market rounds.
Power conduits run into the paving and up the Rootwell's steps. For now they are
visual scenery.

<div class="shot-pair">
{% include shot.html src="/assets/program-images/voxel-square.webp" w=1280 h=720 label="Detail E" alt="Rootward Square, the town hub: the green-domed Rootwell at centre, market stalls, a fruit cart, shopfronts and a lawned garden with a tree." caption="Rootward Square, the town hub, with the Rootwell at its centre, shops, market stalls and café tables." %}
{% include shot.html src="/assets/program-images/voxel-rootwell.webp" w=1280 h=720 label="Detail F" alt="The Rootwell from its ring of setts: a domed brass and glass core with a glowing centre, a clock face at its base and planter-benches around the steps." caption="The Rootwell from its ring of setts, with planter-benches and banner lamps." %}
</div>

## <span class="no">04</span> The sandbox {#sandbox}

Player Python never runs in the game's own process. It runs in a copied, pinned
WASI runner under `sandbox/`, and the hashes of that runner are recorded in
`PROVENANCE.json`. What comes back is data, not a change to the world. Every
command a program returns is checked by the rules core first, so a program can
ask for a lamp to be lit but cannot reach past what the rules allow.

A preview stays a proposal until **Apply** commits that exact result. Editing the
source, moving, undoing or resetting clears the stale preview, so what you read
is what is applied.

## <span class="no">05</span> Concept to build {#concepts}

The look began with concept sheets. Two are shown here beside the game's own
places, and the earlier village concept is kept for reference.

<div class="shot-pair">
{% include shot.html src="/assets/program-images/voxel-concept-loft.webp" w=1536 h=1024 label="Concept A" alt="Concept study of the loft: a steep timber attic with a round window, a brass tape machine on the desk, a teal checked bed and a rag rug around a railed stairwell." caption="Concept study for the loft. The shipped room keeps the desk, bed, round window and the tape machine that prints the program's output." %}
{% include shot.html src="/assets/program-images/voxel-concept-rootwell.webp" w=1536 h=1024 label="Concept B" alt="Concept sheet for the Rootwell with four views: a brass and glass fountain with a vine-wrapped glowing core, a plan view and close studies of a gauge, a valve and the core." caption="Concept sheet for the Rootwell: three-quarter and plan views, with close studies of the gauge, valve and glowing core. The in-game Rootwell is a separate model." %}
</div>

{% include shot.html src="/assets/program-images/voxel-concept-village.webp" w=1672 h=941 label="Concept C" alt="The original isometric voxel-village concept: violet-tiled cottages, a teal-roofed mill with a waterwheel, lantern-lit lanes and a stone-banked stream." caption="The voxel-village concept from the archived Kindle Hollow valley. It set the target for tiled roofs, flowing water and full tree crowns, and is kept for reference." %}

## <span class="no">06</span> Checks {#checks}

`scripts/test.sh` runs all 45 GDScript test scripts headless in Godot, with
2,136 checks, and then four Python tests covering the asset workflow, the
authoring guards, ground art and the pipeline handoff. The area tests play every
quest's reference solution, which must complete its goal, and every starter,
which must not. They also cover previews, Apply and Undo, saves and the build
tools. `scripts/screenshot.sh` captures every screen. Visible changes are written up
as dated reviews in `pipeline/reviews/`, 66 so far.

<div class="deviations">
<h3 id="limits">△ Known limits</h3>
<ul>
<li>Developed and tested on Linux. The one-click launcher installer is written for Linux menus.</li>
<li>The power conduits and glowing pillars are visual scenery and do not affect any rule yet.</li>
<li>Nell is absent from the lane and the story after the workshop. The north-gate job and her return are later work.</li>
<li>The lane has no named characters; the crowds are anonymous.</li>
<li>Village Morning and Kindle Hollow are archived outside the public title flow, with their code and saves retained.</li>
</ul>
</div>
