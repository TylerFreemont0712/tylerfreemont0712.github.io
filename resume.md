---
layout: default
title: Résumé
nav: resume
permalink: /resume
description: >-
  Download Tyler Freemont's résumé — Japan full-time, AI evaluation, contracting,
  and Japanese 職務経歴書 variants.
---

{%- assign p = site.data.profile -%}
{%- assign available = 0 -%}
{%- for v in p.resume.variants -%}
  {%- if v.file != "" -%}{%- assign available = available | plus: 1 -%}{%- endif -%}
{%- endfor -%}

<section class="pane reveal" aria-labelledby="res-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">resume</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">ls</span> ~/resume/</p>
      <h1 class="sec-title" id="res-h">Résumé</h1>
      <p class="sec-note">
        Four variants, same facts, different emphasis. If you are not sure which one
        you want, take <strong>Japan full-time</strong>.
      </p>
    </div>

    <ul class="resume-list">
      {%- for v in p.resume.variants %}
      <li class="resume-item{% if v.default %} is-default{% endif %}"
          {% if v.lang %}lang="{{ v.lang }}"{% endif %}>
        <div class="resume-meta">
          <h2>
            {{ v.label }}
            {%- if v.default %} <span class="badge">Start here</span>{% endif %}
          </h2>
          <p>{{ v.description }}</p>
        </div>
        {%- if v.file != "" %}
        <a class="btn btn-primary" href="{{ v.file | relative_url }}" download>
          <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i> PDF
        </a>
        {%- else %}
        <span class="btn btn-disabled" aria-disabled="true">Preparing</span>
        {%- endif %}
      </li>
      {%- endfor %}
    </ul>

    {%- if available == 0 %}
    <p class="resume-fallback">
      The PDFs are being finalised. Email
      <a href="mailto:{{ p.contact.email }}?subject=R%C3%A9sum%C3%A9%20request">{{ p.contact.email }}</a>
      and I will send whichever variant fits — same day.
    </p>
    {%- endif %}
  </div>
</section>
