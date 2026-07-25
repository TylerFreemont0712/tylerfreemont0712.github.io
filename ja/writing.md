---
layout: default
lang: ja
alt_url: /writing
title: 技術記事
nav: writing
permalink: /ja/writing
description: >-
  ローカルLLM基盤、MCPサーバ、量子化、モデル評価に関する技術記事。
  日本語環境特有の課題を中心に、実務で得られた知見を公開しています。
---

<section class="pane reveal" aria-labelledby="wr-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">writing</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">ls</span> ~/writing/</p>
      <h1 class="sec-title" id="wr-h">技術記事</h1>
      <p class="sec-note">
        本番環境で生成AI基盤を構築する中で、日本語の情報が見つかりにくかった話題を
        中心に書いています。
        <a href="{{ '/feed.xml' | relative_url }}">RSS</a>
      </p>
    </div>

    {%- assign ja_posts = site.posts | where: "lang", "ja" -%}
    {%- if ja_posts.size > 0 %}
    <ul class="post-list">
      {%- for post in ja_posts %}
      <li lang="ja">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y年%-m月%-d日" }}</time>
          {%- assign chars = post.content | strip_html | size -%}
          {%- assign mins = chars | divided_by: 500 | plus: 1 %}
          <span aria-hidden="true">·</span> <span>{{ mins }}分</span>
          {%- if post.alt_url %}
          <span aria-hidden="true">·</span>
          <a href="{{ post.alt_url | relative_url }}" lang="en">English</a>
          {%- endif %}
        </p>
        {%- if post.description %}<p>{{ post.description | strip_newlines | strip }}</p>{% endif %}
        {%- if post.tags and post.tags != empty %}
        <ul class="post-tags">
          {%- for tag in post.tags %}<li>{{ tag }}</li>{% endfor %}
        </ul>
        {%- endif %}
      </li>
      {%- endfor %}
    </ul>
    {%- else %}
    <p class="empty-state">現在準備中です。</p>
    {%- endif %}

    <p class="sec-more">
      <a href="{{ '/writing' | relative_url }}" class="btn btn-ghost" lang="en">English articles</a>
    </p>
  </div>
</section>
