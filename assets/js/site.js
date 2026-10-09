/* Blueprint — progressive enhancement only.
   Every feature here is optional: with this file blocked the site is fully
   readable, because nothing is hidden unless html.js is set and the
   matching behaviour below has run. */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  function store(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* ── colourway: blueprint (default) / whiteprint ─────────────────── */
  var themeBtn = doc.querySelector('[data-theme-toggle]');
  function syncTheme() {
    if (!themeBtn) return;
    var light = root.getAttribute('data-theme') === 'whiteprint';
    themeBtn.setAttribute('aria-pressed', light ? 'true' : 'false');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var light = root.getAttribute('data-theme') !== 'whiteprint';
      if (light) root.setAttribute('data-theme', 'whiteprint'); else root.removeAttribute('data-theme');
      store('tf-theme', light ? 'whiteprint' : null);
      syncTheme();
      drawClouds();
    });
    syncTheme();
  }

  /* ── plain view ──────────────────────────────────────────────────── */
  var plainBtn = doc.querySelector('[data-plain-toggle]');
  function isPlain() { return root.getAttribute('data-view') === 'plain'; }
  function syncPlain() {
    if (plainBtn) plainBtn.setAttribute('aria-pressed', isPlain() ? 'true' : 'false');
    setCrosshair();
  }
  if (plainBtn) {
    plainBtn.addEventListener('click', function () {
      if (isPlain()) { root.removeAttribute('data-view'); store('tf-view', null); }
      else { root.setAttribute('data-view', 'plain'); store('tf-view', 'plain'); }
      syncPlain();
    });
  }

  /* ── crosshair cursor + coordinate readout ───────────────────────── */
  var xh = doc.querySelector('.crosshair'), coord = doc.querySelector('[data-coord]');
  var parts = xh ? { h: xh.querySelector('.xh'), v: xh.querySelector('.xv'), b: xh.querySelector('.xb') } : null;
  var raf = 0, mx = 0, my = 0;
  function pad(n) { n = Math.max(0, Math.round(n)); return ('0000' + n).slice(-4); }
  function paint() {
    raf = 0;
    if (parts) {
      parts.h.style.transform = 'translateY(' + my + 'px)';
      parts.v.style.transform = 'translateX(' + mx + 'px)';
      parts.b.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    }
    if (coord) coord.textContent = 'X ' + pad(mx + window.scrollX) + '  Y ' + pad(my + window.scrollY);
  }
  function onMove(e) { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(paint); }
  function setCrosshair() {
    var on = finePointer && !isPlain();
    root.classList.toggle('has-xhair', on);
  }
  if (finePointer) {
    doc.addEventListener('pointermove', onMove, { passive: true });
    doc.addEventListener('pointerleave', function () { root.classList.remove('has-xhair'); });
    doc.addEventListener('pointerenter', setCrosshair);
  }
  syncPlain();

  /* ── revision clouds: scalloped outline sized to the element ─────── */
  function cloudPath(w, h, r) {
    // walk the rectangle clockwise, emitting arcs of ~2r chord length
    var d = '', pts = [];
    function edge(x0, y0, x1, y1) {
      var len = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.round(len / (r * 2)));
      for (var i = 0; i < n; i++) pts.push([x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n]);
    }
    edge(0, 0, w, 0); edge(w, 0, w, h); edge(w, h, 0, h); edge(0, h, 0, 0);
    pts.push(pts[0]);
    d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], cr = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.62;
      d += 'A' + cr.toFixed(1) + ' ' + cr.toFixed(1) + ' 0 0 1 ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
    }
    return d;
  }
  function drawClouds() {
    $all('.revcloud').forEach(function (el) {
      var w = el.offsetWidth + 24, h = el.offsetHeight + 24;
      if (!w || !h) return;
      var svg = el.querySelector('svg.cloud');
      if (!svg) {
        svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'cloud'); svg.setAttribute('aria-hidden', 'true');
        svg.appendChild(doc.createElementNS('http://www.w3.org/2000/svg', 'path'));
        el.appendChild(svg);
      }
      svg.setAttribute('viewBox', '-4 -4 ' + (w + 8) + ' ' + (h + 8));
      svg.firstChild.setAttribute('d', cloudPath(w, h, 9));
      el.classList.add('has-cloud');
    });
  }
  drawClouds();
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function () { drawClouds(); });
    $all('.revcloud').forEach(function (el) { ro.observe(el); });
  }
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(drawClouds);

  /* ── drawn-in lines: measure each path so the dash animation fits ── */
  $all('.draw .edge, .draw .xv-axis').forEach(function (p) {
    if (p.getTotalLength) { try { p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 1); } catch (e) {} }
  });

  /* ── reveal on scroll ────────────────────────────────────────────── */
  var revealables = $all('.reveal, .draw, .exploded');
  function show(el) {
    el.classList.add('is-in');
    if (el.classList.contains('exploded')) el.classList.add('is-open');
  }
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ── cross-highlighting: diagram parts <-> numbered notes ────────── */
  $all('[data-ref]').forEach(function (el) {
    var scope = el.closest('[data-xref]') || doc;
    var ref = el.getAttribute('data-ref');
    function set(on) {
      $all('[data-ref="' + ref + '"]', scope).forEach(function (m) { m.classList.toggle('is-hot', on); });
    }
    el.addEventListener('mouseenter', function () { set(true); });
    el.addEventListener('mouseleave', function () { set(false); });
    el.addEventListener('focusin', function () { set(true); });
    el.addEventListener('focusout', function () { set(false); });
  });

  /* ── sheet table of contents: mark the section in view ───────────── */
  var toc = doc.querySelector('.ps-toc');
  if (toc && 'IntersectionObserver' in window) {
    var links = $all('a[href^="#"]', toc), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var current = null;
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          if (current) current.classList.remove('is-active');
          current = map[e.target.id]; current.classList.add('is-active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var s = doc.getElementById(id); if (s) tio.observe(s); });
  }
})();
