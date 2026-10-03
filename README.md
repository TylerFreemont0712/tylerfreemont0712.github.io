# tylerfreemont0712.github.io

Personal site for **Tyler Freemont** — Software Engineer, AI Systems (Osaka, Japan).
Live at <https://tylerfreemont0712.github.io>.

Static Jekyll site on GitHub Pages. No build step beyond what Pages runs itself.

## Structure

```
_data/profile.yml      canonical facts — name, title, credibility line,
                       availability, résumé variants, verified figures
_includes/nav.html     top bar (JS-free; wraps rather than using a toggle)
_includes/hero.html    above-the-fold block; takes lang="ja"
_includes/arch-diagram.html  inline SVG architecture diagram, EN/JA labels
_includes/icon.html    inline SVG icon set (replaces the Font Awesome CDN)
_includes/lang-notice.html   remembers a language choice without redirecting
_includes/footer.html  closing call to action
_layouts/default.html  shell, JSON-LD Person, hreflang, reveal-on-scroll
_layouts/post.html     single article
_sass/_components.scss components + JA typography; imported last so it wins
index.md               landing — hook, proof, availability, CTA
projects.md            case studies, deepest first
experience.md          work history, toolchain, credentials
resume.md              résumé download hub
writing.md             technical articles
ja/                    Japanese site — same five pages, written for a
                       Japanese reader rather than translated
assets/resume/         the four résumé PDFs
assets/program-images/ AIOS and Rootward screenshots used as evidence
```

Content facts live in `_data/profile.yml` rather than in page markup, so the
Japanese version reuses them without the two drifting apart.

## Bilingual setup

Every page declares `lang:` and `alt_url:` in front matter. `alt_url` drives
three things: the header language toggle, the footer language link, and the
`hreflang` pair in `<head>` (English carries `x-default`). The pairs must stay
reciprocal — if `/projects` points at `/ja/projects`, that page must point back.

The Japanese pages are not translations. `/ja/` leads with 生成AI基盤 because
that is what agents search for, and it carries a 希望条件 table — contract type,
work authorisation, availability — that the English landing page has no reason
to include.

## Conventions

- **Every claim must be defensible in an interview.** The résumé built from
  `JobApplication/profile/master-profile.yaml` is the source of truth; if the
  site and the résumé disagree, the résumé wins.
- **No unverified numbers.** A figure goes in `_data/profile.yml` only once it is
  confirmed. Anything still unconfirmed is omitted rather than estimated.
- **Nothing links to a repository that does not exist.** Projects without public
  source are written as standalone case studies.
- **No-JS must work.** Reveal-on-scroll is scoped to `html.js`, set by an inline
  script. With scripting off, nothing is hidden.

## Local development

```sh
bundle install
bundle exec jekyll serve
```

## Theme

Built on the [Hacker](https://github.com/pages-themes/hacker) Jekyll theme
(CC0), with roughly 1,300 lines of custom SCSS layered on top of it.
