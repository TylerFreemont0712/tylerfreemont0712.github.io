---
layout: default
lang: ja
alt_url: /projects
title: 開発実績
nav: projects
permalink: /ja/projects
description: >-
  Tyler Freemontの開発実績。ローカルLLM推論基盤AIOS、マルチエージェントによる
  自律開発システムLLM Council、LAN内同期アプリLocalSyncの設計と技術的判断について。
---

<section class="pane reveal" aria-labelledby="proj-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">~/tyler/projects</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">find</span> ~/projects -maxdepth 1 -type d</p>
      <h1 class="sec-title" id="proj-h">開発実績</h1>
      <p class="sec-note">
        規模の大きいものから順に掲載しています。それぞれ「何を解決したのか」
        「どう作ったのか」「どこが本当に難しかったのか」を記載しました。
      </p>
    </div>
  </div>
</section>

<!-- ═══════════ AIOS ═══════════ -->
<article class="pane reveal case" id="aios" aria-labelledby="aios-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">case-study · aios</div>
  </div>
  <div class="pane-body">
    <header class="case-head">
      <h2 class="case-title" id="aios-h">AIOS</h2>
      <p class="case-tagline">
        1台のマシンからLAN全体に生成AI環境を提供する、自作の実行基盤です。
      </p>
      <p class="case-links">
        <a href="{{ site.data.profile.contact.github }}/AIOS-v1" class="btn btn-primary" target="_blank" rel="noopener">
          {% include icon.html name="github" %} ソースコード
        </a>
      </p>
    </header>

    <div class="case-body">
      <h3>課題</h3>
      <p>
        自宅や小規模なオフィスで実用的なモデルを使おうとすると、選択肢は二つしか
        ありませんでした。すべてを外部APIに送るか、用途ごとに別のツールを立ち上げるか
        です。後者の場合、チャット用、コーディング用、ノート用とツールが分断され、
        互いの文脈を共有できないうえ、GPUを搭載した1台のマシンに縛られてしまいます。
        ハードウェアを持つマシン上で動作し、同じネットワーク内のどの端末からでも
        利用でき、かつローカルモデルを既定としてクラウドは任意で選べる——
        そうした環境を1か所にまとめたいと考えました。
      </p>

      <h3>アプローチ</h3>
      <p>
        Nodeサーバをポート7777で動作させ、LANに対してWebデスクトップを提供します。
        ローカルモデルはllama.cppおよびOllama上で動作し、クラウドのモデルも同じ
        ルーティング層に同等の立場で接続します。そのため「どこで推論するか」は
        アーキテクチャの制約ではなく、会話単位の選択になります。その上に、チャット、
        コーディングエージェント、リサーチ、プランナー、Obsidian連携のナレッジベース、
        モデル比較用のベンチ、ファイルエディタ、実端末といった個別のアプリを配置して
        います。これらは画面を離れても動作を継続するため、エージェントの実行や
        シェルセッションがアプリの切り替えで中断されることはありません。
      </p>

      <figure class="shot">
        <img src="{{ '/assets/program-images/aios-home-services.png' | relative_url }}"
             width="733" height="692" loading="lazy" decoding="async"
             alt="AIOSのホーム画面。各依存サービスの状態を表示するパネルには、
                  SearXNGが127.0.0.1:8890で接続済み、llama.cppがqwen3-1.7b-q8_0を配信して
                  到達可能、Ollamaは停止中、AnthropicはAPIキー未設定、Obsidian保管庫は
                  接続済み、GitHubは認証済みと表示されている。その下にAgent、Chat、
                  Research、Planner、Second Brain、Bench、Models、Files、Terminal、
                  Projectsを含む12個のアプリが並んでいる。">
        <figcaption>
          各依存サービスが自身の状態を報告します。ローカル推論の運用は、
          半分が「どの部分が落ちているかを把握すること」だからです。APIキーの未設定や
          Ollamaの停止は異常ではなく通常の状態として扱い、いずれのサービスも
          稼働を前提にしない設計にしています。
        </figcaption>
      </figure>

      <h3>技術的に難しかった点</h3>
      <p>
        本当に神経を使うのはコーディングエージェントです。<code>list_dir</code>、
        <code>glob</code>、<code>grep</code>、<code>read_file</code>でプロジェクトを
        探索し、<code>write_file</code>と<code>edit_file</code>で変更を加え、
        <code>bash</code>を実行し、<code>web_search</code>で外部にアクセスします。
        つまり、モデルの出力に対して実際のファイルシステムへの書き込み権限と実際の
        シェルを渡していることになります。設計上の難所は、小規模なローカルモデルが
        フロンティアモデルほどツールスキーマを正確に守れない点です。そのため
        ツール層は、整形式の呼び出しを前提にせず、受け入れる入力を厳格に検証し、
        失敗時には何が悪かったのかを具体的に返す必要があります。端末についても
        別の問題があります。対話的なプログラムを動かすには本物のPTYが必要で、
        インストール時のネイティブビルドに加え、どのブラウザタブが接続しているかとは
        独立してセッションを維持し続けなければなりません。
      </p>

      <figure class="shot shot-feature">
        <img src="{{ '/assets/program-images/aios-agent-web-search.png' | relative_url }}"
             width="748" height="646" loading="lazy" decoding="async"
             alt="AIOSでの1往復のチャット。世界の最新情勢についての質問に回答している。
                  折りたたまれた推論パネルには「Thought for 3s」と表示。その下に完了状態の
                  web_searchツール呼び出しがあり、検索クエリと、自己ホストしたSearXNG経由で
                  取得した生の検索結果がソースURL付きで並ぶ。続いてモデルによる要約が表示され、
                  フッターには毎秒135.4トークン、初回トークンまで98ミリ秒と記録されている。">
        <figcaption>
          <strong>ローカルで動作する1.7Bのモデル</strong>によるツール呼び出しの一連の流れです。
          推論、自己ホストしたSearXNG経由の<code>web_search</code>、実際に読んだ情報源、
          そして要約までを<strong>毎秒135.4トークン・初回トークンまで98ミリ秒</strong>で
          処理しています。生の検索結果は意図的に表示したままにしています。小規模モデルが
          誤った回答を返したとき、知りたいのは検索が失敗したのか推論が失敗したのかであり、
          ツールの出力を隠してしまうとその切り分けができません。
        </figcaption>
      </figure>

      <figure class="shot">
        <img src="{{ '/assets/program-images/aios-projects-registry.png' | relative_url }}"
             width="749" height="185" loading="lazy" decoding="async"
             alt="AIOSに登録された3つのプロジェクト。各カードにパス、gitの状態、最終更新日が
                  表示されている。Salesはmasterブランチで未コミット5件、OSはmainブランチで
                  未コミット31件かつ稼働中、Test-Projectはgitリポジトリなし。各カードに
                  Agent、Files、Shellのボタンがある。">
        <figcaption>
          エージェントは常に登録済みプロジェクトの範囲内で動作し、各プロジェクトは
          対象を指定する前にブランチと未コミット件数を提示します。未コミットが31件ある
          ツリーにモデルへの書き込み権限を与えるかどうかは意識的に判断すべき事柄なので、
          後から気づくのではなく事前に見えるようにしています。
        </figcaption>
      </figure>

      <h3>結果と限界</h3>
      <p>
        現在、日常的に使用している環境です。LAN内のURLに含まれるペアリングトークンを
        使えば、同一ネットワーク上のタブレットからも利用できます。正直な限界も
        記しておきます。信頼できる自宅・小規模オフィスのネットワークを前提とした
        設計であり、ペアリングトークンは敵対的なネットワークにおける本格的な認証の
        代わりにはなりません。エージェントの品質は使用するモデルに比例するため、
        小規模なローカルモデルでは複数ステップにわたる編集の精度がフロンティアモデルに
        明確に劣ります。また、同時に1名が使用する前提の設計です。
      </p>

      <figure class="shot">
        <img src="{{ '/assets/program-images/aios-files-editor.png' | relative_url }}"
             width="955" height="647" loading="lazy" decoding="async"
             alt="AIOSのファイルブラウザとエディタ。プロジェクトOSを開いている。左側の
                  ツリーにリポジトリのディレクトリとファイルが並び、右側はCodeMirrorの
                  エディタで、行番号とシンタックスハイライト付きでAIOS自身のREADMEを
                  表示している。">
        <figcaption>
          AIOS自身のソースをAIOS内から編集している画面です。ツリー表示とCodeMirrorを
          プロジェクト単位で提供しているため、エージェントが提案した変更をその場で
          読んで修正できます。
        </figcaption>
      </figure>

      <ul class="case-stack">
        <li>JavaScript</li><li>Node</li><li>llama.cpp</li><li>Ollama</li>
        <li>SearXNG</li><li>node-pty</li><li>xterm.js</li><li>CodeMirror</li>
      </ul>
    </div>
  </div>
