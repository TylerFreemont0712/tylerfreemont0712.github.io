# tylerfreemont0712.github.io

Personal site for **Tyler Freemont** — Software Engineer, AI Systems (Osaka, Japan).
Live at <https://tylerfreemont0712.github.io>.

Static Jekyll site on GitHub Pages. No build step beyond what Pages runs itself.

## Structure

```
_data/profile.yml      canonical facts — name, title, credibility line,
                       availability, résumé variants, verified figures
_includes/nav.html     top bar (JS-free; wraps rather than using a toggle)
_includes/hero.html    above-the-fold block + inline SVG architecture diagram
_includes/footer.html  closing call to action
_layouts/default.html  shell, JSON-LD Person, reveal-on-scroll enhancement
_sass/_components.scss Phase 2 components; imported last so it overrides
index.md               landing — hook, proof, availability, CTA
projects.md            case studies, deepest first
experience.md          work history, toolchain, credentials
resume.md              résumé download hub
writing.md             technical articles (EN + JA)
```

Content facts live in `_data/profile.yml` rather than in page markup, so the
Japanese version can reuse them without the two drifting apart.

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
