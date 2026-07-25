---
layout: default
lang: en
alt_url: /ja/writing
title: Writing
nav: writing
permalink: /writing
description: >-
  Technical writing by Tyler Freemont on local LLM infrastructure, MCP servers and
  RAG — in English and Japanese.
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
    </div>

    {%- comment -%}
      English articles only. The Japanese ones live on /ja/writing so each
      language's index stays readable on its own.
    {%- endcomment -%}
    {%- assign en_posts = site.posts | where_exp: "post", "post.lang != 'ja'" -%}
    {%- if en_posts.size > 0 %}
    <ul class="post-list">
      {%- for post in en_posts %}
      <li>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %B %Y" }}</time>
        </p>
        {%- if post.description %}<p>{{ post.description }}</p>{% endif %}
      </li>
      {%- endfor %}
    </ul>
    {%- else %}
    <p class="empty-state">
      I am writing up the things that were hard to find good material on while building
      production LLM infrastructure — running MCP servers against Japanese filesystems,
      what actually breaks when small local models are handed real tools, and choosing
      quantisation for hardware you already own. In English and Japanese.
    </p>
    <p class="empty-state">
      Nothing published yet. If you want to be told when there is,
      <a href="mailto:{{ site.data.profile.contact.email }}?subject=Writing">email me</a>.
    </p>
    {%- endif %}
  </div>
</section>
