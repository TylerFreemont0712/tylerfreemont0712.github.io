---
layout: default
lang: ja
alt_url: /
title: ソフトウェアエンジニア（生成AI基盤・ゲーム開発）
nav: home
permalink: /ja/
dwg: TF-001
sheet: "01"
description: >-
  大阪在住のソフトウェアエンジニア、Tyler Freemont。ローカルLLMによる生成AI推論基盤、MCPサーバ、エージェント、モデル評価、そしてGodot製ゲームの開発。英語ネイティブ・日本語JLPT N1、AWS認定。在留資格「日本人の配偶者等」でビザスポンサー不要です。
---
{%- assign p = site.data.profile -%}
{%- assign items = site.data.projects.items -%}

<!-- ═══ 全体配置図 ═══ -->
<section class="hero" aria-labelledby="hero-name">
  <div class="hero-text">
    <div class="hero-meta">
      <span class="t-label">図番 <b>TF-001</b></span>
      <span class="t-label">全体配置図</span>
      <span class="t-label">大阪 <b>34.69°N 135.50°E</b></span>
    </div>

    <h1 class="hero-name" id="hero-name">
      <span class="ln" lang="en">Tyler</span>
      <span class="ln ln-2" lang="en">Freemont</span>
      <span class="hero-name-ja">{{ p.name_ja }}</span>
    </h1>

    <div class="dim"><i></i><span>ソフトウェアエンジニア · 生成AI基盤とゲーム開発</span><i></i></div>

    <p class="hero-pos">{{ p.positioning_ja }}</p>

    <ol class="creds">
      {%- for c in p.credibility %}
      <li><span class="balloon" aria-hidden="true">{{ forloop.index }}</span><span><b>{{ c.label_ja }}</b><span class="d">{{ c.detail_ja }}</span></span></li>
      {%- endfor %}
    </ol>

    {%- if p.availability.open %}
    <p class="hero-avail revcloud"><span class="pulse" aria-hidden="true"></span>{{ p.availability.statement_ja }}</p>
    {%- endif %}

    {%- assign resume_file = "" -%}
    {%- for v in p.resume.variants -%}{%- if v.id == "shokumu-keirekisho" -%}{%- assign resume_file = v.file -%}{%- endif -%}{%- endfor %}
    <div class="btn-row">
      <a class="btn btn-primary" href="{{ resume_file | relative_url }}">{% include icon.html name="download" %}職務経歴書をダウンロード</a><a class="btn" href="mailto:{{ p.contact.email }}">{% include icon.html name="envelope" %}メールで問い合わせ</a>
    </div>
  </div>

  {% include exploded.html lang="ja" %}
</section>

