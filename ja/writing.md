---
layout: default
lang: ja
alt_url: /writing
title: 技術記事
nav: writing
permalink: /ja/writing
description: >-
  ローカルLLM基盤、MCPサーバ、RAGパイプラインに関する技術記事。日本語環境特有の
  課題を中心に、実務で得られた知見を公開していきます。
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
    </div>

    {%- assign ja_posts = site.posts | where: "lang", "ja" -%}
    {%- if ja_posts.size > 0 %}
    <ul class="post-list">
      {%- for post in ja_posts %}
      <li lang="ja">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y年%-m月%-d日" }}</time>
        </p>
        {%- if post.description %}<p>{{ post.description }}</p>{% endif %}
      </li>
      {%- endfor %}
    </ul>
    {%- else %}
    <p class="empty-state">
      本番環境で生成AI基盤を構築する中で、日本語の情報が見つかりにくかった話題から
      順に書いていく予定です。MCPサーバを日本語ファイルシステム上で運用する際の注意点、
      小規模なローカルモデルに実際のツールを渡したときに何が壊れるのか、手元のハードウェアに
      合わせた量子化の選び方などを扱います。
    </p>
    <p class="empty-state">
      現在準備中です。公開時にご連絡をご希望の場合は、
      <a href="mailto:{{ site.data.profile.contact.email }}?subject=%E6%8A%80%E8%A1%93%E8%A8%98%E4%BA%8B">メールにてお知らせください</a>。
    </p>
    {%- endif %}
  </div>
</section>
