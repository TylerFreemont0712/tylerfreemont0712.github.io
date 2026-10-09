---
layout: default
lang: ja
alt_url: /resume
title: 職務経歴書・レジュメ
nav: resume
permalink: /ja/resume
dwg: TF-005
sheet: "05"
description: >-
  Tyler Freemontの職務経歴書・英文レジュメのダウンロード。日本語の職務経歴書、正社員向け、AI評価業務向け、業務委託向けの4種類をご用意しています。
---
{%- assign p = site.data.profile -%}
{%- comment -%}
  The 職務経歴書 is listed first and marked as recommended here — the opposite
  of the English page. Same files, ordered for whoever is actually reading.
{%- endcomment -%}
{%- assign first = p.resume.variants | where: "id", "shokumu-keirekisho" -%}
{%- assign rest = p.resume.variants | where_exp: "v", "v.id != 'shokumu-keirekisho'" -%}
{%- assign ordered = first | concat: rest -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">図番 TF-005 · 第05葉 · 出図一覧</span></div>
    <h1 class="ps-title">職務経歴書</h1>
    <p class="ps-tag">
      内容は同一で、応募先に応じて構成を変えた4種類をご用意しています。日本の企業様・エージェント様は<strong>職務経歴書</strong>をご覧ください。
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">出図情報</caption>
    <tbody>
      <tr><th scope="row">用途</th><td>採用選考（正社員・業務委託）</td></tr>
      <tr><th scope="row">形式</th><td>PDF・USレター</td></tr>
      <tr><th scope="row">その他の形式</th><td>履歴書など所定の書式が必要な場合は<a href="mailto:{{ p.contact.email }}?subject=%E8%81%B7%E5%8B%99%E7%B5%8C%E6%AD%B4%E6%9B%B8%E3%81%AE%E3%81%94%E4%BE%9D%E9%A0%BC">メール</a>でお知らせください</td></tr>
    </tbody>
  </table>
</header>

<section class="view reveal" aria-labelledby="set-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="set-h">出図一覧<span class="alt" lang="en">Print set</span></h2>
    <span class="view-ref">全{{ ordered.size }}種</span>
  </header>
  <ul class="printset">
    {%- for v in ordered %}
    {%- assign thumb = v.file | replace: "/resume/", "/resume/thumbs/" | replace: ".pdf", ".webp" %}
    {%- assign rec = false -%}{%- if v.id == "shokumu-keirekisho" -%}{%- assign rec = true -%}{%- endif %}
    <li>
      <a class="thumb ticks" href="{{ v.file | relative_url }}" download>
        <img src="{{ thumb | relative_url }}" width="640" height="829" loading="lazy" decoding="async" alt="{{ v.label_ja }}の1ページ目">
        {%- if rec %}<span class="stamp">推奨<small>Start here</small></span>{% endif %}
      </a>
      <h2><span class="balloon{% if rec %} is-red{% endif %}" aria-hidden="true">{{ forloop.index }}</span>{{ v.label_ja }}</h2>
      <p>{% case v.id %}{% when "shokumu-keirekisho" %}日本の企業様・エージェント様向けの職務経歴書（日本語）。{% when "japan-fulltime" %}日本国内のAI・LLMエンジニア職向けの英文レジュメ。{% when "ai-evaluation" %}フロンティアモデルの評価・RLHF業務に重点を置いた英文レジュメ。{% when "contracting" %}フリーランスエージェント様・直接契約向けの1枚版（英文）。{% endcase %}</p>
      <p class="meta">PDF · {{ v.pages }}ページ</p>
      <p><a class="btn btn-small{% if rec %} btn-primary{% endif %}" href="{{ v.file | relative_url }}" download>{% include icon.html name="download" %}ダウンロード</a></p>
    </li>
    {%- endfor %}
  </ul>
</section>
