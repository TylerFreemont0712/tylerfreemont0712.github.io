---
layout: default
title: Projects
nav: projects
permalink: /projects
description: >-
  Projects by Tyler Freemont — self-hosted AI workspaces, multi-agent code
  generation, local-network sync tooling, and llama.cpp server tooling.
---

<section class="pane reveal" aria-labelledby="proj-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">~/tyler/projects</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">find</span> ~/projects -maxdepth 1 -type d</p>
      <h1 class="sec-title" id="proj-h">Projects</h1>
      <p class="sec-note">Deepest work first. Each entry says what the problem was,
        how it is built, and what is genuinely hard about it.</p>
    </div>
  </div>
</section>

<!-- ═══════════ AIOS ═══════════ -->
<article class="pane reveal case" id="aios" aria-labelledby="aios-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">case-study · aios</div>
  </div>
  <div class="pane-body">
    <header class="case-head">
      <h2 class="case-title" id="aios-h">AIOS</h2>
      <p class="case-tagline">A self-hosted AI workspace that serves a whole local
        network from one machine.</p>
      <p class="case-links">
        <a href="{{ site.data.profile.contact.github }}/AIOS-v1" class="btn btn-primary" target="_blank" rel="noopener">
          {% include icon.html name="github" %} Source
        </a>
      </p>
    </header>

    <div class="case-body">
      <h3>Problem</h3>
      <p>
        Using capable models at home or in a small office means either sending
        everything to a third-party API or running a separate tool per task — one app
        for chat, another for coding, another for notes, none of them aware of each
        other, and all of them tied to the one machine with the GPU. I wanted a single
        place that runs on the box with the hardware and is usable from any other
        device on the network, with local models as the default and cloud providers as
        an opt-in rather than a requirement.
      </p>

      <h3>Approach</h3>
      <p>
        A Node server on port 7777 serves a web desktop to the LAN and holds the
        long-lived state. Local models run under llama.cpp and Ollama behind a routing
        layer that cloud providers plug into on equal terms, so switching where
        inference happens is a per-conversation choice, not an architectural one. On
        top of that sit discrete apps — chat, a coding agent, research, a planner, an
        Obsidian-backed vault, a model bench, a file editor and real terminals — which
        keep running when you navigate away, so an agent run or a shell session
        survives switching apps.
      </p>

      <figure class="shot">
        <img src="{{ '/assets/program-images/aios-home-services.png' | relative_url }}"
             width="733" height="692" loading="lazy" decoding="async"
             alt="AIOS home screen. A services panel shows live status for each
                  dependency: SearXNG connected on 127.0.0.1:8890, llama.cpp reachable
                  serving qwen3-1.7b-q8_0, Ollama not running, Anthropic with no key
                  configured, the Obsidian vault connected, GitHub authenticated. Below
                  it a grid of twelve apps including Agent, Chat, Research, Planner,
                  Second Brain, Bench, Models, Files, Terminal and Projects.">
        <figcaption>
          Every dependency reports its own health, because half of running local
          inference is knowing which piece is down. Nothing here assumes a service is
          up — a missing API key and a stopped Ollama are normal states, not errors.
        </figcaption>
      </figure>

      <h3>Hard part</h3>
      <p>
        The coding agent is the part with real teeth. It explores a project with
        <code>list_dir</code>, <code>glob</code>, <code>grep</code> and
        <code>read_file</code>, then changes it with <code>write_file</code> and
        <code>edit_file</code>, runs <code>bash</code>, and reaches the network with
        <code>web_search</code> — which means a model's output is being handed real
        write access to a real filesystem and a real shell. The interesting design
        pressure is that smaller local models follow tool schemas far less reliably
        than frontier models do, so the tool layer has to be strict about what it
        accepts and specific about how it fails, rather than assuming well-formed
        calls. Terminals add a second problem: they need genuine PTY behaviour to run
        interactive programs, which means native support at install time and keeping
        sessions alive independently of whichever browser tab is currently attached.
      </p>

      <figure class="shot shot-feature">
        <img src="{{ '/assets/program-images/aios-agent-web-search.png' | relative_url }}"
             width="748" height="646" loading="lazy" decoding="async"
             alt="A chat turn in AIOS answering a question about current world events.
                  A collapsed reasoning panel reads 'Thought for 3s'. Below it a
                  web_search tool call, marked done, shows its query and the raw results
                  it pulled back through a self-hosted SearXNG instance, with source
                  URLs. The model's synthesised answer follows, and a footer reports
                  135.4 tokens per second at 98 milliseconds to first token.">
        <figcaption>
          A tool call executing end to end on a <strong>1.7B model running
          locally</strong>: reasoning, a <code>web_search</code> through self-hosted
          SearXNG, the raw sources it actually read, then the synthesis — at
          <strong>135.4 tok/s and 98 ms to first token</strong>. The raw results stay
          visible on purpose. When a small model gets an answer wrong, the useful
          question is whether the retrieval or the reasoning failed, and you cannot tell
          those apart if the tool output is hidden.
        </figcaption>
      </figure>

      <figure class="shot">
        <img src="{{ '/assets/program-images/aios-projects-registry.png' | relative_url }}"
             width="749" height="185" loading="lazy" decoding="async"
             alt="Three registered projects in AIOS, each a card showing its filesystem
                  path, git state and last-touched date: Sales on branch master with 5
                  dirty files, OS on main with 31 dirty files and marked active, and
                  Test-Project with no git repository. Each card offers Agent, Files and
                  Shell buttons.">
        <figcaption>
          The agent is always scoped to a registered project, and each one surfaces its
          branch and uncommitted-file count before you point anything at it. Handing a
          model write access to a tree with 31 dirty files is a decision you should make
          deliberately, so the state is shown rather than discovered afterwards.
        </figcaption>
      </figure>

      <h3>Outcome</h3>
      <p>
        It is what I use daily, and it works from a tablet on the same network via a
        pairing token in the LAN URL. Honest limitations: it is built for a trusted
        home or small-office network and the pairing token is not a substitute for
        real authentication on a hostile network; agent quality tracks the model you
        point it at, so a small local model is noticeably worse at multi-step edits
        than a frontier one; and it is a single-user-at-a-time design.
      </p>

      <figure class="shot">
        <img src="{{ '/assets/program-images/aios-files-editor.png' | relative_url }}"
             width="955" height="647" loading="lazy" decoding="async"
             alt="The AIOS file browser and editor, open on the project OS. A tree on the
                  left lists the repository's directories and files; the right pane is a
                  CodeMirror editor with line numbers and syntax highlighting, showing
                  AIOS's own README.">
        <figcaption>
          The file editor, editing AIOS's own source from inside AIOS. Tree explorer plus
          CodeMirror, per-project, so a change the agent proposes can be read and
          corrected in the same place it was made.
        </figcaption>
      </figure>

      <ul class="case-stack">
        <li>JavaScript</li><li>Node</li><li>llama.cpp</li><li>Ollama</li>
        <li>SearXNG</li><li>node-pty</li><li>xterm.js</li><li>CodeMirror</li>
      </ul>
    </div>
  </div>
