---
layout: default
title: Projects - Tyler Freemont
permalink: /projects
---

<!-- ═══════════ PROJECTS PAGE HEADER ═══════════ -->
<div class="pane">
  <div class="pane-title-bar">
    <div class="pane-dots"><span></span><span></span><span></span></div>
    <div class="pane-label"><i class="fa-solid fa-folder-tree"></i> ~/tyler/projects</div>
  </div>
  <div class="pane-body">
    <div class="projects-page-header">
      <div class="sec-prompt"><span class="pr">$</span> <span class="cmd">find</span> ~/projects -type d -maxdepth 1 | <span class="cmd">sort</span></div>
      <h2 class="sec-title">All Projects</h2>
      <p style="color:#8899aa; margin-top:8px; font-size:14px;">
        7 repositories &mdash; 4 original builds, 2 open source contributions, 1 portfolio site.
        <a href="./" style="margin-left:12px; font-size:12px;"><i class="fa-solid fa-arrow-left"></i> Back to Main</a>
      </p>
    </div>
  </div>
</div>

<!-- ═══════════ ORIGINAL PROJECTS ═══════════ -->
<div class="pane">
  <div class="pane-title-bar">
    <div class="pane-dots"><span></span><span></span><span></span></div>
    <div class="pane-label"><i class="fa-solid fa-hammer"></i> original-builds</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <div class="sec-prompt"><span class="pr">$</span> <span class="cmd">ls</span> ~/projects/original/</div>
      <h2 class="sec-title">Original Projects</h2>
    </div>

    <!-- StandaloneYTDL -->
    <div class="proj-detail-card">
      <div class="proj-detail-bar">
        <div class="proj-detail-title">
          <i class="fa-solid fa-folder-open"></i> StandaloneYTDL
        </div>
        <div class="proj-detail-links">
          <a href="https://github.com/TylerFreemont0712/StandaloneYTDL" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Source</a>
        </div>
      </div>
      <div class="proj-detail-body">
        <div class="proj-detail-desc">
          <p>A standalone, self-contained Python application for downloading YouTube content. Built with a focus on reliability and a clean user interface.</p>
          <h4>Key Features</h4>
          <ul>
            <li>Standalone executable &mdash; no external dependencies required at runtime</li>
            <li>Clean download pipeline with error handling and retry logic</li>
            <li>User-friendly interface for selecting format and quality</li>
            <li>Built entirely in Python with modern packaging practices</li>
          </ul>
          <h4>What I Learned</h4>
          <ul>
            <li>Python packaging and distribution (building standalone apps)</li>
            <li>Working with external APIs and media stream protocols</li>
            <li>Error handling patterns for unreliable network operations</li>
          </ul>
        </div>
        <div class="proj-detail-meta">
          <span class="meta-chip lang"><span class="lang-dot python"></span> Python</span>
          <span class="meta-chip type-original">Original</span>
        </div>
      </div>
    </div>

    <!-- YTDownload -->
    <div class="proj-detail-card">
      <div class="proj-detail-bar">
        <div class="proj-detail-title">
          <i class="fa-solid fa-globe"></i> YTDownload
        </div>
        <div class="proj-detail-links">
          <a href="https://github.com/TylerFreemont0712/YTDownload" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Source</a>
        </div>
      </div>
      <div class="proj-detail-body">
        <div class="proj-detail-desc">
          <p>A web-based YouTube download interface built with JavaScript. Takes the same problem as StandaloneYTDL but approaches it from a full-stack web perspective.</p>
          <h4>Key Features</h4>
          <ul>
            <li>Browser-based UI for media downloading</li>
            <li>JavaScript frontend with backend download logic</li>
            <li>Demonstrates full-stack development approach</li>
          </ul>
          <h4>What I Learned</h4>
          <ul>
            <li>JavaScript fundamentals and web API integration</li>
            <li>Frontend/backend separation of concerns</li>
            <li>Comparing different tech stacks for the same problem domain</li>
          </ul>
        </div>
        <div class="proj-detail-meta">
          <span class="meta-chip lang"><span class="lang-dot javascript"></span> JavaScript</span>
          <span class="meta-chip type-original">Original</span>
        </div>
      </div>
    </div>

    <!-- SnakeGame -->
    <div class="proj-detail-card">
      <div class="proj-detail-bar">
        <div class="proj-detail-title">
          <i class="fa-solid fa-gamepad"></i> SnakeGame
        </div>
        <div class="proj-detail-links">
          <a href="https://github.com/TylerFreemont0712/SnakeGame" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Source</a>
        </div>
      </div>
      <div class="proj-detail-body">
        <div class="proj-detail-desc">
          <p>A classic Snake game implementation in Python. A focused practice project for exploring game development patterns and clean Python architecture.</p>
          <h4>Key Features</h4>
          <ul>
            <li>Game loop with frame-rate control</li>
            <li>State management for game entities</li>
            <li>Collision detection and scoring system</li>
            <li>Clean, readable Python code structure</li>
          </ul>
          <h4>What I Learned</h4>
          <ul>
            <li>Event-driven programming and game loop design</li>
            <li>Managing mutable state in a real-time application</li>
            <li>Python GUI libraries and rendering</li>
          </ul>
        </div>
        <div class="proj-detail-meta">
          <span class="meta-chip lang"><span class="lang-dot python"></span> Python</span>
          <span class="meta-chip type-original">Original</span>
        </div>
      </div>
    </div>

    <!-- Downloader -->
    <div class="proj-detail-card">
      <div class="proj-detail-bar">
        <div class="proj-detail-title">
          <i class="fa-solid fa-download"></i> Downloader
        </div>
        <div class="proj-detail-links">
          <a href="https://github.com/TylerFreemont0712/Downloader" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Source</a>
        </div>
      </div>
      <div class="proj-detail-body">
        <div class="proj-detail-desc">
          <p>A general-purpose YouTube download program for music and media. This was my first iteration solving the media download problem, before evolving into StandaloneYTDL and YTDownload.</p>
          <h4>Key Features</h4>
          <ul>
            <li>YouTube media downloading for music and video</li>
            <li>Command-line interface</li>
            <li>Foundation that evolved into more polished tools</li>
          </ul>
          <h4>Evolution</h4>
          <ul>
            <li>This project shows iterative development &mdash; the same problem solved with increasing sophistication across Downloader &rarr; StandaloneYTDL &rarr; YTDownload</li>
            <li>Each version improved architecture, UX, and reliability</li>
          </ul>
        </div>
        <div class="proj-detail-meta">
          <span class="meta-chip lang"><span class="lang-dot python"></span> Python</span>
          <span class="meta-chip type-original">Original</span>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ═══════════ OPEN SOURCE CONTRIBUTIONS ═══════════ -->