</article>

<!-- ═══════════ LLM COUNCIL ═══════════ -->
<article class="pane reveal case" id="llm-council" aria-labelledby="council-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">case-study · llm-council</div>
  </div>
  <div class="pane-body">
    <header class="case-head">
      <h2 class="case-title" id="council-h">LLM Council</h2>
      <p class="case-tagline">
        複数のAIエージェントが協調してブラウザゲームを構築し、生成コードを
        採用前に検証するマルチエージェントシステムです。
      </p>
    </header>

    <div class="case-body">
      <h3>課題</h3>
      <p>
        単一のモデルにアプリケーション全体の実装を任せると、一見それらしく見えて
        実行すると壊れるコードが出てきます。問題は構文エラーであることは少なく、
        引数の数が合っていない関数呼び出し、定義されていない名前の参照、存在しない
        モジュールのimportといった類です。これを実行してトレースバックを読んで
        発見するのは時間がかかり、ブラウザゲームの場合は多くの不具合が
        エラーを出さずに進行してしまいます。
      </p>

      <h3>アプローチ</h3>
      <p>
        役割を分担したエージェントが、自然言語を投げ合うのではなく共有ツール
        モジュールを介して連携します。ファイルシステムへのアクセス、Web検索、
        アセット取得を持つのは個々のエージェントではなくこのモジュール側です。
        エージェント間のメッセージを構造化することで受け渡しを機械的に検証可能にし、
        ホットリロードによって生成された変更が画面に反映されるまでのループを
        短くしています。
      </p>

      <h3>技術的に難しかった点</h3>
      <p>
        このシステムを支えている判断は二つあります。一つ目は、生成コードを実行して
        動くかどうか確かめるのではなく、<strong>ASTレベルで検証する</strong>ことです。
        出力をパースして構文木を辿り、名前が解決できるか、呼び出しと定義が
        一致しているかをディスクへの書き込み前に確認します。これによりモデルが
        実際に犯す種類の誤りを実行コストなしで捕捉できます。トレードオフとして、
        検証できるのは構造的な正しさであって振る舞いではないため、実行に到達する
        コードを絞り込む仕組みであり、テストの代わりにはなりません。二つ目は
        <strong>実行時のツール生成</strong>です。固定のツール一覧を持たせるのではなく、
        タスクの必要に応じてツールを生成します。これによりモデルが確実に扱える
        程度にスキーマの表面積を小さく保てますが、新しいツールを定義したその時点で
        検証を行う必要が生じます。
      </p>

      <ul class="case-stack">
        <li>Python</li><li>マルチエージェント</li><li>AST解析</li>
        <li>HTML5 Canvas</li>
      </ul>

      <p class="case-note">
        <strong>補足：</strong>本プロジェクトのソースコードは現時点で非公開のため、
        リポジトリへのリンクは掲載せず、このページ単独で内容が分かるように記載しています。
      </p>
    </div>
  </div>
