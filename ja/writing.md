---
layout: default
lang: ja
alt_url: /writing
title: 技術記事
nav: writing
permalink: /ja/writing
dwg: TF-004
sheet: "04"
description: >-
  ローカルLLM基盤、MCPサーバ、量子化、モデル評価に関する技術記事。日本語環境特有の課題を中心に、実務で得られた知見を公開しています。
---
{%- assign ja_posts = site.posts | where: "lang", "ja" -%}
{%- assign en_posts = site.posts | where_exp: "post", "post.lang != 'ja'" -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">図番 TF-004 · 第04葉 · 注記</span></div>
    <h1 class="ps-title">技術記事</h1>
    <p class="ps-tag">
      本番環境で生成AI基盤を構築する中で、日本語の情報が見つかりにくかった話題を中心に書いています。
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">記事について</caption>
    <tbody>
      <tr><th scope="row">記事数</th><td>日本語 {{ ja_posts.size }}本・英語 {{ en_posts.size }}本</td></tr>
      <tr><th scope="row">購読</th><td><a href="{{ '/feed.xml' | relative_url }}">RSS／Atomフィード</a></td></tr>
      <tr><th scope="row">英語の記事</th><td><a href="{{ '/writing' | relative_url }}" lang="en" data-lang-choice="en">All writing (English)</a></td></tr>
    </tbody>
  </table>
</header>

<section class="view reveal" aria-labelledby="notes-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="notes-h">技術記事<span class="alt" lang="en">General notes</span></h2>
    <span class="view-ref">新しい順</span>
  </header>
  {%- if ja_posts.size > 0 %}
  <ol class="notes">
    {%- for post in ja_posts %}
    {%- assign chars = post.content | strip_html | size -%}
    {%- assign mins = chars | divided_by: 500 | plus: 1 %}
    <li>
      <span class="n">{{ ja_posts.size | minus: forloop.index0 | prepend: "0" | slice: -2, 2 }}.</span>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y.%m.%d" }}</time>
      {%- if post.description %}<p class="desc">{{ post.description | strip_newlines | strip }}</p>{% endif %}
      <p class="meta">
        <span>{{ mins }}分で読めます</span>
        {%- if post.alt_url %}<a href="{{ post.alt_url | relative_url }}" lang="en">English</a>{% endif %}
        {%- for tag in post.tags %}<span class="chip">{{ tag }}</span>{% endfor %}
      </p>
    </li>
    {%- endfor %}
  </ol>
  {%- else %}
  <p class="muted">まだ記事はありません。</p>
  {%- endif %}
</section>
