---
layout: default
lang: ja
alt_url: /experience
title: 職務経歴
nav: experience
permalink: /ja/experience
description: >-
  Tyler Freemontの職務経歴。MiraXでの生成AI基盤開発、フロンティアモデルの評価業務、
  楽天モバイル様・ダイキン様向けのPythonネットワーク自動化。保有資格・スキル一覧。
---

<section class="pane reveal" aria-labelledby="exp-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">work-history</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">git log</span> --oneline career</p>
      <h1 class="sec-title" id="exp-h">職務経歴</h1>
      <p class="sec-note">
        生成AI基盤の開発を専門とするソフトウェアエンジニアです。それ以前は
        エンタープライズ向けネットワークのインフラ自動化に従事しておりました。
      </p>
    </div>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">ソフトウェアエンジニア（AI基盤）</h2>
        <p class="tl-date">2026年3月 &mdash; 現在</p>
      </div>
      <p class="tl-company">MiraX <span class="tl-loc">・ リモート／大阪</span></p>
      <ul class="tl-list">
        <li>
          Ollama・llama.cppを用いた社内向けローカルLLM推論基盤を構築し、社内APIエンドポイント
          経由で提供。外部モデルプロバイダへの依存を解消し、顧客データを社外に出さずに
          生成AIを活用できる体制を実現しました。
        </li>
        <li>
          MCP（Model Context Protocol）サーバを<strong>{{ site.data.profile.figures.mcp_servers_production }}件</strong>
          設計・実装し、社内のローカルLLM基盤から利用する形で本番運用中。日本語
          ファイルシステムおよびUnicodeに完全対応した社内文書サーバ、英日バイリンガル対応の
          Web検索サービスを含みます。
        </li>
        <li>
          RAG検索、ツール呼び出し、LangChainによるマルチエージェントワークフローを、
          ビデオ会議・翻訳・記録管理を含むエンタープライズ向けSaaSプラットフォームへ実装。
        </li>
        <li>
          オープンウェイトモデル（Qwen、DeepSeek、Gemma、gpt-oss）を本番環境の
          レイテンシ・品質要件に照らしてベンチマーク・統合し、AI機能のリリース可否を
          判断する社内評価を担当。
        </li>
        <li>
          Python、C++、C#、TypeScript、JavaScriptを用いたバックエンド・フロントエンド機能を、
          少人数のスタートアップ環境で開発。
        </li>
      </ul>
      <ul class="tl-tags">
        <li>Python</li><li>C++</li><li>TypeScript</li><li>Ollama</li><li>llama.cpp</li>
        <li>MCP</li><li>LangChain</li><li>RAG</li><li>マルチエージェント</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">AI評価スペシャリスト（コード・数学）</h2>
        <p class="tl-date">2024年1月 &mdash; 現在</p>
      </div>
      <p class="tl-company">Outlier / Alignerr <span class="tl-loc">・ リモート（業務委託）</span></p>
      <ul class="tl-list">
        <li>
          フロンティアモデルの学習パイプラインに直接用いられるRLHF選好データおよび
          技術的根拠の記述を作成。
        </li>
        <li>
          Python、JavaScript/TypeScript、C++、C#および一般的なコンピュータサイエンス領域に
          おいて、モデル出力の正確性・推論品質・指示追従性を評価しランク付け。
        </li>
        <li>
          マルチステップ推論、ツール利用、関数呼び出しといったエージェント挙動を、
          実務エンジニアリングの基準に照らして評価。自分がエージェント基盤を構築する際に
          対処すべき失敗パターンと同じ領域です。
        </li>
        <li>
          コード補完、デバッグタスク、アルゴリズム実装のレビュー、および大学レベルの
          数学問題の解析。
        </li>
      </ul>
      <ul class="tl-tags">
        <li>RLHF</li><li>LLM評価</li><li>エージェント評価</li><li>コードレビュー</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">ソフトウェア／インフラエンジニア</h2>
        <p class="tl-date">2023年9月 &mdash; 2026年2月</p>
      </div>
      <p class="tl-company">株式会社Neighbors <span class="tl-loc">・ 大阪</span></p>
      <ul class="tl-list">
        <li>
          <strong>楽天モバイル様</strong>・<strong>ダイキン様</strong>をはじめとする
          エンタープライズのネットワーク顧客向けに、Pythonによる自動化ツールおよび
          社内サービスを開発。
        </li>
        <li>
          <strong>{{ site.data.profile.figures.neighbors_nodes }}ノード規模</strong>を対象とする
          障害検知・自動復旧サービスを設計・実装し、オペレータ主導の障害復旧を自動化。
        </li>
        <li>管理対象機器全体に対する手動での設定変更を置き換える構成管理ツールを開発。</li>
        <li>
          デプロイパイプラインの構築・保守を担当し、ネットワークエンジニアと連携して
          トポロジ設計を実施。
        </li>
        <li>
          日英バイリンガルの開発環境において、技術要件の翻訳・橋渡しを担当。
        </li>
      </ul>
      <ul class="tl-tags">
        <li>Python</li><li>Linux</li><li>ネットワーク自動化</li><li>TCP/IP</li>
        <li>CI/CD</li><li>障害検知</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">技術翻訳者（英日・日英）</h2>
        <p class="tl-date">2022年4月 &mdash; 2023年12月</p>
      </div>
      <p class="tl-company">フリーランス <span class="tl-loc">・ 大阪</span></p>
      <ul class="tl-list">
        <li>
          IT・インフラ領域の技術文書を英日・日英で翻訳。字面の一致よりも運用上の
          正確性を優先する方針で対応しました。
        </li>
        <li>多国籍エンジニアリングチームの仕様策定・システム設計を支援。</li>
      </ul>
      <ul class="tl-tags">
        <li>技術翻訳</li><li>日本語</li><li>英語</li>
      </ul>
    </article>

    <article class="timeline-entry reveal">
      <div class="tl-header">
        <h2 class="tl-role">英語講師</h2>
        <p class="tl-date">2021年1月 &mdash; 2023年4月</p>
      </div>
      <p class="tl-company">崇志学園高等学校 <span class="tl-loc">・ 大阪</span></p>
      <ul class="tl-list">
        <li>習熟度別の英語カリキュラムを設計・実施。</li>
      </ul>
      <ul class="tl-tags">
        <li>カリキュラム設計</li><li>バイリンガル環境</li>
      </ul>
    </article>
  </div>
