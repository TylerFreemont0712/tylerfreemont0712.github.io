---
layout: default
lang: ja
alt_url: /experience
title: 職務経歴
nav: experience
permalink: /ja/experience
dwg: TF-003
sheet: "03"
description: >-
  Tyler Freemontの職務経歴。MiraXでの生成AI基盤開発、2024年からのフロンティアモデル評価業務、楽天モバイル様・ダイキン様向けのPythonネットワーク自動化。スキル・保有資格・学歴。
---
{%- assign p = site.data.profile -%}
{%- assign c = site.data.career -%}

<header class="ps-head" style="margin-bottom:48px">
  <div>
    <div class="ps-crumb"><span class="t-label">図番 TF-003 · 第03葉 · 最新改訂 {{ c[0].rev }}</span></div>
    <h1 class="ps-title">職務経歴</h1>
    <p class="ps-tag">
      現在は生成AI基盤の開発を専門としています。その土台は、2年にわたるフロンティアモデルの評価業務と、2年半のインフラ自動化の実務です。日英どちらの環境でも業務を行ってきました。
    </p>
  </div>
  <table class="tb">
    <caption class="sr-only">概要</caption>
    <tbody>
      <tr><th scope="row">現職</th><td>{{ c[0].role_ja }}・{{ c[0].org_ja }}</td></tr>
      <tr><th scope="row">言語</th><td>英語（ネイティブ）・日本語（JLPT N1）</td></tr>
      <tr><th scope="row">資格</th><td>AWS Developer – Associate・AWS Solutions Architect – Associate</td></tr>
      <tr><th scope="row">就労資格</th><td>在留資格「日本人の配偶者等」・就労制限なし・ビザスポンサー不要</td></tr>
      <tr><th scope="row">勤務地</th><td>大阪・リモート／ハイブリッド／出社いずれも可</td></tr>
    </tbody>
  </table>
</header>