<!-- ═══ A — 業務範囲 ═══ -->
<section class="view reveal" aria-labelledby="scope-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="scope-h">業務範囲<span class="alt" lang="en">Scope of work</span></h2>
    <span class="view-ref">4つの職種 · 1人のエンジニア</span>
  </header>
  <p class="view-lede">
    次の4つの領域でお仕事を探しています。それぞれの領域で何ができるかと、その根拠となる実績を示します。
  </p>

  <div class="scope">
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="12" y="12" width="24" height="24"/><rect x="18" y="18" width="12" height="12"/><path d="M17 5v7M24 5v7M31 5v7M17 36v7M24 36v7M31 36v7M5 17h7M5 24h7M5 31h7M36 17h7M36 24h7M36 31h7"/></svg>
        <span class="balloon" aria-hidden="true">1</span>
      </div>
      <h3>AI・LLMエンジニアリング</h3>
      <p>
        自社で管理するハードウェア上の推論基盤。社内APIの背後にllama.cppとOllamaを置き、MiraXでは<strong>MCPサーバ{{ p.figures.mcp_servers_production }}件を本番運用</strong>しています（うち1件は日本語のファイルパスとUnicodeを正しく扱う社内文書サーバ）。実際のツールを安全に扱えるエージェントも構築します。
      </p>
      <p class="evidence">実績：<a href="{{ '/ja/projects/aios/' | relative_url }}">AIOS</a> · <a href="{{ '/ja/experience' | relative_url }}">MiraX</a></p>
    </article>
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="14"/><path d="M24 10 36.1 31H11.9Z"/><path d="M24 38 11.9 17h24.2Z"/></svg>
        <span class="balloon" aria-hidden="true">2</span>
      </div>
      <h3>ゲーム開発</h3>
      <p>
        Godot 4.7製のローグライト。シード固定の純粋なルール層、ゲームの核としてサンドボックス実行するPython／JavaScript、バランス調整用のボット、日英両対応のコンテンツ、TypeScript版試作との差分テストを備えています。
      </p>
      <p class="evidence">実績：<a href="{{ '/ja/projects/rootward/' | relative_url }}">Rootward</a></p>
    </article>
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="9" width="38" height="30"/><path d="M5 15.5h38"/><path d="M19 22.5l-5.5 5.5 5.5 5.5M29 22.5l5.5 5.5-5.5 5.5M26.5 20.5l-5 15"/></svg>
        <span class="balloon" aria-hidden="true">3</span>
      </div>
      <h3>ソフトウェア開発</h3>
      <p>
        Python、TypeScript、C++、C#。CI付きのクロスプラットフォーム・デスクトップアプリ、Nodeのサービス、そして<strong>楽天モバイル様・ダイキン様</strong>向けに<strong>{{ p.figures.neighbors_nodes }}ノード規模</strong>の障害検知・自動復旧を担ったネットワーク自動化。
      </p>
      <p class="evidence">実績：<a href="{{ '/ja/projects/ty-work-hub/' | relative_url }}">Ty Work Hub</a> · <a href="{{ '/ja/experience' | relative_url }}">Neighbors</a></p>
    </article>
    <article>
      <div class="scope-n">
        <svg class="scope-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="10" y="8" width="28" height="34"/><path d="M18 8V4.5h12V8"/><path d="M15 18l3 3 5-6M15 28l3 3 5-6M27 19h7M27 29h7M15 37h19"/></svg>
        <span class="balloon" aria-hidden="true">4</span>
      </div>
      <h3>AI評価</h3>
      <p>
        2024年から、フロンティアモデルのコード・数学・エージェント課題についてRLHF選好データと評価根拠を作成しています。評価の仕組みも自分で作ります。LLMを審査役に使わず、すべてコードで採点するモデルベンチマークです。
      </p>
      <p class="evidence">実績：<a href="{{ '/ja/projects/aios/#bench' | relative_url }}">AIOSのベンチ</a> · <a href="{{ '/ja/experience' | relative_url }}">Outlier／Alignerr</a></p>
    </article>
  </div>
</section>

<!-- ═══ B — 部品表 ═══ -->
<section class="view reveal" aria-labelledby="parts-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">B</span>
    <h2 class="view-title" id="parts-h">部品表<span class="alt" lang="en">Parts list</span></h2>
    {%- assign nonlab = items | where_exp: "i", "i.group != 'lab'" %}
    <span class="view-ref">品番 1–{{ nonlab.size }} ／ 全{{ items.size }}点</span>
  </header>

  <div class="details">
    {%- assign letters = "A,B,C" | split: "," -%}
    {%- assign shown = 0 -%}
    {%- for it in items -%}
    {%- if it.tier != "sheet" -%}{%- continue -%}{%- endif -%}
    <a class="detail" href="{{ '/ja/projects/' | append: it.id | append: '/' | relative_url }}">
      <span class="detail-label"><span><b>詳細図{{ letters[shown] }}</b> · 品番 {{ it.item }}</span><span>{{ it.stack | slice: 0, 3 | join: " · " }}</span></span>
      <span class="detail-frame ticks"><img src="{{ it.image | relative_url }}" alt="{{ it.image_alt_ja }}" loading="lazy" decoding="async" width="1600" height="900"></span>
      <h3><span class="balloon is-red" aria-hidden="true">{{ it.item }}</span>{{ it.name }}</h3>
      <p>{{ it.summary_ja }}</p>
    </a>
    {%- assign shown = shown | plus: 1 -%}
    {%- endfor %}
  </div>

  {% include bom.html featured=true %}

  <p class="btn-row" style="margin-top:22px">
    <a class="btn" href="{{ '/ja/projects/' | relative_url }}">ラボを含む全{{ items.size }}点を見る {% include icon.html name="arrow" %}</a>
  </p>
