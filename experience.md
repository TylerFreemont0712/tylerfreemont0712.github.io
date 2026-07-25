---
layout: default
title: Experience
nav: experience
permalink: /experience
description: >-
  Work history for Tyler Freemont — AI systems engineering at MiraX, frontier-model
  evaluation, and Python network automation for Rakuten Mobile and Daikin.
---

<section class="pane reveal" aria-labelledby="exp-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">work-history</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">git log</span> --oneline career</p>
      <h1 class="sec-title" id="exp-h">Work history</h1>
    </div>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">Software Engineer, AI Systems</h2>
        <p class="tl-date">Mar 2026 &mdash; Present</p>
      </div>
      <p class="tl-company">MiraX <span class="tl-loc">· Remote / Osaka, Japan</span></p>
      <ul class="tl-list">
        <li>Built the company's local LLM inference layer (Ollama, llama.cpp) behind
          internal API endpoints, moving enterprise workloads off external model
          providers and keeping customer data in-house.</li>
        <li>Designed and hardened <strong>{{ site.data.profile.figures.mcp_servers_production }} Model
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
      <ul class="tl-tags">
        <li>Python</li><li>C++</li><li>TypeScript</li><li>Ollama</li><li>llama.cpp</li>
        <li>MCP</li><li>LangChain</li><li>RAG</li><li>Multi-agent</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">AI Evaluation Specialist (Code &amp; Math)</h2>
        <p class="tl-date">Jan 2024 &mdash; Present</p>
      </div>
      <p class="tl-company">Outlier / Alignerr <span class="tl-loc">· Remote</span></p>
      <ul class="tl-list">
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
      <ul class="tl-tags">
        <li>RLHF</li><li>LLM evaluation</li><li>Agentic systems</li><li>Code review</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">Software / Infrastructure Engineer</h2>
        <p class="tl-date">Sep 2023 &mdash; Feb 2026</p>
      </div>
      <p class="tl-company">Neighbors Inc. <span class="tl-loc">· Osaka, Japan</span></p>
      <ul class="tl-list">
        <li>Built Python automation tooling and internal services for enterprise network
          clients including <strong>Rakuten Mobile</strong> and <strong>Daikin</strong>.</li>
        <li>Designed and implemented a fault-detection and auto-recovery service covering
          <strong>{{ site.data.profile.figures.neighbors_nodes }} network nodes</strong>,
          converting operator-driven recovery into an automatic path.</li>
        <li>Developed configuration-management tooling that replaced manual per-device
          changes across the managed fleet.</li>
        <li>Built and maintained deployment pipelines, and worked with network engineers
          on topology design.</li>
        <li>Worked across a bilingual Japanese/English engineering environment,
          translating technical requirements between teams.</li>
      </ul>
      <ul class="tl-tags">
        <li>Python</li><li>Linux</li><li>Network automation</li><li>TCP/IP</li>
        <li>CI/CD</li><li>Fault detection</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">EN &harr; JP Technical Translator</h2>
        <p class="tl-date">Apr 2022 &mdash; Dec 2023</p>
      </div>
      <p class="tl-company">Freelance <span class="tl-loc">· Osaka, Japan</span></p>
      <ul class="tl-list">
        <li>Translated IT and infrastructure documentation in both directions for
          engineering teams, prioritising operational accuracy over literal rendering.</li>
        <li>Supported communication between multinational teams on technical
          specifications and system design.</li>
      </ul>
      <ul class="tl-tags">
        <li>Technical translation</li><li>Japanese</li><li>English</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">English Instructor</h2>
        <p class="tl-date">Jan 2021 &mdash; Apr 2023</p>
      </div>
      <p class="tl-company">Soshi Gakuen High School <span class="tl-loc">· Osaka, Japan</span></p>
      <ul class="tl-list">
        <li>Designed and delivered English curriculum for high school students across
          mixed proficiency levels.</li>
      </ul>
      <ul class="tl-tags">
        <li>Curriculum design</li><li>Bilingual communication</li>
      </ul>
    </article>
  </div>
</section>

