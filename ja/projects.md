---
layout: default
lang: ja
alt_url: /projects/
title: 開発実績
nav: projects
permalink: /ja/projects/
dwg: TF-002
sheet: "02"
description: >-
  Tyler Freemontの開発実績。呪文が本物のコードとして動くGodot製ローグライト「Rootward」、コードで採点するモデル評価基盤を備えた自作AI環境「AIOS」、根拠に基づいてローカルLLMが下書きするデスクトップアプリ「Ty Work Hub」ほか。
---
{%- assign items = site.data.projects.items -%}
{%- assign sheets = items | where: "tier", "sheet" -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">図番 TF-002 · 第02葉 · 全{{ items.size }}点</span></div>
    <h1 class="ps-title">開発実績</h1>
    <p class="ps-tag">
      GitHub上の作品のうち、見ていただく価値のあるものをすべて掲載しています。数値は記憶ではなくコードから計測したものです。3件は詳細図（ケーススタディ）を用意し、それ以外は使用技術と現在の状態を一覧にしています。
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">この図面の見方</caption>
    <tbody>
      <tr><th scope="row">赤い風船</th><td><span class="balloon is-red" aria-hidden="true">1</span> 詳細図あり</td></tr>
      <tr><th scope="row">仕様</th><td>リポジトリから計測。コード行数は空行・コメント・同梱ライブラリを除外</td></tr>
      <tr><th scope="row">非公開</th><td>内容は説明し、リンクは掲載しません</td></tr>
      <tr><th scope="row">掲載対象外</th><td>中身のないリポジトリと、同じプロジェクトの旧版</td></tr>
    </tbody>
  </table>
</header>

<!-- ═══ A — 詳細図 ═══ -->
<section class="view reveal" aria-labelledby="sheets-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="sheets-h">詳細図<span class="alt" lang="en">Drawing sheets</span></h2>
    <span class="view-ref">ケーススタディ {{ sheets.size }}件</span>
  </header>
  <div class="details">
    {%- assign letters = "A,B,C" | split: "," -%}
    {%- for it in sheets %}
    <a class="detail" href="{{ '/ja/projects/' | append: it.id | append: '/' | relative_url }}">
      <span class="detail-label"><span><b>詳細図{{ letters[forloop.index0] }}</b> · 品番 {{ it.item }}</span><span>{{ it.spec_ja }}</span></span>
      <span class="detail-frame ticks"><img src="{{ it.image | relative_url }}" alt="{{ it.image_alt_ja }}" loading="lazy" decoding="async" width="1600" height="900"></span>
      <h3><span class="balloon is-red" aria-hidden="true">{{ it.item }}</span>{{ it.name }}</h3>
      <p>{{ it.summary_ja }}</p>
    </a>
    {%- endfor %}
  </div>
</section>

<!-- ═══ B — 部品表 ═══ -->
<section class="view reveal" aria-labelledby="parts-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">B</span>
    <h2 class="view-title" id="parts-h">部品表<span class="alt" lang="en">Parts list</span></h2>
    <span class="view-ref">品番 1–{{ items.size }}</span>
  </header>
  {% include bom.html %}
</section>

<!-- ═══ C — 開発の推移 ═══ -->
<section class="view reveal" aria-labelledby="tl-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">C</span>
    <h2 class="view-title" id="tl-h">開発の推移<span class="alt" lang="en">Timeline</span></h2>
    <span class="view-ref">2025年12月 – 2026年10月</span>
  </header>
  <p class="view-lede">
    1ファイルのpygame製スネークゲームから、サンドボックス・差分テスト・バランス調整用ボットを備えた約31,000行のGodot製ゲームまで、10か月の推移です。各バーは開発が活発だった期間を示し、強調表示のものは詳細図があります。
  </p>
  {% include timeline.html %}
</section>
