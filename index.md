---
layout: default
lang: en
alt_url: /ja/
nav: home
dwg: TF-001
sheet: "01"
description: >-
  Tyler Freemont — software engineer in Osaka building AI systems and games:
  local LLM infrastructure, MCP servers, agent tooling, model evaluation, and a
  Godot roguelite whose spells are real code. Native English, JLPT N1, AWS
  certified, no visa sponsorship required.
---
{%- assign p = site.data.profile -%}
{%- assign items = site.data.projects.items -%}

<!-- ═══ General arrangement ═══ -->
<section class="hero" aria-labelledby="hero-name">
  <div class="hero-text">
    <div class="hero-meta">
      <span class="t-label">Dwg <b>TF-001</b></span>
      <span class="t-label">General arrangement</span>
      <span class="t-label">Osaka <b>34.69°N 135.50°E</b></span>
    </div>

    <h1 class="hero-name" id="hero-name">
      <span class="ln">Tyler</span>
      <span class="ln ln-2">Freemont</span>
      <span class="hero-name-ja" lang="ja">{{ p.name_ja }}</span>
    </h1>

    <div class="dim"><i></i><span>Software engineer · AI systems &amp; games</span><i></i></div>

    <p class="hero-pos">{{ p.positioning }}</p>

    <ol class="creds">
      {%- for c in p.credibility %}
      <li><span class="balloon" aria-hidden="true">{{ forloop.index }}</span><span><b>{{ c.label }}</b><span class="d">{{ c.detail }}</span></span></li>
      {%- endfor %}
    </ol>

    {%- if p.availability.open %}
    <p class="hero-avail revcloud"><span class="pulse" aria-hidden="true"></span>{{ p.availability.statement }}</p>
    {%- endif %}

    {%- assign resume_file = "" -%}
    {%- for v in p.resume.variants -%}{%- if v.default -%}{%- assign resume_file = v.file -%}{%- endif -%}{%- endfor %}
    <div class="btn-row">
      <a class="btn btn-primary" href="{{ resume_file | relative_url }}">{% include icon.html name="download" %}Download résumé</a>
      <a class="btn" href="mailto:{{ p.contact.email }}">{% include icon.html name="envelope" %}Email me</a>
    </div>
  </div>

  {% include exploded.html %}
</section>

<!-- ═══ A — Scope of work ═══ -->
<section class="view reveal" aria-labelledby="scope-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="scope-h">Scope of work<span class="alt" lang="ja">業務範囲</span></h2>
    <span class="view-ref">Four roles · one engineer</span>
  </header>
  <p class="view-lede">
    I am looking for work in four overlapping areas. Each column says what I
    do there and points at the evidence.
  </p>

  <div class="scope">
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="12" y="12" width="24" height="24"/><rect x="18" y="18" width="12" height="12"/><path d="M17 5v7M24 5v7M31 5v7M17 36v7M24 36v7M31 36v7M5 17h7M5 24h7M5 31h7M36 17h7M36 24h7M36 31h7"/></svg>
        <span class="balloon" aria-hidden="true">1</span>
      </div>
      <h3>AI / LLM engineering</h3>
      <p>
        Inference on hardware you own: llama.cpp and Ollama behind internal APIs,
        <strong>{{ p.figures.mcp_servers_production }} MCP servers in production</strong>
        at MiraX — one of them handling Japanese filesystem paths properly — and
        agents given real tools with real guardrails.
      </p>
      <p class="evidence">Evidence: <a href="{{ '/projects/aios/' | relative_url }}">AIOS</a> · <a href="{{ '/experience' | relative_url }}">MiraX</a></p>
    </article>
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="14"/><path d="M24 10 36.1 31H11.9Z"/><path d="M24 38 11.9 17h24.2Z"/></svg>
        <span class="balloon" aria-hidden="true">2</span>
      </div>
      <h3>Game development</h3>
      <p>
        A Godot 4.7 roguelite with a pure, seeded rules layer, sandboxed Python
        and JavaScript as the core mechanic, a balance bot, English and Japanese
        content, and differential tests against its TypeScript prototype.
      </p>
      <p class="evidence">Evidence: <a href="{{ '/projects/rootward/' | relative_url }}">Rootward</a></p>
    </article>
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="9" width="38" height="30"/><path d="M5 15.5h38"/><path d="M19 22.5l-5.5 5.5 5.5 5.5M29 22.5l5.5 5.5-5.5 5.5M26.5 20.5l-5 15"/></svg>
        <span class="balloon" aria-hidden="true">3</span>
      </div>
      <h3>Software engineering</h3>
      <p>
        Python, TypeScript, C++ and C#. Cross-platform desktop apps with CI,
        Node services, and network automation that ran fault detection and
        auto-recovery across <strong>{{ p.figures.neighbors_nodes }} nodes</strong>
        for Rakuten Mobile and Daikin.
      </p>
      <p class="evidence">Evidence: <a href="{{ '/projects/ty-work-hub/' | relative_url }}">Ty Work Hub</a> · <a href="{{ '/experience' | relative_url }}">Neighbors</a></p>
    </article>
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="10" y="8" width="28" height="34"/><path d="M18 8V4.5h12V8"/><path d="M15 18l3 3 5-6M15 28l3 3 5-6M27 19h7M27 29h7M15 37h19"/></svg>
        <span class="balloon" aria-hidden="true">4</span>
      </div>
      <h3>AI evaluation</h3>
      <p>
        Since 2024, RLHF preference data and written justifications on
        frontier-model code, maths and agentic tasks. I also build the harnesses:
        a model benchmark graded entirely in code, with no LLM judge.
      </p>
      <p class="evidence">Evidence: <a href="{{ '/projects/aios/#bench' | relative_url }}">AIOS bench</a> · <a href="{{ '/writing/evaluating-then-building/' | relative_url }}">Essay</a></p>
    </article>
  </div>
