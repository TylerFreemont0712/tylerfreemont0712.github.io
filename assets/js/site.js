/* ============================================================
   Tyler Freemont — portfolio interactions
   Framework-free. Boot sequence, interactive terminal,
   bilingual EN/JP, theming, reveals, filters.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- footer year ---------- */
  var yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     THEME
     ============================================================ */
  var THEMES = ['teal', 'violet', 'amber', 'green', 'blue'];
  var savedTheme = localStorage.getItem('tf-theme');
  if (savedTheme && THEMES.indexOf(savedTheme) !== -1) document.documentElement.dataset.theme = savedTheme;
  function cycleTheme() {
    var cur = document.documentElement.dataset.theme || 'teal';
    var next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    setTheme(next);
  }
  function setTheme(name) {
    if (THEMES.indexOf(name) === -1) return false;
    document.documentElement.dataset.theme = name;
    localStorage.setItem('tf-theme', name);
    var meta = $('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', '#0a0d14');
    return true;
  }
  var themeBtn = $('#themeCycle'); if (themeBtn) themeBtn.addEventListener('click', cycleTheme);

  /* ============================================================
     LANGUAGE (EN / JP)
     ============================================================ */
  function setLang(lang) {
    lang = (lang === 'ja') ? 'ja' : 'en';
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'ja' ? 'ja' : 'en');
    $$('[data-en]').forEach(function (el) {
      var v = el.getAttribute(lang === 'ja' ? 'data-ja' : 'data-en');
      if (v != null) el.innerHTML = v;
    });
    localStorage.setItem('tf-lang', lang);
    return lang;
  }
  document.body.setAttribute('data-lang', 'en');
  var savedLang = localStorage.getItem('tf-lang');
  if (savedLang === 'ja') setLang('ja');
  var langBtn = $('#langToggle');
  if (langBtn) langBtn.addEventListener('click', function () {
    setLang(document.body.getAttribute('data-lang') === 'ja' ? 'en' : 'ja');
  });

  /* ============================================================
     NAV: scroll state, active link, mobile menu, progress
     ============================================================ */
  var nav = $('#nav');
  var progress = $('#scrollProgress');
  var sections = $$('main section[id]');
  var navLinks = $$('.nav-links a');

  function onScroll() {
    var y = window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', y > 12);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('id');
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  var menuBtn = $('#menuBtn'), mobileMenu = $('#mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', mobileMenu).forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
     REVEAL ON SCROLL + skill meters
     ============================================================ */
  var revealTargets = $$('.section, .tl-item, .proj, .mini-card, .skill-col');
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { revObs.observe(el); });
  }

  var meters = $$('.meter-track i');
  function fillMeters() { meters.forEach(function (m) { m.style.width = (m.getAttribute('data-w') || 0) + '%'; }); }
  if ('IntersectionObserver' in window && !reduceMotion && meters.length) {
    var skillsSec = $('#skills');
    var mObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { fillMeters(); obs.disconnect(); } });
    }, { threshold: 0.25 });
    if (skillsSec) mObs.observe(skillsSec);
  } else { fillMeters(); }

  /* ============================================================
     PROJECT FILTERS
     ============================================================ */
  var chips = $$('#projFilters .chip');
  var projects = $$('#projGrid .proj');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      projects.forEach(function (p) {
        var cats = (p.getAttribute('data-cat') || '').split(/\s+/);
        p.classList.toggle('hide', f !== 'all' && cats.indexOf(f) === -1);
      });
    });
  });

  /* ============================================================
     INTERACTIVE TERMINAL
     ============================================================ */
  var termScreen = $('#termScreen');
  var termOut = $('#termOut');
  var termInputEl = $('#termInput');
  var inputLine = $('.term-input-line');

  if (termScreen && termOut && termInputEl) {
    var hidden = document.createElement('input');
    hidden.setAttribute('type', 'text');
    hidden.setAttribute('autocomplete', 'off');
    hidden.setAttribute('autocapitalize', 'off');
    hidden.setAttribute('autocorrect', 'off');
    hidden.setAttribute('spellcheck', 'false');
    hidden.setAttribute('aria-hidden', 'true');
    hidden.style.cssText = 'position:fixed;bottom:0;left:0;width:1px;height:1px;opacity:0;border:0;padding:0;font-size:16px;';
    document.body.appendChild(hidden);

    var history = [];
    var histIdx = -1;
    var buffer = '';

    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
    function print(html, cls) {
      var d = document.createElement('div');
      d.className = 'line' + (cls ? ' ' + cls : '');
      d.innerHTML = html;
      termOut.appendChild(d);
      termScreen.scrollTop = termScreen.scrollHeight;
    }
    function gap() { print('&nbsp;'); }
    function render() { termInputEl.textContent = buffer; termScreen.scrollTop = termScreen.scrollHeight; }

    function echo(cmd) {
      print('<span class="muted">tyler@osaka</span><span class="muted">:</span><span class="ac">~</span><span class="muted">$</span> <span class="cmd-echo">' + esc(cmd) + '</span>');
    }

    function L(label, val) { return '<span class="kv"><b>' + label + '</b>  ' + val + '</span>'; }
    function gh(name, url) { return '<a href="' + url + '" target="_blank" rel="noopener">' + name + '</a>'; }

    var COMMANDS = {
      help: function () {
        print('available commands', 'ac');
        print(
          '  <span class="ac">about</span>       who I am\n' +
          '  <span class="ac">skills</span>      languages &amp; stack\n' +
          '  <span class="ac">experience</span>  work history\n' +
          '  <span class="ac">projects</span>    what I\'ve built  <span class="muted">(then: open &lt;name&gt;)</span>\n' +
          '  <span class="ac">education</span>   degrees &amp; certs\n' +
          '  <span class="ac">contact</span>     reach me\n' +
          '  <span class="ac">neofetch</span>    system card\n' +
          '  <span class="ac">lang</span> ja|en  switch language 日本語/EN\n' +
          '  <span class="ac">theme</span>       cycle accent color\n' +
          '  <span class="ac">goto</span> &lt;sec&gt;   jump to a section\n' +
          '  <span class="ac">clear</span>       clear the screen', 'blk');
        print('<span class="muted">tip: ↑/↓ history · Tab completes</span>');
      },
      about: function () {
        print('Tyler Freemont — Software Engineer, AI Systems', 'ac');
        print('Osaka, Japan · English (native) · 日本語 JLPT N1\n\n' +
          'I build self-hosted LLM pipelines, MCP servers, RAG and\n' +
          'multi-agent tooling in Python, TypeScript and C++ — on top\n' +
          'of an infrastructure background in network automation,\n' +
          'Linux and AWS. Currently shipping AI systems at MiraX and\n' +
          'evaluating frontier models for code &amp; math (RLHF).', 'blk');
      },
      skills: function () {
        print('skills', 'ac');
        print(
          L('ai/llm    ', 'Ollama · llama.cpp · MCP · RAG · LangChain · RLHF') + '\n' +
          L('languages ', 'Python · TypeScript · C++ · C# · Go · Rust') + '\n' +
          L('infra     ', 'Linux · Docker · AWS · CI/CD · network automation') + '\n' +
          L('apps      ', 'PyQt6 · React · HTML5 Canvas · SaaS') + '\n' +
          L('spoken    ', 'English (native) · 日本語 (JLPT N1)'), 'blk');
      },
      experience: function () {
        print('experience', 'ac');
        print(
          '<span class="ok">2026—now</span>  Software Engineer, AI Systems — <span class="ac2">MiraX</span>\n' +
          '<span class="ok">2024—now</span>  AI Evaluation Specialist (Code/Math) — <span class="ac2">Outlier/Alignerr</span>\n' +
          '<span class="ok">2023—26 </span>  Software / Infrastructure Engineer — <span class="ac2">Neighbors Inc.</span>\n' +
          '<span class="ok">2022—23 </span>  EN↔JP Technical Translator — <span class="ac2">Freelance</span>\n' +
          '<span class="ok">2021—23 </span>  English Instructor — <span class="ac2">Soshi Gakuen H.S.</span>', 'blk');
        print('<span class="muted">scroll to #work for details, or: goto work</span>');
      },
      projects: function () {
        print('projects  <span class="muted">— open &lt;name&gt; to view source</span>', 'ac');
        print(
          '  <span class="ac">council</span>     LLM Council · multi-agent game builder\n' +
          '  <span class="ac">toolkit</span>     Local LLM Desktop Toolkit · llama.cpp + Whisper\n' +
          '  <span class="ac">localsync</span>   offline notes/todo/finance · PyQt6\n' +
          '  <span class="ac">orchcheck</span>   orchestration &amp; health-check service\n' +
          '  <span class="ac">docling</span>     OSS · docs → gen-AI / RAG\n' +
          '  <span class="ac">cardio</span>      OSS · roguelike deck-builder', 'blk');
        print('<span class="muted">e.g. `open toolkit` — or `goto projects` for all</span>');
      },
      open: function (args) {
        var map = {
          council: 'https://github.com/tylerfreemont0712',
          toolkit: 'https://github.com/TylerFreemont0712/llama-launcher',
          localsync: 'https://github.com/TylerFreemont0712/LocalSyncOrganization',
          orchcheck: 'https://github.com/TylerFreemont0712/OrchCheck',
          docling: 'https://github.com/TylerFreemont0712/docling',
          cardio: 'https://github.com/TylerFreemont0712/cardio',
          github: 'https://github.com/tylerfreemont0712'
        };
        var key = (args[0] || '').toLowerCase();
        if (!key) { print('usage: open &lt;council|toolkit|localsync|orchcheck|docling|cardio&gt;', 'warn'); return; }
        if (map[key]) { print('opening ' + key + ' ↗', 'ok'); window.open(map[key], '_blank', 'noopener'); }
        else { print('no project "' + esc(key) + '". try: projects', 'err'); }
      },
      education: function () {
        print('education &amp; credentials', 'ac');
        print(
          'B.A. Japanese Language &amp; Culture / Communications\n' +
          '  Portland State University · Portland, OR\n' +
          'Exchange — Doshisha University · Kyoto, JP\n' +
          'Math · C++ · CS Fundamentals — Clackamas CC · OR\n\n' +
          '<span class="ok">certs:</span> AWS Developer · AWS Solutions Architect ·\n' +
          '       Google IT Support · JLPT N1', 'blk');
      },
      contact: function () {
        print('contact', 'ac');
        print(
          L('email ', '<a href="mailto:tfreemont0712@gmail.com">tfreemont0712@gmail.com</a>') + '\n' +
          L('github', gh('github.com/tylerfreemont0712', 'https://github.com/tylerfreemont0712')) + '\n' +
          L('where ', 'Osaka, Japan · 34.69°N 135.50°E'), 'blk');
      },
      neofetch: function () {
        var art = [
          '   <span class="ac">/\\_/\\</span>      ', '  <span class="ac">( o.o )</span>     ',
          '   <span class="ac">&gt; ^ &lt;</span>      '
        ];
        print(
          '<span class="ac">  ____ </span>   <b class="ac">tyler</b>@<b class="ac">osaka</b>\n' +
          '<span class="ac"> |_  _|</span>  <span class="muted">─────────────────────────</span>\n' +
          '<span class="ac">   ||  </span>  <span class="kv"><b>os</b>      tylerOS · Linux</span>\n' +
          '<span class="ac">   ||  </span>  <span class="kv"><b>role</b>    Software Engineer, AI Systems</span>\n' +
          '<span class="ac">   ||  </span>  <span class="kv"><b>uptime</b>  5+ yrs shipping</span>\n' +
          '<span class="ac">  _||_ </span>  <span class="kv"><b>shell</b>   python · typescript · c++</span>\n' +
          '<span class="ac"> |____|</span>  <span class="kv"><b>models</b>  qwen · deepseek · gemma · gpt-oss</span>\n' +
          '<span class="ac">       </span>  <span class="kv"><b>lang</b>    EN native · 日本語 N1</span>\n' +
          '<span class="ac">       </span>  <span class="kv"><b>locale</b>  ja_JP · Osaka</span>', 'blk');
      },
      lang: function (args) {
        var a = (args[0] || '').toLowerCase();
        if (a === 'ja' || a === 'jp' || a === '日本語') { setLang('ja'); print('言語を日本語に切り替えました。', 'ok'); }
        else if (a === 'en') { setLang('en'); print('language set to English.', 'ok'); }
        else { print('current: ' + (document.body.getAttribute('data-lang') === 'ja' ? '日本語' : 'English') + ' — usage: lang ja|en', 'warn'); }
      },
      theme: function (args) {
        var a = (args[0] || '').toLowerCase();
        if (a && setTheme(a)) { print('theme → ' + a, 'ok'); }
        else if (a) { print('themes: ' + THEMES.join(' · '), 'warn'); }
        else { cycleTheme(); print('theme → ' + document.documentElement.dataset.theme, 'ok'); }
      },
      goto: function (args) {
        var sec = (args[0] || '').toLowerCase().replace('#', '');
        var valid = ['about', 'work', 'skills', 'projects', 'education', 'contact', 'top'];
        if (valid.indexOf(sec) === -1) { print('sections: ' + valid.join(' · '), 'warn'); return; }
        var t = document.getElementById(sec === 'top' ? 'top' : sec);
        if (t) { print('→ ' + sec, 'ok'); t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }
      },
      echo: function (args) { print(esc(args.join(' ')) || '&nbsp;'); },
      date: function () { print(new Date().toString()); },
      whoami: function () { print('tyler — software engineer, ai systems · osaka', 'ac'); },
      ls: function () { print('about  work  skills  projects  education  contact', 'ac'); },
      sudo: function () { print('nice try — but you already have everything you need. 😄', 'warn'); },
      exit: function () { print('there is no exit. only more scrolling. → #contact', 'warn'); var c = document.getElementById('contact'); if (c) c.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); },
      clear: function () { termOut.innerHTML = ''; }
    };
    var ALIAS = { work: 'experience', exp: 'experience', cv: 'experience', resume: 'experience', who: 'whoami', bio: 'about', cd: 'goto', jp: 'lang', ja: 'lang', '日本語': 'lang', github: 'contact', email: 'contact', man: 'help', '?': 'help', proj: 'projects', cls: 'clear' };

    function run(raw) {
      var line = raw.trim();
      if (!line) { echo(''); return; }
      echo(line);
      var parts = line.split(/\s+/);
      var name = parts[0].toLowerCase();
      var args = parts.slice(1);
      if (ALIAS[name]) {
        if (name === 'ja' || name === 'jp' || name === '日本語') args = ['ja'];
        name = ALIAS[name];
      }
      if (COMMANDS[name]) { try { COMMANDS[name](args); } catch (e) { print('error running command', 'err'); } }
      else { print('command not found: ' + esc(name) + " — type 'help'", 'err'); }
      gap();
    }

    /* input handling via hidden field */
    function focusTerm() { hidden.focus({ preventScroll: true }); termScreen.classList.add('focused'); }
    termScreen.addEventListener('mousedown', function (e) { if (!e.target.closest('a')) { setTimeout(focusTerm, 0); } });
    termScreen.addEventListener('focus', focusTerm);
    hidden.addEventListener('blur', function () { termScreen.classList.remove('focused'); });
    hidden.addEventListener('input', function () { buffer = hidden.value; render(); });

    hidden.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var cmd = buffer;
        if (cmd.trim()) { history.push(cmd); if (history.length > 60) history.shift(); }
        histIdx = history.length;
        buffer = ''; hidden.value = ''; render();
        run(cmd);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length && histIdx > 0) { histIdx--; buffer = history[histIdx]; hidden.value = buffer; render(); }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx < history.length - 1) { histIdx++; buffer = history[histIdx]; }
        else { histIdx = history.length; buffer = ''; }
        hidden.value = buffer; render();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        var pre = buffer.trim().toLowerCase();
        if (pre) {
          var pool = Object.keys(COMMANDS).concat(Object.keys(ALIAS));
          var hit = pool.filter(function (c) { return c.indexOf(pre) === 0; });
          if (hit.length === 1) { buffer = hit[0] + ' '; hidden.value = buffer; render(); }
          else if (hit.length > 1) { print(hit.join('   '), 'muted'); }
        }
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault(); termOut.innerHTML = '';
      }
    });

    /* welcome banner */
    function welcome() {
      print('<span class="ac">tylerOS</span> — local inference node · interactive shell', 'blk');
      print("type <span class=\"ac\">help</span> for commands · <span class=\"ac\">neofetch</span> for the system card", 'muted');
      gap();
    }

    /* ============================================================
       BOOT SEQUENCE
       ============================================================ */
    var boot = $('#boot'), bootLog = $('#bootLog'), bootSkip = $('#bootSkip');
    var bootLines = [
      "<span class='ac'>tylerOS 24.06</span> — booting local inference node…",
      "[<span class='ok'>  ok  </span>] mounting /home/tyler",
      "[<span class='ok'>  ok  </span>] llama.cpp runtime ........ ready",
      "[<span class='ok'>  ok  </span>] MCP servers .............. online",
      "[<span class='ok'>  ok  </span>] RAG index ................ warm",
      "[<span class='ok'>  ok  </span>] bilingual layer EN/JA .... loaded",
      "[<span class='ok'>  ok  </span>] agents ................... 5 idle",
      "<span class='ac'>welcome.</span> launching portfolio →"
    ];

    function endBoot() {
      if (!boot) return;
      boot.classList.add('done');
      sessionStorage.setItem('tf-booted', '1');
      setTimeout(function () { if (boot && boot.parentNode) boot.parentNode.removeChild(boot); }, 600);
      welcome();
    }

    var booted = sessionStorage.getItem('tf-booted');
    if (boot && bootLog && !booted && !reduceMotion) {
      var i = 0;
      var tick = function () {
        if (i < bootLines.length) {
          bootLog.innerHTML += bootLines[i] + "\n";
          i++;
          setTimeout(tick, i === 1 ? 260 : 150);
        } else { setTimeout(endBoot, 450); }
      };
      setTimeout(tick, 200);
      var skip = function () { endBoot(); document.removeEventListener('keydown', skip); };
      if (bootSkip) bootSkip.addEventListener('click', skip);
      document.addEventListener('keydown', skip);
      boot.addEventListener('click', skip);
    } else {
      if (boot && boot.parentNode) boot.parentNode.removeChild(boot);
      welcome();
    }

    render();
  }
})();
