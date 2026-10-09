# tylerfreemont0712.github.io

Personal site and portfolio for **Tyler Freemont** — software engineer in Osaka
building AI systems and games. Live at <https://tylerfreemont0712.github.io>,
in English and Japanese (`/ja/`).

The site is drawn as a set of **engineering drawings**: every page is a framed
sheet with zone markers, a title block, item balloons keyed to a parts list,
dimension lines, revision clouds and a revision history. Two colourways —
*blueprint* (default) and *whiteprint* — plus a **Plain** view that strips the
decoration for fast reading, and a print stylesheet.

Static Jekyll on GitHub Pages, no theme and no build step beyond what Pages runs.

## Structure

```
_data/profile.yml        canonical facts: name, title, credibility, availability, résumés
_data/projects.yml       the parts list — every project, tier, stack, measured spec, dates
_data/career.yml         career as revisions A–E, for the landing page table
_data/i18n.yml           UI strings for the chrome, per language
_layouts/default.html    the sheet: top bar, frame, title block, colophon, head/meta
_layouts/sheet.html      a project drawing sheet (case study)
_layouts/post.html       an article
_projects/*.md           project sheets (EN); _projects/ja/*.md (JA)
_includes/bom.html       parts-list table
_includes/exploded.html  isometric exploded view on the landing page   (generated)
_includes/dg/*.html      assembly drawings for each project sheet        (generated)
_includes/titleblock.html  footer as a drawing title block, with the contact CTA
assets/css/site.css      all styles — plain CSS, see the note at its top
assets/js/site.js        progressive enhancement only
tools/                   generators for the SVG drawings (not published)
index.md, projects.md, experience.md, resume.md, writing.md, ja/…   the five sheets
```

## Conventions

- **Every claim must be defensible in an interview.** Figures on project
  sheets were counted from each repository (code lines exclude blanks, comments,
  vendored and generated files). Résumé facts come from the résumé build; if the
  site and the résumé disagree, the résumé wins.
- **Private work is described, never linked.** Empty repositories and earlier
  copies of the same project are left out of the parts list.
- **No-JS must work.** Animations are scoped to `html.js`; with scripting off
  nothing is hidden and the theme/plain toggles are simply not shown.
- **Bilingual pairs are reciprocal.** Every page sets `lang` and `alt_url`; the
  Japanese pages are written for a Japanese reader, not translated line by line.
- **Diagrams are generated.** Edit `tools/gen_exploded.py` or
  `tools/gen_diagrams.py` and re-run them; don't hand-edit the output.

## Local development

```sh
bundle install
LANG=C.UTF-8 bundle exec jekyll serve
python3 tools/gen_diagrams.py && python3 tools/gen_exploded.py   # after editing drawings
```