<!-- ═══════════ SKILLS ═══════════ -->
<section class="pane reveal" aria-labelledby="skills-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">toolchain</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">cat</span> toolchain.txt</p>
      <h2 class="sec-title" id="skills-h">Toolchain</h2>
      <p class="sec-note">
        Proficiency stated in words, not bars. <strong>Proficient</strong> means I have
        shipped production work in it; <strong>working knowledge</strong> means I can
        read and contribute to it but would not claim depth; <strong>familiar</strong>
        means I have used it, not mastered it.
      </p>
    </div>

    <div class="grid-2">
      <div class="skill-group">
        <h3>AI &amp; LLM systems</h3>
        <ul class="skill-list">
          <li>Local LLM deployment — Ollama, llama.cpp</li>
          <li>Model Context Protocol (MCP) servers</li>
          <li>RAG / retrieval pipelines</li>
          <li>LangChain, multi-agent orchestration</li>
          <li>Tool-calling &amp; function calling</li>
          <li>Model evaluation (RLHF), benchmarking</li>
          <li>Qwen, DeepSeek, Gemma, gpt-oss</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Programming languages</h3>
        <ul class="skill-list">
          <li><span class="prof">Proficient</span> Python, TypeScript, JavaScript,
            C++, C#, SQL, HTML/CSS</li>
          <li><span class="prof prof-mid">Working knowledge</span> Go, Rust</li>
          <li><span class="prof prof-low">Familiar</span> Ansible</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Infrastructure &amp; backend</h3>
        <ul class="skill-list">
          <li>Linux</li>
          <li>Docker</li>
          <li>AWS</li>
          <li>CI/CD</li>
          <li>REST API design</li>
          <li>Network automation, TCP/IP</li>
          <li>Fault detection &amp; auto-recovery</li>
          <li>Git</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Frontend &amp; applications</h3>
        <ul class="skill-list">
          <li>React</li>
          <li>PyQt6</li>
          <li>HTML5 Canvas</li>
          <li>SaaS product development</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Evaluation specialisms</h3>
        <ul class="skill-list">
          <li>Code evaluation — Python, JavaScript/TypeScript, C++, C#</li>
          <li>Multi-step reasoning, algorithmic problem solving</li>
          <li>Instruction-following</li>
          <li>Agentic &amp; tool-use behaviour</li>
          <li>Preference ranking with written technical justification</li>
          <li>EN&harr;JP bilingual evaluation</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Human languages</h3>
        <ul class="skill-list">
          <li><strong>English</strong> — native</li>
          <li><strong>日本語</strong> — JLPT N1, business level</li>
        </ul>
        <p class="skill-note">
          Technical documentation, client-facing meetings, and EN&harr;JP technical
          translation.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ EDUCATION & CERTIFICATIONS ═══════════ -->
<section class="pane reveal" aria-labelledby="edu-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">credentials</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">cat</span> credentials.txt</p>
      <h2 class="sec-title" id="edu-h">Education &amp; certifications</h2>
    </div>

    <h3 class="sub-h">Certifications</h3>
    <ul class="cert-list">
      <li><strong>AWS Certified Developer &mdash; Associate</strong> · Amazon Web Services</li>
      <li><strong>AWS Certified Solutions Architect &mdash; Associate</strong> · Amazon Web Services</li>
      <li><strong>JLPT N1</strong> &mdash; highest level of the Japanese Language Proficiency Test</li>
      <li><strong>Google IT Support Professional Certificate</strong> · Google</li>
    </ul>

    <h3 class="sub-h">Education</h3>
    <ul class="cert-list">
      <li>
        <strong>B.A., Japanese Language &amp; Culture / Communications</strong>
        · Portland State University, Oregon · 2014&ndash;2018
      </li>
      <li>
        <strong>Mathematics, C++, Programming Fundamentals</strong>
        · Clackamas Community College, Oregon
      </li>
      <li>
        <strong>Japanese Language &amp; Culture</strong>, exchange programme
        · Doshisha University, Kyoto
      </li>
    </ul>
  </div>
</section>
