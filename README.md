# tylerfreemont0712.github.io

Personal site & portfolio for **Tyler Freemont** — software engineer working on
local LLM infrastructure, MCP servers, RAG and multi-agent systems in Osaka, Japan.

**Live:** https://tylerfreemont0712.github.io

---

## About the build

A hand-built, **framework-free static site** — no Jekyll, no theme, no build step.
Just HTML, CSS and vanilla JavaScript served straight from GitHub Pages
(a `.nojekyll` file disables the default Jekyll processing).

### Highlights

- **Interactive terminal** in the hero — type real commands (`help`, `about`,
  `skills`, `projects`, `open toolkit`, `neofetch`, `goto contact`…) with command
  history (`↑`/`↓`) and `Tab` completion.
- **Bilingual EN / 日本語** toggle (`lang ja` from the terminal, or the `EN / 日本語`
  button) — a nod to JLPT N1.
- **Boot sequence** intro, **themeable accent colors**, animated skill meters,
  scroll-spy navigation and a filterable project grid.
- Accessible & responsive: respects `prefers-reduced-motion`, works without
  JavaScript, semantic HTML, Open Graph / Twitter cards and JSON-LD structured data.

### Structure

```
index.html              # the whole site, one page
404.html                # themed not-found page
assets/css/site.css     # all styling + theme variables
assets/js/site.js       # terminal, i18n, theming, interactions
assets/favicon.svg      # monogram favicon
assets/images/          # portrait
site.webmanifest        # PWA manifest
robots.txt · sitemap.xml
.nojekyll               # serve as plain static files
```

## Local preview

No toolchain required — open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## License

Code is released under the [MIT License](./LICENSE). Personal content, copy and
the portrait are © Tyler Freemont.
