---
layout: default
lang: en
alt_url: /ja/experience
title: Experience
nav: experience
permalink: /experience
dwg: TF-003
sheet: "03"
description: >-
  Work history for Tyler Freemont — AI systems engineering at MiraX, frontier-model
  evaluation since 2024, and Python network automation for Rakuten Mobile and
  Daikin. Skills, certifications and education.
---
{%- assign p = site.data.profile -%}
{%- assign c = site.data.career -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">Dwg TF-003 · Sheet 03 · Current revision {{ c[0].rev }}</span></div>
    <h1 class="ps-title">Experience</h1>
    <p class="ps-tag">
      AI systems engineering today, built on two years of grading frontier-model
      output and two and a half of infrastructure automation — in Japanese and
      English.
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">Summary</caption>
    <tbody>
      <tr><th scope="row">Now</th><td>{{ c[0].role }}, {{ c[0].org }}</td></tr>
      <tr><th scope="row">Languages</th><td>English (native) · 日本語 (JLPT N1)</td></tr>
      <tr><th scope="row">Certified</th><td>AWS Developer – Associate · AWS Solutions Architect – Associate</td></tr>
      <tr><th scope="row">Work rights</th><td>Spouse-of-Japanese-national visa — no restrictions, no sponsorship needed</td></tr>
      <tr><th scope="row">Location</th><td>Osaka · remote, hybrid or on-site</td></tr>
    </tbody>
  </table>
</header>

<!-- ═══ A — Revision history ═══ -->
<section class="view" aria-labelledby="hist-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="hist-h">Revision history<span class="alt" lang="ja">職務経歴</span></h2>
    <span class="view-ref">Newest first</span>
  </header>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="E" %}<span class="t-label">Mar 2026 – present<br>Remote / Osaka</span></div>
    <div>
      <h3 class="rev-role">Software Engineer, AI Systems</h3>
      <p class="rev-org"><b>MiraX</b></p>
      <ul class="rev-list">
        <li>Built the company's local LLM inference layer (Ollama, llama.cpp) behind
          internal API endpoints, moving enterprise workloads off external model
          providers and keeping customer data in-house.</li>
        <li>Designed and hardened <strong>{{ p.figures.mcp_servers_production }} Model
          Context Protocol (MCP) servers</strong> now in production, consumed by the
          company's local LLM deployment — including a company-document server with full
          Japanese filesystem and Unicode handling, and a bilingual EN/JA web-search
          service.</li>
        <li>Shipped RAG retrieval, tool-calling and multi-agent workflows (LangChain)
          into an enterprise SaaS platform spanning video conferencing, translation and
          records management.</li>
        <li>Benchmarked and integrated open-weight models (Qwen, DeepSeek, Gemma,
          gpt-oss) against production latency and quality requirements, and ran the
          internal evaluation gating AI feature releases.</li>
        <li>Delivered backend and frontend features across Python, C++, C#, TypeScript
          and JavaScript in a small, fast-moving startup team.</li>
      </ul>
      <ul class="chips"><li class="chip">Python</li><li class="chip">C++</li><li class="chip">TypeScript</li><li class="chip">Ollama</li><li class="chip">llama.cpp</li><li class="chip">MCP</li><li class="chip">LangChain</li><li class="chip">RAG</li><li class="chip">Multi-agent</li></ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="D" %}<span class="t-label">Jan 2024 – present<br>Remote</span></div>
    <div>
      <h3 class="rev-role">AI Evaluation Specialist (Code &amp; Math)</h3>
      <p class="rev-org"><b>Outlier / Alignerr</b></p>
      <ul class="rev-list">
        <li>Evaluate frontier-model output for correctness, reasoning quality and
          instruction-following across Python, JavaScript/TypeScript, C++ and C#.</li>
        <li>Produce RLHF preference data with written justifications used in model
          training pipelines.</li>
        <li>Assess multi-step reasoning chains, agentic task execution and tool-use
          behaviour — the same failure modes I have to design around when building
          agent systems.</li>
        <li>Review code completions, debugging tasks and algorithm implementations to a
          professional engineering standard, alongside university-level mathematics.</li>
      </ul>
      <ul class="chips"><li class="chip">RLHF</li><li class="chip">LLM evaluation</li><li class="chip">Agentic systems</li><li class="chip">Code review</li></ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="C" %}<span class="t-label">Sep 2023 – Feb 2026<br>Osaka</span></div>
    <div>
      <h3 class="rev-role">Software / Infrastructure Engineer</h3>
      <p class="rev-org"><b>Neighbors Inc.</b></p>
      <ul class="rev-list">
        <li>Built Python automation tooling and internal services for enterprise network
          clients including <strong>Rakuten Mobile</strong> and <strong>Daikin</strong>.</li>
        <li>Designed and implemented a fault-detection and auto-recovery service covering
          <strong>{{ p.figures.neighbors_nodes }} network nodes</strong>, converting
          operator-driven recovery into an automatic path.</li>
        <li>Developed configuration-management tooling that replaced manual per-device
          changes across the managed fleet.</li>
        <li>Built and maintained deployment pipelines, and worked with network engineers
          on topology design.</li>
        <li>Worked across a bilingual Japanese/English engineering environment,
          translating technical requirements between teams.</li>
      </ul>
      <ul class="chips"><li class="chip">Python</li><li class="chip">Linux</li><li class="chip">Network automation</li><li class="chip">TCP/IP</li><li class="chip">CI/CD</li><li class="chip">Fault detection</li></ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="B" %}<span class="t-label">Apr 2022 – Dec 2023<br>Osaka</span></div>
    <div>
      <h3 class="rev-role">EN ↔ JP Technical Translator</h3>
      <p class="rev-org"><b>Freelance</b></p>
      <ul class="rev-list">
        <li>Translated IT and infrastructure documentation in both directions for
          engineering teams, prioritising operational accuracy over literal rendering.</li>
        <li>Supported communication between multinational teams on technical
          specifications and system design.</li>
      </ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="A" %}<span class="t-label">Jan 2021 – Apr 2023<br>Osaka</span></div>
    <div>
      <h3 class="rev-role">English Instructor</h3>
      <p class="rev-org"><b>Soshi Gakuen High School</b></p>
      <ul class="rev-list">
        <li>Designed and delivered English curriculum for high school students across
          mixed proficiency levels.</li>
      </ul>
    </div>
  </article>
