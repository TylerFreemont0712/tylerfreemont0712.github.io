---
layout: default
lang: en
alt_url: /ja/writing
title: Writing
nav: writing
permalink: /writing
description: >-
  Technical writing by Tyler Freemont on local LLM infrastructure, MCP servers,
  quantisation and model evaluation — in English and Japanese.
---

<section class="pane reveal" aria-labelledby="wr-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">writing</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">ls</span> ~/writing/</p>
      <h1 class="sec-title" id="wr-h">Writing</h1>
      <p class="sec-note">
        Notes on things that were hard to find good material on while building
        production LLM infrastructure. Some of these exist in Japanese too —
        there is very little written about running this stack against Japanese
        data.
        <a href="{{ '/feed.xml' | relative_url }}">RSS</a>
      </p>
    </div>

    {%- assign en_posts = site.posts | where_exp: "post", "post.lang != 'ja'" -%}
    {%- if en_posts.size > 0 %}
    <ul class="post-list">
      {%- for post in en_posts %}
      <li>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %B %Y" }}</time>
          {%- assign mins = post.content | number_of_words | divided_by: 200 | plus: 1 %}
          <span aria-hidden="true">·</span> <span>{{ mins }} min read</span>
          {%- if post.alt_url %}
          <span aria-hidden="true">·</span>
          <a href="{{ post.alt_url | relative_url }}" lang="ja">日本語版</a>
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
    <p class="empty-state">Nothing published yet.</p>
    {%- endif %}
  </div>
</section>
