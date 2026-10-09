---
layout: default
lang: en
alt_url: /ja/resume
title: Résumé
nav: resume
permalink: /resume
dwg: TF-005
sheet: "05"
description: >-
  Download Tyler Freemont's résumé — Japan full-time, AI evaluation, contracting,
  and the Japanese 職務経歴書.
---
{%- assign p = site.data.profile -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">Dwg TF-005 · Sheet 05 · Print set</span></div>
    <h1 class="ps-title">Résumé</h1>
    <p class="ps-tag">
      Four prints of the same facts, each weighted for a different reader. If you
      are not sure which one you want, take <strong>Japan full-time</strong>.
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">Issue details</caption>
    <tbody>
      <tr><th scope="row">Issued for</th><td>Hire — full-time or 業務委託</td></tr>
      <tr><th scope="row">Format</th><td>PDF · US Letter</td></tr>
      <tr><th scope="row">Other formats</th><td><a href="mailto:{{ p.contact.email }}?subject=R%C3%A9sum%C3%A9%20request">Email me</a> and I will send whatever your process needs</td></tr>
    </tbody>
  </table>
</header>

<section class="view reveal" aria-labelledby="set-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="set-h">Print set<span class="alt" lang="ja">出図一覧</span></h2>
    <span class="view-ref">{{ p.resume.variants.size }} sheets</span>
  </header>
  <ul class="printset">
    {%- for v in p.resume.variants %}
    {%- assign thumb = v.file | replace: "/resume/", "/resume/thumbs/" | replace: ".pdf", ".webp" %}
    <li{% if v.lang %} lang="{{ v.lang }}"{% endif %}>
      <a class="thumb ticks" href="{{ v.file | relative_url }}" download>
        <img src="{{ thumb | relative_url }}" width="640" height="829" loading="lazy" decoding="async" alt="First page of the {{ v.label }} résumé">
        {%- if v.default %}<span class="stamp" lang="en">Start here<small>Recommended</small></span>{% endif %}
      </a>
      <h2><span class="balloon{% if v.default %} is-red{% endif %}" aria-hidden="true">{{ forloop.index }}</span>{{ v.label }}</h2>
      <p>{{ v.description }}</p>
      <p class="meta">PDF · {{ v.pages }} page{% if v.pages > 1 %}s{% endif %}</p>
      <p><a class="btn btn-small{% if v.default %} btn-primary{% endif %}" href="{{ v.file | relative_url }}" download>{% include icon.html name="download" %}Download</a></p>
    </li>
    {%- endfor %}
  </ul>
</section>
