---
layout: default
lang: en
alt_url: /ja/projects/
title: Work
nav: projects
permalink: /projects/
dwg: TF-002
sheet: "02"
description: >-
  Projects by Tyler Freemont: Rootward, a Godot roguelite whose spells are real
  code run in a sandbox; AIOS, a self-hosted AI workspace with a judge-free model
  benchmark; Ty Work Hub, a cross-platform desktop workspace with grounded local
  LLM drafts; and the smaller work behind them.
---
{%- assign items = site.data.projects.items -%}
{%- assign sheets = items | where: "tier", "sheet" -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">Dwg TF-002 · Sheet 02 · {{ items.size }} parts</span></div>
    <h1 class="ps-title">Work</h1>
    <p class="ps-tag">
      Everything on my GitHub that is worth your time, measured from the code
      rather than from memory. Three projects have full drawing sheets; the rest
      are listed with what they are built from and what state they are in.
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">How to read this sheet</caption>
    <tbody>
      <tr><th scope="row">Balloon</th><td><span class="balloon is-red" aria-hidden="true">1</span> has its own sheet</td></tr>
      <tr><th scope="row">Spec</th><td>Counted from the repository: code lines exclude blanks, comments and vendored files</td></tr>
      <tr><th scope="row">Private</th><td>Described, never linked</td></tr>
      <tr><th scope="row">Left out</th><td>Empty repositories and earlier copies of the same project</td></tr>
    </tbody>
  </table>
</header>

<!-- ═══ A — Detail views ═══ -->
<section class="view reveal" aria-labelledby="sheets-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="sheets-h">Drawing sheets<span class="alt" lang="ja">詳細図</span></h2>
    <span class="view-ref">{{ sheets.size }} case studies</span>
  </header>
  <div class="details">
    {%- assign letters = "A,B,C" | split: "," -%}
    {%- for it in sheets %}
    <a class="detail" href="{{ '/projects/' | append: it.id | append: '/' | relative_url }}">
      <span class="detail-label"><span><b>Detail {{ letters[forloop.index0] }}</b> · Item {{ it.item }}</span><span>{{ it.spec }}</span></span>
      <span class="detail-frame ticks"><img src="{{ it.image | relative_url }}" alt="{{ it.image_alt }}" loading="lazy" decoding="async" width="1600" height="900"></span>
      <h3><span class="balloon is-red" aria-hidden="true">{{ it.item }}</span>{{ it.name }}</h3>
      <p>{{ it.summary }}</p>
    </a>
    {%- endfor %}
  </div>
</section>

<!-- ═══ B — Parts list ═══ -->
<section class="view reveal" aria-labelledby="parts-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">B</span>
    <h2 class="view-title" id="parts-h">Parts list<span class="alt" lang="ja">部品表</span></h2>
    <span class="view-ref">Items 1–{{ items.size }}</span>
  </header>
  {% include bom.html %}
</section>

<!-- ═══ C — Timeline ═══ -->
<section class="view reveal" aria-labelledby="tl-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">C</span>
    <h2 class="view-title" id="tl-h">Timeline<span class="alt" lang="ja">開発の推移</span></h2>
    <span class="view-ref">Dec 2025 – Oct 2026</span>
  </header>
  <p class="view-lede">
    Ten months from a single-file pygame Snake to a 31,000-line Godot game with a
    sandbox, differential tests and a balance bot. Each bar is a period of active
    work; highlighted bars have their own sheet.
  </p>
  {% include timeline.html %}
</section>