</section>

<!-- ═══════════ スキル ═══════════ -->
<section class="pane reveal" aria-labelledby="skills-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">toolchain</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">cat</span> toolchain.txt</p>
      <h2 class="sec-title" id="skills-h">スキル</h2>
      <p class="sec-note">
        習熟度は数値やグラフではなく言葉で記載しています。<strong>実務レベル</strong>は
        本番環境での開発経験があるもの、<strong>基礎レベル</strong>は読解と改修は
        できるものの深さを主張しないもの、<strong>使用経験あり</strong>は
        触ったことがある段階のものです。
      </p>
    </div>

    <div class="grid-2">
      <div class="skill-group">
        <h3>生成AI・LLM基盤</h3>
        <ul class="skill-list">
          <li>ローカルLLM構築 — Ollama、llama.cpp</li>
          <li>MCP（Model Context Protocol）サーバ</li>
          <li>RAG・検索パイプライン</li>
          <li>LangChain、マルチエージェント基盤</li>
          <li>ツール呼び出し・関数呼び出し</li>
          <li>モデル評価（RLHF）、ベンチマーク</li>
          <li>Qwen、DeepSeek、Gemma、gpt-oss</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>プログラミング言語</h3>
        <ul class="skill-list">
          <li><span class="prof">実務レベル</span> Python、TypeScript、JavaScript、
            C++、C#、SQL、HTML/CSS</li>
          <li><span class="prof prof-mid">基礎レベル</span> Go、Rust</li>
          <li><span class="prof prof-low">使用経験あり</span> Ansible</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>インフラ・バックエンド</h3>
        <ul class="skill-list">
          <li>Linux</li>
          <li>Docker</li>
          <li>AWS</li>
          <li>CI/CD</li>
          <li>REST API設計</li>
          <li>ネットワーク自動化、TCP/IP</li>
          <li>障害検知・自動復旧</li>
          <li>Git</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>フロントエンド・アプリケーション</h3>
        <ul class="skill-list">
          <li>React</li>
          <li>PyQt6</li>
          <li>HTML5 Canvas</li>
          <li>SaaSプロダクト開発</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>評価業務の専門領域</h3>
        <ul class="skill-list">
          <li>コード評価 — Python、JavaScript/TypeScript、C++、C#</li>
          <li>マルチステップ推論、アルゴリズム的問題解決</li>
          <li>指示追従性の評価</li>
          <li>エージェント挙動・ツール利用の評価</li>
          <li>選好順位付けと技術的根拠の記述</li>
          <li>英日双方向のバイリンガル評価</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>言語</h3>
        <ul class="skill-list">
          <li><strong>英語</strong> — ネイティブ</li>
          <li><strong>日本語</strong> — JLPT N1・ビジネスレベル</li>
        </ul>
        <p class="skill-note">
          技術文書の読み書き、顧客との打ち合わせ、英日・日英の技術翻訳実務に対応可能です。
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ 資格・学歴 ═══════════ -->
<section class="pane reveal" aria-labelledby="edu-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">credentials</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">cat</span> credentials.txt</p>
      <h2 class="sec-title" id="edu-h">保有資格・学歴</h2>
    </div>

    <h3 class="sub-h">保有資格</h3>
    <ul class="cert-list">
      <li><strong>AWS Certified Developer – Associate</strong>（Amazon Web Services）</li>
      <li><strong>AWS Certified Solutions Architect – Associate</strong>（Amazon Web Services）</li>
      <li><strong>日本語能力試験 N1</strong>（最上級）</li>
      <li><strong>Google IT Support Professional Certificate</strong>（Google）</li>
    </ul>

    <h3 class="sub-h">学歴</h3>
    <ul class="cert-list">
      <li>
        <strong>ポートランド州立大学</strong>（米国オレゴン州）・
        文学士（日本語・日本文化／コミュニケーション）・2014年〜2018年
      </li>
      <li>
        <strong>クラカマス・コミュニティ・カレッジ</strong>（米国オレゴン州）・
        数学、C++、プログラミング基礎
      </li>
      <li>
        <strong>同志社大学</strong>（京都・交換留学）・日本語・日本文化・2017年〜2018年
      </li>
    </ul>
  </div>
</section>