</section>

<!-- ═══ B — Specification ═══ -->
<section class="view reveal" aria-labelledby="spec-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">B</span>
    <h2 class="view-title" id="spec-h">Specification<span class="alt" lang="ja">スキル</span></h2>
    <span class="view-ref">Stated in words, not bars</span>
  </header>
  <p class="view-lede">
    <span class="prof">Proficient</span> means I have shipped production work in it;
    <span class="prof is-mid">Working knowledge</span> means I can read and contribute
    but would not claim depth; <span class="prof is-low">Familiar</span> means used,
    not mastered.
  </p>
  <div class="spec">
    <section>
      <h3>AI &amp; LLM systems</h3>
      <ul>
        <li>Local LLM deployment — Ollama, llama.cpp</li>
        <li>Model Context Protocol (MCP) servers</li>
        <li>RAG / retrieval pipelines</li>
        <li>LangChain, multi-agent orchestration</li>
        <li>Tool-calling, structured output, grammar-constrained decoding</li>
        <li>Qwen, DeepSeek, Gemma, gpt-oss</li>
      </ul>
    </section>
    <section>
      <h3>Evaluation</h3>
      <ul>
        <li>RLHF preference data with written justification</li>
        <li>Code evaluation — Python, JavaScript/TypeScript, C++, C#</li>
        <li>Multi-step reasoning, instruction-following, agentic and tool-use behaviour</li>
        <li>Benchmark design: deterministic graders, leakage control, speed vs quality</li>
        <li>EN↔JP bilingual evaluation</li>
      </ul>
    </section>
    <section>
      <h3>Programming languages</h3>
      <ul>
        <li><span class="prof">Proficient</span> Python, TypeScript, JavaScript, C++, C#, SQL, HTML/CSS</li>
        <li><span class="prof is-mid">Working knowledge</span> GDScript, Go, Rust</li>
        <li><span class="prof is-low">Familiar</span> Ansible</li>
      </ul>
    </section>
    <section>
      <h3>Games</h3>
      <ul>
        <li>Godot 4 — typed GDScript, scenes, background threads, gdUnit4</li>
        <li>Deterministic, seeded game rules; differential testing</li>
        <li>Sandboxed scripting — wasmtime / WASI, QuickJS, Pyodide</li>
        <li>Content pipelines — JSONC schemas, localisation, generated assets</li>
      </ul>
    </section>
    <section>
      <h3>Infrastructure &amp; backend</h3>
      <ul>
        <li>Linux, Docker, AWS, CI/CD (GitHub Actions)</li>
        <li>REST and WebSocket APIs — Node/Express, FastAPI, Fastify</li>
        <li>SQLite, network automation, TCP/IP</li>
        <li>Fault detection &amp; auto-recovery</li>
      </ul>
    </section>
    <section>
      <h3>Applications &amp; human languages</h3>
      <ul>
        <li>React, PyQt6, HTML5 Canvas</li>
        <li><strong>English</strong> — native</li>
        <li><strong>日本語</strong> — JLPT N1, business level: documentation, client meetings, EN↔JP technical translation</li>
      </ul>
    </section>
  </div>
</section>

<!-- ═══ C — Certification ═══ -->
<section class="view reveal" aria-labelledby="cert-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">C</span>
    <h2 class="view-title" id="cert-h">Certification &amp; education<span class="alt" lang="ja">資格・学歴</span></h2>
    <span class="view-ref">Inspected and approved</span>
  </header>
  <ul class="certs">
    <li><span class="balloon is-red" aria-hidden="true">1</span><span><b>AWS Certified Developer – Associate</b><span>Amazon Web Services</span></span></li>
    <li><span class="balloon is-red" aria-hidden="true">2</span><span><b>AWS Certified Solutions Architect – Associate</b><span>Amazon Web Services</span></span></li>
    <li><span class="balloon is-red" aria-hidden="true">3</span><span><b>JLPT N1</b><span>Highest level of the Japanese Language Proficiency Test</span></span></li>
    <li><span class="balloon is-red" aria-hidden="true">4</span><span><b>Google IT Support Professional Certificate</b><span>Google</span></span></li>
    <li><span class="balloon" aria-hidden="true">5</span><span><b>B.A., Japanese Language &amp; Culture / Communications</b><span>Portland State University, Oregon · 2014–2018</span></span></li>
    <li><span class="balloon" aria-hidden="true">6</span><span><b>Japanese Language &amp; Culture, exchange programme</b><span>Doshisha University, Kyoto</span></span></li>
    <li><span class="balloon" aria-hidden="true">7</span><span><b>Mathematics, C++, programming fundamentals</b><span>Clackamas Community College, Oregon</span></span></li>
  </ul>
</section>
