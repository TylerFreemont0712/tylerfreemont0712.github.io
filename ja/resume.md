---
layout: default
lang: ja
alt_url: /resume
title: 職務経歴書・レジュメ
nav: resume
permalink: /ja/resume
description: >-
  Tyler Freemontの職務経歴書・英文レジュメのダウンロード。日本語の職務経歴書、
  正社員向け、AI評価業務向け、業務委託向けの4種類をご用意しています。
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
      <h1 class="sec-title" id="res-h">職務経歴書・レジュメ</h1>
      <p class="sec-note">
        内容は同一で、応募先に応じて構成を変えた4種類をご用意しています。日本の企業様・
        エージェント様は<strong>職務経歴書</strong>をご覧ください。
      </p>
    </div>

    <ul class="resume-list">
      {%- comment -%}
        The 職務経歴書 is listed first here and marked as the recommended one,
        which is the opposite of the English page. Same files, ordered for
        whoever is actually reading.
      {%- endcomment -%}
      {%- for v in p.resume.variants -%}
      {%- if v.id == "shokumu-keirekisho" %}
      <li class="resume-item is-default" lang="ja">
        <div class="resume-meta">
          <h2>{{ v.label_ja }} <span class="badge">まずはこちら</span></h2>
          <p>日本語・日本形式の職務経歴書です。エージェント様および日本企業様向け。</p>
        </div>
        {%- if v.file != "" %}
        <a class="btn btn-primary" href="{{ v.file | relative_url }}" download>
          {% include icon.html name="download" %} PDF{% if v.pages %}・{{ v.pages }}ページ{% endif %}
        </a>
        {%- else %}
        <span class="btn btn-disabled" aria-disabled="true">準備中</span>
        {%- endif %}
      </li>
      {%- endif -%}
      {%- endfor %}

      {%- for v in p.resume.variants -%}
      {%- unless v.id == "shokumu-keirekisho" %}
      <li class="resume-item">
        <div class="resume-meta">
          <h2>{{ v.label_ja }} <span class="lang-tag" lang="en">English</span></h2>
          <p>
            {%- if v.id == "japan-fulltime" -%}
              日本国内のAI・LLMエンジニア職への応募用（英文）。
            {%- elsif v.id == "ai-evaluation" -%}
              AI評価・RLHF業務向けに重点を置いた構成（英文）。
            {%- else -%}
              業務委託・フリーランス案件向けの1ページ構成（英文）。
            {%- endif -%}
          </p>
        </div>
        {%- if v.file != "" %}
        <a class="btn btn-ghost" href="{{ v.file | relative_url }}" download>
          {% include icon.html name="download" %} PDF{% if v.pages %}・{{ v.pages }}ページ{% endif %}
        </a>
        {%- else %}
        <span class="btn btn-disabled" aria-disabled="true">準備中</span>
        {%- endif %}
      </li>
      {%- endunless -%}
      {%- endfor %}
    </ul>

    {%- if available == 0 %}
    <p class="resume-fallback">
      現在PDFを整備中です。
      <a href="mailto:{{ p.contact.email }}?subject=%E8%81%B7%E5%8B%99%E7%B5%8C%E6%AD%B4%E6%9B%B8%E3%81%AE%E3%81%94%E4%BE%9D%E9%A0%BC">{{ p.contact.email }}</a>
      までご連絡いただければ、当日中にご希望の形式でお送りいたします。
    </p>
    {%- else %}
    <p class="resume-fallback">
      ご希望の形式や、案件内容に合わせた記載の調整も承ります。
      <a href="mailto:{{ p.contact.email }}">{{ p.contact.email }}</a> までお気軽にご連絡ください。
    </p>
    {%- endif %}
  </div>
</section>