<!-- ═══ A — 職務経歴 ═══ -->
<section class="view" aria-labelledby="hist-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">A</span>
    <h2 class="view-title" id="hist-h">職務経歴<span class="alt" lang="en">Revision history</span></h2>
    <span class="view-ref">新しい順</span>
  </header>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="E" %}<span class="t-label">2026年3月 – 現在<br>リモート／大阪</span></div>
    <div>
      <h3 class="rev-role">ソフトウェアエンジニア（AI基盤）</h3>
      <p class="rev-org"><b>MiraX</b></p>
      <ul class="rev-list">
        <li>Ollama・llama.cppを用いた社内向けローカルLLM推論基盤を構築し、社内APIエンドポイント経由で提供。外部モデルプロバイダへの依存を解消し、顧客データを社外に出さずに生成AIを活用できる体制を実現しました。</li>
        <li>MCP（Model Context Protocol）サーバを<strong>{{ p.figures.mcp_servers_production }}件</strong>設計・実装し、社内のローカルLLM基盤から利用する形で本番運用中。日本語ファイルシステムおよびUnicodeに完全対応した社内文書サーバ、英日バイリンガル対応のWeb検索サービスを含みます。</li>
        <li>RAG検索、ツール呼び出し、LangChainによるマルチエージェントワークフローを、ビデオ会議・翻訳・記録管理を含むエンタープライズ向けSaaSプラットフォームへ実装。</li>
        <li>オープンウェイトモデル（Qwen、DeepSeek、Gemma、gpt-oss）を本番環境のレイテンシ・品質要件に照らしてベンチマーク・統合し、AI機能のリリース可否を判断する社内評価を担当。</li>
        <li>Python、C++、C#、TypeScript、JavaScriptを用いたバックエンド・フロントエンド機能を、少人数のスタートアップ環境で開発。</li>
      </ul>
      <ul class="chips"><li class="chip">Python</li><li class="chip">C++</li><li class="chip">TypeScript</li><li class="chip">Ollama</li><li class="chip">llama.cpp</li><li class="chip">MCP</li><li class="chip">LangChain</li><li class="chip">RAG</li><li class="chip">マルチエージェント</li></ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="D" %}<span class="t-label">2024年1月 – 現在<br>リモート（業務委託）</span></div>
    <div>
      <h3 class="rev-role">AI評価スペシャリスト（コード・数学）</h3>
      <p class="rev-org"><b>Outlier / Alignerr</b></p>
      <ul class="rev-list">
        <li>フロンティアモデルの学習パイプラインに用いられるRLHF選好データおよび技術的根拠の記述を作成。</li>
        <li>Python、JavaScript/TypeScript、C++、C#において、モデル出力の正確性・推論品質・指示追従性を評価しランク付け。</li>
        <li>マルチステップ推論、エージェントのタスク実行、ツール利用の挙動を評価。自分がエージェント基盤を構築する際に対処すべき失敗パターンと同じ領域です。</li>
        <li>コード補完、デバッグタスク、アルゴリズム実装を実務エンジニアリングの基準でレビュー。大学レベルの数学問題の解析も担当。</li>
      </ul>
      <ul class="chips"><li class="chip">RLHF</li><li class="chip">LLM評価</li><li class="chip">エージェント評価</li><li class="chip">コードレビュー</li></ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="C" %}<span class="t-label">2023年9月 – 2026年2月<br>大阪</span></div>
    <div>
      <h3 class="rev-role">ソフトウェア／インフラエンジニア</h3>
      <p class="rev-org"><b>株式会社Neighbors</b></p>
      <ul class="rev-list">
        <li><strong>楽天モバイル様</strong>・<strong>ダイキン様</strong>をはじめとするエンタープライズのネットワーク顧客向けに、Pythonによる自動化ツールおよび社内サービスを開発。</li>
        <li><strong>{{ p.figures.neighbors_nodes }}ノード規模</strong>を対象とする障害検知・自動復旧サービスを設計・実装し、オペレータ主導の障害復旧を自動化。</li>
        <li>管理対象機器全体に対する手動での設定変更を置き換える構成管理ツールを開発。</li>
        <li>デプロイパイプラインの構築・保守を担当し、ネットワークエンジニアと連携してトポロジ設計を実施。</li>
        <li>日英バイリンガルの開発環境において、技術要件の翻訳・橋渡しを担当。</li>
      </ul>
      <ul class="chips"><li class="chip">Python</li><li class="chip">Linux</li><li class="chip">ネットワーク自動化</li><li class="chip">TCP/IP</li><li class="chip">CI/CD</li><li class="chip">障害検知</li></ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="B" %}<span class="t-label">2022年4月 – 2023年12月<br>大阪</span></div>
    <div>
      <h3 class="rev-role">技術翻訳者（英日・日英）</h3>
      <p class="rev-org"><b>フリーランス</b></p>
      <ul class="rev-list">
        <li>IT・インフラ領域の技術文書を英日・日英で翻訳。字面の一致よりも運用上の正確性を優先する方針で対応しました。</li>
        <li>多国籍エンジニアリングチームの仕様策定・システム設計を支援。</li>
      </ul>
    </div>
  </article>

  <article class="rev-entry reveal">
    <div class="rev-side">{% include revmark.html r="A" %}<span class="t-label">2021年1月 – 2023年4月<br>大阪</span></div>
    <div>
      <h3 class="rev-role">英語講師</h3>
      <p class="rev-org"><b>崇志学園高等学校</b></p>
      <ul class="rev-list">
        <li>習熟度別の英語カリキュラムを設計・実施。</li>
      </ul>
    </div>
  </article>
</section>

