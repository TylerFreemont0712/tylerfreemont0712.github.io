---
layout: default
lang: en
alt_url: /ja/writing
title: Writing
nav: writing
permalink: /writing
dwg: TF-004
sheet: "04"
description: >-
  Technical writing by Tyler Freemont on local LLM infrastructure, MCP servers,
  quantisation and model evaluation — in English and Japanese.
---
{%- assign en_posts = site.posts | where_exp: "post", "post.lang != 'ja'" -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">Dwg TF-004 · Sheet 04 · General notes</span></div>
    <h1 class="ps-title">Writing</h1>
    <p class="ps-tag">
      Notes on things that were hard to find good material on while building
      production LLM infrastructure. Some exist in Japanese too — very little is
      written about running this stack against Japanese data.
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">About these notes</caption>
    <tbody>
      <tr><th scope="row">Notes</th><td>{{ en_posts.size }} in English · {{ site.posts.size | minus: en_posts.size }} in Japanese</td></tr>
      <tr><th scope="row">Subscribe</th><td><a href="{{ '/feed.xml' | relative_url }}">RSS / Atom feed</a></td></tr>
    </tbody>
  </table>
</header>

<section class="view reveal" aria-labelledby="notes-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="notes-h">General notes<span class="alt" lang="ja">技術記事</span></h2>
    <span class="view-ref">Newest first</span>
  </header>
  {%- if en_posts.size > 0 %}
  <ol class="notes">
    {%- for post in en_posts %}
    {%- assign mins = post.content | number_of_words | divided_by: 200 | plus: 1 %}
    <li>
      <span class="n">{{ en_posts.size | minus: forloop.index0 | prepend: "0" | slice: -2, 2 }}.</span>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y.%m.%d" }}</time>
      {%- if post.description %}<p class="desc">{{ post.description | strip_newlines | strip }}</p>{% endif %}
      <p class="meta">
        <span>{{ mins }} min read</span>
        {%- if post.alt_url %}<a href="{{ post.alt_url | relative_url }}" lang="ja">日本語版</a>{% endif %}
        {%- for tag in post.tags %}<span class="chip">{{ tag }}</span>{% endfor %}
      </p>
    </li>
    {%- endfor %}
  </ol>
  {%- else %}
  <p class="muted">Nothing published yet.</p>
  {%- endif %}
</section>