<div class="pane">
  <div class="pane-title-bar">
    <div class="pane-dots"><span></span><span></span><span></span></div>
    <div class="pane-label"><i class="fa-solid fa-code-branch"></i> open-source</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <div class="sec-prompt"><span class="pr">$</span> <span class="cmd">ls</span> ~/projects/forks/</div>
      <h2 class="sec-title">Open Source Contributions</h2>
    </div>

    <!-- Docling -->
    <div class="proj-detail-card">
      <div class="proj-detail-bar">
        <div class="proj-detail-title">
          <i class="fa-solid fa-file-lines"></i> Docling
        </div>
        <div class="proj-detail-links">
          <a href="https://github.com/TylerFreemont0712/docling" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Fork</a>
        </div>
      </div>
      <div class="proj-detail-body">
        <div class="proj-detail-desc">
          <p>A document preparation toolkit for generative AI applications. Converts documents into formats optimized for LLM ingestion and processing.</p>
          <h4>Why I'm Contributing</h4>
          <ul>
            <li>Directly relevant to my interest in AI infrastructure and MLOps</li>
            <li>Learning document processing pipelines that feed into LLM workflows</li>
            <li>Understanding how to prepare data at scale for AI systems</li>
            <li>Contributing to tools that bridge traditional infrastructure with AI</li>
          </ul>
          <h4>Technologies</h4>
          <ul>
            <li>Python-based document processing</li>
            <li>LLM integration patterns</li>
            <li>Data pipeline architecture</li>
          </ul>
        </div>
        <div class="proj-detail-meta">
          <span class="meta-chip lang"><span class="lang-dot python"></span> Python</span>
          <span class="meta-chip type-oss">OSS Contribution</span>
          <span class="meta-chip license">MIT License</span>
        </div>
      </div>
    </div>

    <!-- Cardio -->
    <div class="proj-detail-card">
      <div class="proj-detail-bar">
        <div class="proj-detail-title">
          <i class="fa-solid fa-heart"></i> Cardio
        </div>
        <div class="proj-detail-links">
          <a href="https://github.com/TylerFreemont0712/cardio" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Fork</a>
        </div>
      </div>
      <div class="proj-detail-body">
        <div class="proj-detail-desc">
          <p>An open-source, community-driven roguelike deck-building card game written in Python. A well-architected game project with an active community.</p>
          <h4>Why I'm Contributing</h4>
          <ul>
            <li>Study complex game architecture patterns in Python</li>
            <li>Learn community-driven open source development practices</li>
            <li>Explore state machine design and event-driven systems</li>
            <li>Contribute to an active community project with real users</li>
          </ul>
          <h4>Technologies</h4>
          <ul>
            <li>Python game architecture</li>
            <li>Jupyter Notebooks for prototyping and documentation</li>
            <li>Complex state management and game logic</li>
          </ul>
        </div>
        <div class="proj-detail-meta">
          <span class="meta-chip lang"><span class="lang-dot jupyter"></span> Jupyter</span>
          <span class="meta-chip type-oss">OSS Contribution</span>
          <span class="meta-chip license">GPLv3</span>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ═══════════ PORTFOLIO SITE ═══════════ -->