</article>

<!-- ═══════════ LOCALSYNC ═══════════ -->
<article class="pane reveal case" id="localsync" aria-labelledby="ls-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">case-study · localsync</div>
  </div>
  <div class="pane-body">
    <header class="case-head">
      <h2 class="case-title" id="ls-h">LocalSync</h2>
      <p class="case-tagline">
        ノート・カレンダー・家計データを、クラウドを介さずLAN内で同期する
        デスクトップアプリです。
      </p>
      <p class="case-links">
        <a href="{{ site.data.profile.contact.github }}/LocalSyncOrganization" class="btn btn-primary" target="_blank" rel="noopener">
          {% include icon.html name="github" %} ソースコード
        </a>
      </p>
    </header>

    <div class="case-body">
      <h3>課題</h3>
      <p>
        個人のノート、カレンダー、金銭の記録を複数のマシン間で一致させようとすると、
        通常はその三つすべてを外部のホスティングサービスに預けることになります。
        同じ利便性を、データを自分のハードウェア上に置いたまま実現したいと
        考えました。加えて、ノートはすでにObsidianの保管庫で管理しており、
        そこから移行するつもりはありませんでした。
      </p>

      <h3>アプローチ</h3>
      <p>
        SQLiteを基盤としたPyQt6製のデスクトップアプリケーションです。各ピアは
        LANのサブネットを走査して互いを検出し、サーバを経由せず直接同期します。
        Obsidian保管庫にはファイルシステム監視をかけ、アプリと生のMarkdownファイルの
        内容をほぼリアルタイムに双方向で一致させます。ノートについては保管庫を
        正本として扱う設計です。
      </p>

      <h3>技術的に難しかった点</h3>
      <p>
        人間が同時に編集しているディレクトリを監視する、という点に本当の難しさが
        あります。削除とリネームを区別しなければならず、Obsidian側での編集とアプリ側での
        編集が競合してはならず、1回の保存で発生する大量のファイルシステムイベントを
        1件の更新にまとめる必要があります。とりわけ削除の同期を安全にすること——
        一時的なイベントでノートを失わせず、本当の削除だけを伝播させること——には
        何度も作り直しが必要でした。
      </p>

      <p>
        同期以外に、ローカルアプリに求めていた機能も載せています。同一のSQLiteストア上での
        タスク・目標管理、支出とレシートの記録、そしてローカルモデルと連携して段階的に
        解説を行う学習支援パネルです。
      </p>

      <ul class="case-stack">
        <li>Python</li><li>PyQt6</li><li>SQLite</li><li>ファイル監視</li>
        <li>LAN内ピア探索</li>
      </ul>
    </div>
  </div>
