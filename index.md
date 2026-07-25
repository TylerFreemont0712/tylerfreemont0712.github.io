---
layout: default
lang: en
alt_url: /ja/
nav: home
description: >-
  Tyler Freemont — software engineer in Osaka, Japan. Local LLM infrastructure,
  MCP servers, RAG pipelines and agentic tooling in Python, TypeScript and C++.
  Native English, JLPT N1, AWS certified, no visa sponsorship required.
---

{% include hero.html %}

<!-- ═══════════ WHAT I BUILD ═══════════ -->
<section class="pane reveal" aria-labelledby="build-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">what-i-build</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">cat</span> capabilities.txt</p>
      <h2 class="sec-title" id="build-h">What I build</h2>
    </div>

    <div class="grid-3">
      <article class="cap-card">
        <h3>Local LLM infrastructure</h3>
        <p>
          Inference that stays on hardware you control — llama.cpp and Ollama behind
          a routing layer, so a team gets model access without sending data to a
          third party. Model selection, quantisation trade-offs, and the launcher
          tooling to make it operable by people who don't want a command line.
        </p>
        <p class="cap-evidence">
          Evidence: <a href="{{ site.data.profile.contact.github }}/AIOS-v1" target="_blank" rel="noopener">AIOS</a>,
          <a href="{{ site.data.profile.contact.github }}/llama-launcher" target="_blank" rel="noopener">llama-launcher</a>
        </p>
      </article>

      <article class="cap-card">
        <h3>Agentic tooling &amp; MCP</h3>
        <p>
          Tool-calling agents that actually touch a filesystem and a shell:
          structured tool schemas, permissioned execution, and the validation layer
          that stops a model's output from being trusted blindly.
          <strong>{{ site.data.profile.figures.mcp_servers_production }} MCP servers in
          production</strong> at MiraX, including one that handles Japanese filesystem
          paths and Unicode correctly — which is less trivial than it sounds.
        </p>
        <p class="cap-evidence">
          Evidence: <a href="{{ '/projects#aios' | relative_url }}">AIOS agent runtime</a>,
          <a href="{{ '/projects#llm-council' | relative_url }}">LLM Council</a>
        </p>
      </article>

      <article class="cap-card">
        <h3>Infrastructure automation</h3>
        <p>
          Python network automation for enterprise clients including
          <strong>Rakuten Mobile</strong> and <strong>Daikin</strong> — configuration
          management, monitoring, and a fault-detection and auto-recovery service across
          <strong>{{ site.data.profile.figures.neighbors_nodes }} network nodes</strong>.
        </p>
        <p class="cap-evidence">
          Detail: <a href="{{ '/experience' | relative_url }}">Experience</a>
        </p>
      </article>
    </div>
  </div>
</section>

<!-- ═══════════ FEATURED WORK ═══════════ -->
<section class="pane reveal" aria-labelledby="work-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">featured-work</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">ls</span> -la ~/projects/</p>
      <h2 class="sec-title" id="work-h">Featured work</h2>
    </div>

    <div class="grid-3">
      <article class="proj-card">
        <h3 class="proj-name">AIOS</h3>
        <p class="proj-desc">
          Self-hosted AI workspace that serves an entire LAN from one machine.
          Local and cloud models behind one router, a coding agent with real
          filesystem and shell tools, live terminals, and an Obsidian-backed
          knowledge base.
        </p>
        <p class="proj-stack">JavaScript · Node · llama.cpp · Ollama</p>
        <p class="proj-links">
          <a href="{{ '/projects#aios' | relative_url }}">Case study</a>
          <a href="{{ site.data.profile.contact.github }}/AIOS-v1" target="_blank" rel="noopener">Source</a>
        </p>
      </article>

      <article class="proj-card">
        <h3 class="proj-name">LLM Council</h3>
        <p class="proj-desc">
          Multi-agent system where specialised agents build working HTML5 Canvas
          games end to end. Generated code is validated at the AST level before it
          is trusted, and tools are generated at runtime as tasks demand them.
        </p>
        <p class="proj-stack">Python · multi-agent orchestration · AST analysis</p>
        <p class="proj-links">
          <a href="{{ '/projects#llm-council' | relative_url }}">Case study</a>
        </p>
      </article>

      <article class="proj-card">
        <h3 class="proj-name">LocalSync</h3>
        <p class="proj-desc">
          PyQt6 desktop app that keeps notes, calendar and finances in sync across
          machines on a local network — subnet-scanning mesh sync, a live Obsidian
          vault watcher, and recurring-event handling, with no cloud service in the
          middle.
        </p>
        <p class="proj-stack">Python · PyQt6 · SQLite</p>
        <p class="proj-links">
          <a href="{{ '/projects#localsync' | relative_url }}">Case study</a>
          <a href="{{ site.data.profile.contact.github }}/LocalSyncOrganization" target="_blank" rel="noopener">Source</a>
        </p>
      </article>
    </div>

    <p class="sec-more">
      <a href="{{ '/projects' | relative_url }}" class="btn btn-ghost">All projects</a>
      <a href="{{ '/experience' | relative_url }}" class="btn btn-ghost">Work history</a>
    </p>
  </div>
</section>
