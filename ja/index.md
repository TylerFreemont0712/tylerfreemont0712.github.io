---
layout: default
lang: ja
alt_url: /
title: AIエンジニア（生成AI基盤・ローカルLLM・MCPサーバ）
nav: home
permalink: /ja/
description: >-
  大阪在住のAIエンジニア、Tyler Freemont。ローカルLLMによる生成AI推論基盤、MCPサーバ、
  RAGパイプラインの設計・開発を専門としています。英語ネイティブ・日本語JLPT N1。
  在留資格「日本人の配偶者等」でビザスポンサー不要。正社員・業務委託ともにご相談可能です。
---

{% include hero.html lang="ja" %}

<!-- ═══════════ 提供できること ═══════════ -->
<section class="pane reveal" aria-labelledby="build-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">what-i-build</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">cat</span> capabilities.txt</p>
      <h2 class="sec-title" id="build-h">お任せいただける領域</h2>
    </div>

    <div class="grid-3">
      <article class="cap-card">
        <h3>ローカルLLM推論基盤</h3>
        <p>
          自社で管理するハードウェア上で完結する推論環境を構築します。llama.cppおよび
          Ollamaをルーティング層の背後に置くことで、社外にデータを出さずにチーム全体へ
          モデルを提供できます。用途に応じたモデル選定、量子化による精度と速度の
          トレードオフの検討、コマンドラインを使わない方でも運用できるツールの整備まで
          対応いたします。
        </p>
        <p class="cap-evidence">
          実装例：<a href="{{ site.data.profile.contact.github }}/AIOS-v1" target="_blank" rel="noopener">AIOS</a>、
          <a href="{{ site.data.profile.contact.github }}/llama-launcher" target="_blank" rel="noopener">llama-launcher</a>
        </p>
      </article>

      <article class="cap-card">
        <h3>MCPサーバとエージェント基盤</h3>
        <p>
          ファイルシステムやシェルを実際に操作するツール呼び出し型エージェントを構築
          します。構造化されたツールスキーマ、権限を制御した実行、そしてモデルの出力を
          無条件に信頼しないための検証層までを含みます。現職では
          <strong>MCPサーバ{{ site.data.profile.figures.mcp_servers_production }}件を本番運用中</strong>で、
          そのうち1件は日本語ファイルシステムとUnicodeを正しく扱う社内文書サーバです。
          これは見た目以上に厄介な領域です。
        </p>
        <p class="cap-evidence">
          実装例：<a href="{{ '/ja/projects' | relative_url }}#aios">AIOSのエージェント基盤</a>、
          <a href="{{ '/ja/projects' | relative_url }}#llm-council">LLM Council</a>
        </p>
      </article>

      <article class="cap-card">
        <h3>インフラ自動化</h3>
        <p>
          <strong>楽天モバイル様</strong>・<strong>ダイキン様</strong>をはじめとする
          エンタープライズのネットワーク顧客向けに、Pythonによる自動化を担当してきました。
          構成管理、監視、および
          <strong>{{ site.data.profile.figures.neighbors_nodes }}ノード規模</strong>を対象とする
          障害検知・自動復旧サービスの設計・実装を行っています。
        </p>
        <p class="cap-evidence">
          詳細：<a href="{{ '/ja/experience' | relative_url }}">職務経歴</a>
        </p>
      </article>
    </div>
  </div>
</section>

<!-- ═══════════ 主な実績 ═══════════ -->
<section class="pane reveal" aria-labelledby="work-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">featured-work</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">ls</span> -la ~/projects/</p>
      <h2 class="sec-title" id="work-h">主な開発実績</h2>
    </div>

    <div class="grid-3">
      <article class="proj-card">
        <h3 class="proj-name">AIOS</h3>
        <p class="proj-desc">
          1台のマシンからLAN全体に生成AI環境を提供する自作の実行基盤です。ローカルと
          クラウドのモデルを単一のルーティング層で扱い、ファイル操作とシェルを備えた
          コーディングエージェント、実PTYによる端末、Obsidianを基盤とした
          ナレッジベースを備えています。
        </p>
        <p class="proj-stack">JavaScript ・ Node ・ llama.cpp ・ Ollama</p>
        <p class="proj-links">
          <a href="{{ '/ja/projects' | relative_url }}#aios">詳細</a>
          <a href="{{ site.data.profile.contact.github }}/AIOS-v1" target="_blank" rel="noopener">ソースコード</a>
        </p>
      </article>

      <article class="proj-card">
        <h3 class="proj-name">LLM Council</h3>
        <p class="proj-desc">
          役割を分担した複数のAIエージェントが協調し、HTML5 Canvasベースのブラウザ
          ゲームをエンドツーエンドで構築するシステムです。生成されたコードはASTレベルで
          検証してから採用し、ツールはタスクの必要に応じて実行時に生成します。
        </p>
        <p class="proj-stack">Python ・ マルチエージェント ・ AST解析</p>
        <p class="proj-links">
          <a href="{{ '/ja/projects' | relative_url }}#llm-council">詳細</a>
        </p>
      </article>

      <article class="proj-card">
        <h3 class="proj-name">LocalSync</h3>
        <p class="proj-desc">
          ノート・カレンダー・家計データを、クラウドサービスを介さずLAN内の複数端末間で
          同期するPyQt6製のデスクトップアプリです。サブネット走査によるピア探索、
          Obsidian保管庫の常時監視、繰り返し予定の処理に対応しています。
        </p>
        <p class="proj-stack">Python ・ PyQt6 ・ SQLite</p>
        <p class="proj-links">
          <a href="{{ '/ja/projects' | relative_url }}#localsync">詳細</a>
          <a href="{{ site.data.profile.contact.github }}/LocalSyncOrganization" target="_blank" rel="noopener">ソースコード</a>
        </p>
      </article>
    </div>

    <p class="sec-more">
      <a href="{{ '/ja/projects' | relative_url }}" class="btn btn-ghost">開発実績をすべて見る</a>
      <a href="{{ '/ja/experience' | relative_url }}" class="btn btn-ghost">職務経歴</a>
    </p>
  </div>
</section>

<!-- ═══════════ 稼働条件 ═══════════ -->
<section class="pane reveal" aria-labelledby="cond-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">conditions</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">cat</span> conditions.txt</p>
      <h2 class="sec-title" id="cond-h">希望条件</h2>
      <p class="sec-note">
        エージェント各社からのご連絡も歓迎しております。条件面は柔軟に相談させて
        いただきますので、まずはお気軽にお問い合わせください。
      </p>
    </div>

    <dl class="cond-list">
      <dt>希望職種</dt>
      <dd>AIエンジニア／機械学習エンジニア／バックエンドエンジニア</dd>

      <dt>契約形態</dt>
      <dd>正社員・業務委託（フリーランス）いずれも可</dd>

      <dt>勤務地</dt>
      <dd>大阪府（フルリモート・ハイブリッドいずれも可）</dd>

      <dt>就労資格</dt>
      <dd>
        在留資格「日本人の配偶者等」。<strong>就労制限なし・ビザスポンサー不要</strong>のため、
        在留資格に関する手続きは発生しません。
      </dd>

      <dt>稼働可能日</dt>
      <dd>{{ site.data.profile.availability.statement_ja }}</dd>

      <dt>言語</dt>
      <dd>
        英語ネイティブ／日本語 JLPT N1（ビジネスレベル）。技術文書の読み書き、
        海外ベンダーとの折衝、英日・日英のブリッジ業務にも対応可能です。
      </dd>
    </dl>
  </div>
</section>