</article>

<!-- ═══════════ その他 ═══════════ -->
<section class="pane reveal" aria-labelledby="other-h">
  <div class="pane-title-bar">
    <div class="pane-dots" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="pane-label">other-projects</div>
  </div>
  <div class="pane-body">
    <div class="sec-head">
      <p class="sec-prompt" aria-hidden="true"><span class="pr">$</span> <span class="cmd">ls</span> ~/projects/misc/</p>
      <h2 class="sec-title" id="other-h">その他の開発</h2>
    </div>

    <ul class="mini-list">
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/llama-launcher" target="_blank" rel="noopener">ローカルLLMデスクトップツールキット</a></h3>
        <p>
          llama.cppサーバをローカル実行するためのランチャー・管理ツールです。
          コマンドラインのオプションを覚える代わりにウィザードで起動できます。
          WASAPIループバック録音とWhisperによる文字起こしパイプラインを併設しています。
        </p>
        <p class="mini-stack">Python ・ PyQt6 ・ llama.cpp ・ Whisper</p>
      </li>
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/PersonalDashboard" target="_blank" rel="noopener">PersonalDashboard</a></h3>
        <p>
          日々の情報を集約するPython製ダッシュボードです。LocalSyncにつながる
          アイデアの前段にあたる実装です。
        </p>
        <p class="mini-stack">Python ・ PyQt6</p>
      </li>
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/YTDownload" target="_blank" rel="noopener">YTDownload</a></h3>
        <p>形式と画質を選択できるメディアダウンローダーです。</p>
        <p class="mini-stack">Python</p>
      </li>
      <li>
        <h3><a href="{{ site.data.profile.contact.github }}/SnakeGame" target="_blank" rel="noopener">SnakeGame</a></h3>
        <p>
          練習用のプロジェクトです。ゲームループ、状態管理、衝突判定の実装を
          目的としています。
        </p>
        <p class="mini-stack">Python</p>
      </li>
    </ul>
  </div>
</section>