<div class="pane">
  <div class="pane-title-bar">
    <div class="pane-dots"><span></span><span></span><span></span></div>
    <div class="pane-label"><i class="fa-solid fa-palette"></i> meta</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <div class="sec-prompt"><span class="pr">$</span> <span class="cmd">ls</span> ~/projects/portfolio/</div>
      <h2 class="sec-title">This Site</h2>
    </div>

    <div class="proj-detail-card">
      <div class="proj-detail-bar">
        <div class="proj-detail-title">
          <i class="fa-solid fa-globe"></i> tylerfreemont0712.github.io
        </div>
        <div class="proj-detail-links">
          <a href="https://github.com/TylerFreemont0712/tylerfreemont0712.github.io" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Source</a>
        </div>
      </div>
      <div class="proj-detail-body">
        <div class="proj-detail-desc">
          <p>The site you're looking at right now. A portfolio website built as an infrastructure engineer's "mission control dashboard" &mdash; because your personal site should reflect who you are.</p>
          <h4>Design Concept</h4>
          <ul>
            <li>Mission Control / monitoring dashboard aesthetic</li>
            <li>Terminal-style section headers (<code>$ cat about.txt</code>)</li>
            <li>Pane windows with title bars mimicking tmux/terminal splits</li>
            <li>System bar navigation styled as a server status display</li>
            <li>Subtle scanline overlay and grid background effects</li>
            <li>Animated skill gauges, scroll-triggered transitions</li>
          </ul>
          <h4>Tech Stack</h4>
          <ul>
            <li>Jekyll static site generator on GitHub Pages</li>
            <li>Custom SCSS theme (1,300+ lines, built from scratch)</li>
            <li>Responsive design with mobile-first breakpoints</li>
            <li>Vanilla JavaScript for animations (no frameworks)</li>
            <li>Font Awesome icons + JetBrains Mono / Inter typography</li>
          </ul>
        </div>
        <div class="proj-detail-meta">
          <span class="meta-chip lang"><span class="lang-dot scss"></span> SCSS / Jekyll</span>
          <span class="meta-chip type-portfolio">Portfolio</span>
          <span class="meta-chip license">CC0-1.0</span>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ═══════════ BACK NAV ═══════════ -->
<div style="text-align:center; margin: 24px 0 0;">
  <a href="./" class="btn btn-cyan"><i class="fa-solid fa-arrow-left"></i> Back to Main</a>
  <a href="https://github.com/tylerfreemont0712" target="_blank" rel="noopener" class="btn btn-ghost"><i class="fa-brands fa-github"></i> View All on GitHub</a>
</div>