</article>

<!-- ═══════════ LLM COUNCIL ═══════════ -->
<article class="pane reveal case" id="llm-council" aria-labelledby="council-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">case-study · llm-council</div>
  </div>
  <div class="pane-body">
    <header class="case-head">
      <h2 class="case-title" id="council-h">LLM Council</h2>
      <p class="case-tagline">Multi-agent system that builds working browser games
        end to end, with generated code validated before it is trusted.</p>
    </header>

    <div class="case-body">
      <h3>Problem</h3>
      <p>
        A single model asked to build a whole application produces code that looks
        plausible and fails on contact. The failure is rarely syntax — it is a
        function called with the wrong arity, a name that was never defined, an
        import of something that does not exist. Catching that by running the code and
        reading the traceback is slow, and in a browser game a lot of breakage is
        silent.
      </p>

      <h3>Approach</h3>
      <p>
        Specialised agents with distinct roles coordinate through a shared tool module
        rather than by passing prose to each other, and that module — not the
        individual agents — owns filesystem access, web search and asset downloading.
        Structured inter-agent messages keep handoffs machine-checkable, and
        hot-reloading closes the loop from generated change to visible result.
      </p>

      <h3>Hard part</h3>
      <p>
        Two decisions carry the system. The first is validating generated code at the
        <strong>AST level</strong> instead of executing it to find out whether it
        works: parse the output, walk the tree, and check that names resolve and calls
        match definitions before anything is written to disk. That catches the class of
        error models actually make, without paying for a run — the trade-off being
        that it verifies structural correctness, not behaviour, so it narrows what
        reaches execution rather than replacing testing. The second is
        <strong>runtime tool generation</strong>: rather than shipping a fixed tool
        list, the system creates tools as tasks demand them, which keeps the schema
        surface small enough for a model to use reliably but means each new tool has to
        be validated at the moment it is defined.
      </p>

      <ul class="case-stack">
        <li>Python</li><li>Multi-agent orchestration</li><li>AST analysis</li>
        <li>HTML5 Canvas</li>
      </ul>

      <p class="case-note">
        <strong>Note:</strong> the source for this project is not currently public, so
        this page is written to stand on its own rather than linking to a repository.
      </p>
    </div>
  </div>