</section>

<!-- ═══ C — 改訂履歴 ═══ -->
<section class="view reveal" aria-labelledby="rev-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">C</span>
    <h2 class="view-title" id="rev-h">改訂履歴<span class="alt" lang="en">Revision history</span></h2>
    <span class="view-ref">最新：改訂{{ site.data.career[0].rev }}</span>
  </header>

  <table class="revs">
    <caption class="sr-only">職務経歴（新しい順）</caption>
    <thead><tr><th class="c-rev" scope="col">改訂</th><th scope="col">内容</th><th class="c-date" scope="col">期間</th></tr></thead>
    <tbody>
      {%- for r in site.data.career %}
      <tr{% if r.to == "" %} class="is-current"{% endif %}>
        <td class="c-rev">{% include revmark.html r=r.rev %}</td>
        <td><span class="role">{{ r.role_ja }}</span><span class="org">{{ r.org_ja }} · {{ r.where_ja }} — {{ r.note_ja }}</span></td>
        <td class="c-date">{{ r.from }} – {% if r.to == "" %}現在{% else %}{{ r.to }}{% endif %}</td>
      </tr>
      {%- endfor %}
    </tbody>
  </table>
  <p class="btn-row" style="margin-top:22px">
    <a class="btn" href="{{ '/ja/experience' | relative_url }}">職務経歴・スキル・資格の詳細 {% include icon.html name="arrow" %}</a>
  </p>
</section>

<!-- ═══ D — 希望条件 ═══ -->
<section class="view reveal" aria-labelledby="cond-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">D</span>
    <h2 class="view-title" id="cond-h">希望条件<span class="alt" lang="en">Conditions</span></h2>
    <span class="view-ref">エージェント様のご連絡も歓迎</span>
  </header>
  <p class="view-lede">
    条件面は柔軟にご相談させていただきます。まずはお気軽にお問い合わせください。
  </p>
  <dl class="kv">
    <dt>希望職種</dt>
    <dd>AIエンジニア（生成AI基盤・LLM）／ゲームプログラマー／ソフトウェアエンジニア（バックエンド・アプリケーション）／AI評価・LLM評価</dd>
    <dt>契約形態</dt>
    <dd>正社員・業務委託（フリーランス）いずれも可</dd>
    <dt>勤務地</dt>
    <dd>大阪府（フルリモート・ハイブリッド・出社いずれも可）</dd>
    <dt>就労資格</dt>
    <dd>在留資格「日本人の配偶者等」。<strong>就労制限なし・ビザスポンサー不要</strong>のため、在留資格に関する手続きは発生しません。</dd>
    <dt>稼働可能日</dt>
    <dd>{{ p.availability.statement_ja }}</dd>
    <dt>言語</dt>
    <dd>英語ネイティブ／日本語 JLPT N1（ビジネスレベル）。技術文書の読み書き、海外ベンダーとの折衝、英日・日英のブリッジ業務にも対応可能です。</dd>
  </dl>
</section>

<!-- ═══ E — 技術記事 ═══ -->
{%- assign ja_posts = site.posts | where: "lang", "ja" -%}
{%- if ja_posts.size > 0 %}
<section class="view reveal" aria-labelledby="notes-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">E</span>
    <h2 class="view-title" id="notes-h">技術記事<span class="alt" lang="en">General notes</span></h2>
    <span class="view-ref"><a href="{{ '/feed.xml' | relative_url }}">RSS</a></span>
  </header>
  <ol class="notes">
    {%- for post in ja_posts limit: 3 %}
    <li>
      <span class="n">{{ forloop.index | prepend: "0" }}.</span>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y.%m.%d" }}</time>
      {%- if post.description %}<p class="desc">{{ post.description | strip_newlines | strip }}</p>{% endif %}
    </li>
    {%- endfor %}
  </ol>
  <p class="btn-row" style="margin-top:22px">
    <a class="btn" href="{{ '/ja/writing' | relative_url }}">技術記事をすべて見る {% include icon.html name="arrow" %}</a>
  </p>
</section>
{%- endif %}