</section>

<!-- ═══ B — Parts list ═══ -->
<section class="view reveal" aria-labelledby="parts-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">B</span>
    <h2 class="view-title" id="parts-h">Parts list<span class="alt" lang="ja">部品表</span></h2>
    {%- assign nonlab = items | where_exp: "i", "i.group != 'lab'" %}
    <span class="view-ref">Items 1–{{ nonlab.size }} of {{ items.size }}</span>
  </header>

  <div class="details">
    {%- assign letters = "A,B,C" | split: "," -%}
    {%- assign shown = 0 -%}
    {%- for it in items -%}
    {%- if it.tier != "sheet" -%}{%- continue -%}{%- endif -%}
    <a class="detail" href="{{ '/projects/' | append: it.id | append: '/' | relative_url }}">
      <span class="detail-label"><span><b>Detail {{ letters[shown] }}</b> · Item {{ it.item }}</span><span>{{ it.stack | slice: 0, 3 | join: " · " }}</span></span>
      <span class="detail-frame ticks"><img src="{{ it.image | relative_url }}" alt="{{ it.image_alt }}" loading="lazy" decoding="async" width="1600" height="900"></span>
      <h3><span class="balloon is-red" aria-hidden="true">{{ it.item }}</span>{{ it.name }}</h3>
      <p>{{ it.summary }}</p>
    </a>
    {%- assign shown = shown | plus: 1 -%}
    {%- endfor %}
  </div>

  {% include bom.html featured=true %}

  <p class="btn-row" style="margin-top:22px">
    <a class="btn" href="{{ '/projects/' | relative_url }}">All {{ items.size }} parts, including the lab {% include icon.html name="arrow" %}</a>
  </p>
</section>

<!-- ═══ C — Revision history ═══ -->
<section class="view reveal" aria-labelledby="rev-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">C</span>
    <h2 class="view-title" id="rev-h">Revision history<span class="alt" lang="ja">改訂履歴</span></h2>
    <span class="view-ref">Current: Rev {{ site.data.career[0].rev }}</span>
  </header>

  <table class="revs">
    <caption class="sr-only">Career, newest first</caption>
    <thead><tr><th class="c-rev" scope="col">Rev</th><th scope="col">Description</th><th class="c-date" scope="col">Date</th></tr></thead>
    <tbody>
      {%- for r in site.data.career %}
      <tr{% if r.to == "" %} class="is-current"{% endif %}>
        <td class="c-rev">{% include revmark.html r=r.rev %}</td>
        <td><span class="role">{{ r.role }}</span><span class="org">{{ r.org }} · {{ r.where }} — {{ r.note }}</span></td>
        <td class="c-date">{{ r.from }} – {% if r.to == "" %}now{% else %}{{ r.to }}{% endif %}</td>
      </tr>
      {%- endfor %}
    </tbody>
  </table>
  <p class="btn-row" style="margin-top:22px">
    <a class="btn" href="{{ '/experience' | relative_url }}">Full experience, skills &amp; certifications {% include icon.html name="arrow" %}</a>
  </p>
</section>

<!-- ═══ D — General notes ═══ -->
{%- assign en_posts = site.posts | where_exp: "post", "post.lang != 'ja'" -%}
{%- if en_posts.size > 0 %}
<section class="view reveal" aria-labelledby="notes-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">D</span>
    <h2 class="view-title" id="notes-h">General notes<span class="alt" lang="ja">技術記事</span></h2>
    <span class="view-ref"><a href="{{ '/feed.xml' | relative_url }}">RSS</a></span>
  </header>
  <ol class="notes">
    {%- for post in en_posts limit: 3 %}
    <li>
      <span class="n">{{ forloop.index | prepend: "0" }}.</span>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y.%m.%d" }}</time>
      {%- if post.description %}<p class="desc">{{ post.description | strip_newlines | strip }}</p>{% endif %}
    </li>
    {%- endfor %}
  </ol>
  <p class="btn-row" style="margin-top:22px">
    <a class="btn" href="{{ '/writing' | relative_url }}">All writing {% include icon.html name="arrow" %}</a>
  </p>
</section>
{%- endif %}