<!-- ═══ B — スキル ═══ -->
<section class="view reveal" aria-labelledby="spec-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">B</span>
    <h2 class="view-title" id="spec-h">スキル<span class="alt" lang="en">Specification</span></h2>
    <span class="view-ref">習熟度は言葉で記載</span>
  </header>
  <p class="view-lede">
    <span class="prof">実務レベル</span>は本番環境での開発経験があるもの、
    <span class="prof is-mid">基礎レベル</span>は読解と改修はできるものの深さを主張しないもの、
    <span class="prof is-low">使用経験あり</span>は触ったことがある段階のものです。
  </p>
  <div class="spec">
    <section>
      <h3>生成AI・LLM基盤</h3>
      <ul>
        <li>ローカルLLM構築 — Ollama、llama.cpp</li>
        <li>MCP（Model Context Protocol）サーバ</li>
        <li>RAG・検索パイプライン</li>
        <li>LangChain、マルチエージェント基盤</li>
        <li>ツール呼び出し、構造化出力、文法による出力制約</li>
        <li>Qwen、DeepSeek、Gemma、gpt-oss</li>
      </ul>
    </section>
    <section>
      <h3>評価</h3>
      <ul>
        <li>RLHF選好データと技術的根拠の記述</li>
        <li>コード評価 — Python、JavaScript/TypeScript、C++、C#</li>
        <li>マルチステップ推論、指示追従性、エージェント挙動・ツール利用の評価</li>
        <li>ベンチマーク設計：決定的な採点、正解漏えいの防止、速度と品質の両立</li>
        <li>英日双方向のバイリンガル評価</li>
      </ul>
    </section>
    <section>
      <h3>プログラミング言語</h3>
      <ul>
        <li><span class="prof">実務レベル</span> Python、TypeScript、JavaScript、C++、C#、SQL、HTML/CSS</li>
        <li><span class="prof is-mid">基礎レベル</span> GDScript、Go、Rust</li>
        <li><span class="prof is-low">使用経験あり</span> Ansible</li>
      </ul>
    </section>
    <section>
      <h3>ゲーム開発</h3>
      <ul>
        <li>Godot 4 — 型付きGDScript、シーン、バックグラウンドスレッド、gdUnit4</li>
        <li>シード固定の決定的なゲームルール、差分テスト</li>
        <li>サンドボックス化したスクリプト実行 — wasmtime／WASI、QuickJS、Pyodide</li>
        <li>コンテンツパイプライン — JSONCスキーマ、ローカライズ、生成アセット</li>
      </ul>
    </section>
    <section>
      <h3>インフラ・バックエンド</h3>
      <ul>
        <li>Linux、Docker、AWS、CI/CD（GitHub Actions）</li>
        <li>REST・WebSocket API — Node/Express、FastAPI、Fastify</li>
        <li>SQLite、ネットワーク自動化、TCP/IP</li>
        <li>障害検知・自動復旧</li>
      </ul>
    </section>
    <section>
      <h3>アプリケーション・言語</h3>
      <ul>
        <li>React、PyQt6、HTML5 Canvas</li>
        <li><strong>英語</strong> — ネイティブ</li>
        <li><strong>日本語</strong> — JLPT N1・ビジネスレベル。技術文書の読み書き、顧客との打ち合わせ、英日・日英の技術翻訳に対応</li>
      </ul>
    </section>
  </div>
</section>

<!-- ═══ C — 資格・学歴 ═══ -->
<section class="view reveal" aria-labelledby="cert-h">
  <header class="view-h">
    <span class="view-tag" aria-hidden="true">C</span>
    <h2 class="view-title" id="cert-h">保有資格・学歴<span class="alt" lang="en">Certification &amp; education</span></h2>
    <span class="view-ref">検査済み・承認済み</span>
  </header>
  <ul class="certs">
    <li><span class="balloon is-red" aria-hidden="true">1</span><span><b>AWS Certified Developer – Associate</b><span>Amazon Web Services</span></span></li>
    <li><span class="balloon is-red" aria-hidden="true">2</span><span><b>AWS Certified Solutions Architect – Associate</b><span>Amazon Web Services</span></span></li>
    <li><span class="balloon is-red" aria-hidden="true">3</span><span><b>日本語能力試験 N1</b><span>最上級</span></span></li>
    <li><span class="balloon is-red" aria-hidden="true">4</span><span><b>Google IT Support Professional Certificate</b><span>Google</span></span></li>
    <li><span class="balloon" aria-hidden="true">5</span><span><b>ポートランド州立大学</b><span>米国オレゴン州・文学士（日本語・日本文化／コミュニケーション）・2014年〜2018年</span></span></li>
    <li><span class="balloon" aria-hidden="true">6</span><span><b>同志社大学</b><span>京都・交換留学・日本語・日本文化・2017年〜2018年</span></span></li>
    <li><span class="balloon" aria-hidden="true">7</span><span><b>クラカマス・コミュニティ・カレッジ</b><span>米国オレゴン州・数学、C++、プログラミング基礎</span></span></li>
  </ul>
</section>