</article>

<!-- ═══════════ LOCALSYNC ═══════════ -->
<article class="pane reveal case" id="localsync" aria-labelledby="ls-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">case-study · localsync</div>
  </div>
  <div class="pane-body">
    <header class="case-head">
      <h2 class="case-title" id="ls-h">LocalSync</h2>
      <p class="case-tagline">Notes, calendar and finances synced across machines on a
        local network, with no cloud service in the middle.</p>
      <p class="case-links">
        <a href="{{ site.data.profile.contact.github }}/LocalSyncOrganization" class="btn btn-primary" target="_blank" rel="noopener">
          {% include icon.html name="github" %} Source
        </a>
      </p>
    </header>

    <div class="case-body">
      <h3>Problem</h3>
      <p>
        Keeping personal notes, a calendar and financial records consistent across
        several machines normally means handing all three to a hosted service. I
        wanted the same convenience with the data staying on my own hardware, and I
        already kept notes in an Obsidian vault I did not want to migrate away from.
      </p>

      <h3>Approach</h3>
      <p>
        A PyQt6 desktop application over SQLite, with peers discovering each other by
        scanning the local subnet and syncing directly rather than through a server. A
        filesystem watcher on the Obsidian vault keeps the app and the raw markdown
        files in agreement in near-real time, in both directions, so the vault stays
        the source of truth for notes.
      </p>

      <h3>Hard part</h3>
      <p>
        Watching a directory that a human also edits is where the real difficulty sits.
        A deletion has to be distinguished from a rename, an edit made in Obsidian has
        to not fight an edit made in the app, and a burst of filesystem events from a
        single save has to collapse into one update instead of a stampede. Getting
        deletion sync to be safe — propagating genuine deletes without a transient
        event destroying a note — took several iterations.
      </p>

      <p>
        Alongside sync it carries the things I actually wanted a local app for: task and
        goal management over the same SQLite store, expense and receipt tracking, and an
        AI-driven step-by-step tutoring panel that works against a local model.
      </p>

      <ul class="case-stack">
        <li>Python</li><li>PyQt6</li><li>SQLite</li><li>Filesystem watching</li>
        <li>LAN peer discovery</li>
      </ul>
    </div>
  </div>
</article>

<!-- ═══════════ OTHER PROJECTS ═══════════ -->
<section class="pane reveal" aria-labelledby="other-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">other-projects</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">ls</span> ~/projects/misc/</p>
      <h2 class="sec-title" id="other-h">Other projects</h2>
    </div>

    <ul class="mini-list">
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/llama-launcher" target="_blank" rel="noopener">Local LLM Desktop Toolkit</a></h3>
        <p>Launcher and management tooling for running llama.cpp servers locally — a
          wizard instead of remembering flags — paired with a WASAPI loopback audio
          recorder and a Whisper transcription pipeline.</p>
        <p class="mini-stack">Python · PyQt6 · llama.cpp · Whisper</p>
      </li>
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/PersonalDashboard" target="_blank" rel="noopener">PersonalDashboard</a></h3>
        <p>Python dashboard aggregating daily information — the earlier iteration of
          the ideas that became LocalSync.</p>
        <p class="mini-stack">Python · PyQt6</p>
      </li>
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/YTDownload" target="_blank" rel="noopener">YTDownload</a></h3>
        <p>Media downloader with format and quality selection.</p>
        <p class="mini-stack">Python</p>
      </li>
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/SnakeGame" target="_blank" rel="noopener">SnakeGame</a></h3>
        <p>Practice project — game loop, state management, collision detection.</p>
        <p class="mini-stack">Python</p>
      </li>
    </ul>
  </div>
</section>

