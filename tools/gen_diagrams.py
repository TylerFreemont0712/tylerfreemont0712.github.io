#!/usr/bin/env python3
"""Generate the assembly drawings (architecture diagrams) for project sheets.

Writes _includes/dg/<slug>.html — inline SVG with English and Japanese
labels switched by Liquid, so a diagram renders with JavaScript off and
inherits the page's colourway through CSS classes.

Coordinates are laid out by hand on a 1000-unit-wide drawing. Each node can
carry a balloon number (`ref`) that keys it to the numbered notes on the
sheet; hovering either highlights both.

    python3 tools/gen_diagrams.py
"""
from pathlib import Path
from html import escape

OUT = Path(__file__).resolve().parent.parent / "_includes" / "dg"

# node: id, x, y, w, h, (en title, en sub), (ja title, ja sub), kind, ref
# kind: "" | "key" (heavier outline) | "ext" (dashed: outside the project)
# edge: path d, (en label, ja label) or None, label x, label y, dashed

DIAGRAMS = {
    "aios": dict(
        h=392,
        title=("AIOS architecture", "AIOSの構成図"),
        desc=(
            "Devices on the LAN talk to the hub server over REST and WebSocket. The hub hands turns to the agent loop and "
            "runs to the benchmark. The agent sends approved calls to the tool belt and prompts to the provider layer, "
            "which serves local and cloud models.",
            "LAN上の端末はRESTとWebSocketでハブサーバに接続します。ハブは指示をエージェントループへ、計測をベンチへ渡します。"
            "エージェントは承認済みの呼び出しをツール群へ、プロンプトをプロバイダ層へ送り、プロバイダ層がローカル／クラウドのモデルを呼び出します。",
        ),
        nodes=[
            ("clients", 0, 160, 140, 72, ("LAN clients", "browser · tablet · phone"), ("LAN内の端末", "ブラウザ・タブレット"), "ext", None),
            ("hub", 240, 150, 170, 92, ("Hub server", "Express · WS · :7777"), ("ハブサーバ", "Express・WS・7777番"), "key", 1),
            ("agent", 510, 40, 190, 72, ("Agent loop", "approval gate · self-check"), ("エージェント", "承認ゲート・自己検査"), "key", 2),
            ("bench", 510, 280, 190, 72, ("Bench", "22 tests · graded in code"), ("ベンチ", "22項目・コードで採点"), "", 5),
            ("tools", 800, 0, 200, 72, ("Tool belt", "86 tools · MCP · forged"), ("ツール群", "86種・MCP・自作ツール"), "", 3),
            ("provider", 800, 160, 200, 72, ("Provider layer", "3 wire protocols"), ("プロバイダ層", "3種のAPI形式に対応"), "", 4),
            ("models", 800, 320, 200, 72, ("Models", "llama.cpp · Ollama · cloud"), ("モデル", "llama.cpp・Ollama・クラウド"), "ext", None),
        ],
        edges=[
            ("M140 196 H236", ("REST · WS", "REST・WS"), 190, 188, False),
            ("M410 182 H458 V76 H506", ("turns", "指示"), 458, 128, False),
            ("M410 212 H458 V316 H506", ("runs", "計測"), 458, 266, False),
            ("M700 62 H742 V36 H796", ("calls", "呼び出し"), 742, 49, False),
            ("M700 92 H762 V188 H796", ("prompts", "プロンプト"), 762, 140, False),
            ("M700 316 H782 V214 H796", None, 0, 0, False),
            ("M900 232 V316", ("inference", "推論"), 900, 276, False),
        ],
    ),
    "rootward": dict(
        h=392,
        title=("Rootward architecture", "Rootwardの構成図"),
        desc=(
            "Content packs are validated by the loader into a catalog for the pure rules core. The run session takes "
            "player commands from the scenes, sends spell jobs to the sandbox host, which runs CPython or QuickJS under "
            "wasmtime, then steps the rules with the result and saves a snapshot. Recorded runs from the TypeScript "
            "engine check the rules; a balance bot plays thousands of orderings through them.",
            "コンテンツパックはローダで検証され、純粋なルール層へのカタログになります。ランセッションは画面からの操作を受け、"
            "呪文の実行をサンドボックスへ依頼します。サンドボックスはwasmtime上でCPythonまたはQuickJSを動かし、その結果でルールを1手進めて保存します。"
            "ルール層はTypeScript版の記録で検証され、バランス調整用のボットが数千通りの手順を試します。",
        ),
        nodes=[
            ("content", 0, 10, 190, 72, ("Content packs", "JSONC · .py + .js · ja"), ("コンテンツ", "JSONC・.py/.js・日本語"), "", None),
            ("loader", 270, 10, 190, 72, ("Loader", "schemas · locale"), ("ローダ", "スキーマ・ロケール"), "", None),
            ("rules", 540, 10, 190, 72, ("Rules core", "pure · seeded · no I/O"), ("ルール層", "純粋関数・シード固定"), "key", 1),
            ("fixtures", 810, 10, 190, 72, ("TS fixtures", "36 runs · 3,789 steps"), ("TS版の記録", "36ラン・3,789手"), "ext", 5),
            ("ui", 0, 165, 190, 72, ("Scenes & UI", "map · fight · race bar"), ("画面・UI", "マップ・戦闘・競争バー"), "", None),
            ("session", 270, 165, 190, 72, ("Run session", "commands · preview cache"), ("ランセッション", "操作・プレビュー"), "key", 2),
            ("save", 540, 165, 190, 72, ("Save store", "atomic JSON · git log"), ("セーブ", "原子的書き込み・git log"), "", None),
            ("bot", 810, 165, 190, 72, ("Balance bot", "~2,000 orderings a turn"), ("バランス用ボット", "1手で約2,000通り"), "", 6),
            ("assets", 0, 320, 190, 72, ("Asset pipeline", "ComfyUI · Blender · VRM"), ("素材パイプライン", "ComfyUI・Blender・VRM"), "ext", None),
            ("sandbox", 270, 320, 190, 72, ("Sandbox host", "background thread"), ("サンドボックス", "バックグラウンド実行"), "key", 3),
            ("guest", 540, 320, 190, 72, ("wasmtime guest", "CPython · QuickJS (WASI)"), ("wasmtime", "CPython・QuickJS（WASI）"), "", 4),
        ],
        edges=[
            ("M190 46 H266", None, 0, 0, False),
            ("M460 46 H536", ("catalog", "カタログ"), 498, 38, False),
            ("M190 201 H266", ("commands", "操作"), 228, 193, False),
            ("M420 165 V124 H620 V86", ("step(state, cmd)", "1手進める"), 520, 116, False),
            ("M460 201 H536", ("snapshot", "保存"), 498, 193, False),
            ("M365 237 V316", ("spell job", "呪文の実行"), 365, 278, False),
            ("M460 356 H536", ("job ⇄ bolts", "実行⇄結果"), 498, 348, False),
            ("M95 320 V241", ("PNG · OGG · VRM", "PNG・OGG・VRM"), 95, 282, False),
            ("M810 46 H734", ("diff tests", "差分テスト"), 772, 38, True),
            ("M905 165 V124 H700 V86", ("plays", "自動対戦"), 802, 116, True),
        ],
    ),
    "ty-work-hub": dict(
        h=392,
        title=("Ty Work Hub architecture", "Ty Work Hubの構成図"),
        desc=(
            "The UI shell drives Backlog sync, the Git and SVN services and the timer. The local LLM client gets the "
            "ticket and its history, the verified patch diff and the existing Obsidian note, and sends a schema-bound "
            "request to a llama.cpp server. Drafts come back to the UI for review before anything is written.",
            "UIはBacklog同期、Git／SVNサービス、タイマーを操作します。ローカルLLMクライアントはチケットと履歴、検証済みのパッチ差分、"
            "既存のObsidianノートを受け取り、スキーマで制約したリクエストをllama.cppサーバへ送ります。下書きは書き込み前にUIで確認します。",
        ),
        nodes=[
            ("ui", 0, 156, 180, 80, ("UI shell", "9 workspaces · virtual tables"), ("UI", "9画面・仮想テーブル"), "key", 1),
            ("backlog", 290, 10, 190, 72, ("Backlog sync", "QThread · offline cache"), ("Backlog同期", "QThread・オフライン対応"), "", None),
            ("scm", 290, 160, 190, 72, ("Git / SVN", "hash-checked commits"), ("Git／SVN", "ハッシュ照合コミット"), "key", 2),
            ("timer", 290, 310, 190, 72, ("Timer engine", "schedule applied on read"), ("タイマー", "読み出し時に勤務表を適用"), "", 4),
            ("llm", 580, 160, 190, 72, ("Local LLM client", "strict JSON schema"), ("ローカルLLM", "厳格なJSONスキーマ"), "key", 3),
            ("vault", 580, 310, 190, 72, ("Obsidian vault", "managed sections · backup"), ("Obsidian", "管理領域・バックアップ"), "ext", None),
            ("api", 850, 10, 150, 72, ("Backlog API", "REST v2"), ("Backlog API", "REST v2"), "ext", None),
            ("server", 850, 160, 150, 72, ("llama.cpp", "OpenAI-compatible"), ("llama.cpp", "OpenAI互換API"), "ext", None),
        ],
        edges=[
            ("M180 178 H232 V46 H286", ("refresh", "更新"), 232, 110, False),
            ("M180 196 H286", ("stage · commit", "ステージ・コミット"), 233, 188, False),
            ("M180 214 H232 V346 H286", ("start · stop", "開始・停止"), 232, 282, False),
            ("M480 30 H846", ("tickets · comments", "チケット・コメント"), 665, 22, False),
            ("M480 62 H528 V180 H576", ("ticket + history", "チケット＋履歴"), 528, 120, False),
            ("M480 196 H576", ("verified diff", "検証済み差分"), 528, 188, False),
            ("M675 310 V236", ("note", "ノート"), 675, 274, False),
            ("M770 196 H846", ("schema", "スキーマ"), 808, 188, False),
        ],
    ),
}

LIQ_JA = '{%- assign ja = false -%}{%- if include.lang == "ja" -%}{%- assign ja = true -%}{%- endif -%}'


def bi(en, ja):
    """Inline Liquid switch between an English and a Japanese string."""
    return f"{{% if ja %}}{escape(ja)}{{% else %}}{escape(en)}{{% endif %}}"


def label_w(s, ja):
    # monospace 10px ≈ 6.1 px a glyph; Japanese 10.5px ≈ full-width
    if ja:
        return sum(10.6 if ord(c) > 0x2E80 else 6.2 for c in s) + 12
    return len(s) * 6.1 + 12


def render(slug, d):
    W, H = 1000, d["h"]
    o = [LIQ_JA]
    o.append(f'<svg class="dg draw" viewBox="-14 -14 {W + 28} {H + 28}" role="img" aria-labelledby="dg-{slug}-t dg-{slug}-d">')
    o.append(f'  <title id="dg-{slug}-t">{bi(*d["title"])}</title>')
    o.append(f'  <desc id="dg-{slug}-d">{bi(*d["desc"])}</desc>')
    o.append(f'  <defs><marker id="ar-{slug}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
             f'<path class="arrow" d="M0 0 L10 5 L0 10 z"/></marker></defs>')
    # edges first, so nodes sit on top of line ends
    for path, lab, lx, ly, dashed in d["edges"]:
        cls = "edge is-dash" if dashed else "edge"
        o.append(f'  <path class="{cls}" d="{path}" marker-end="url(#ar-{slug})"/>')
    for path, lab, lx, ly, dashed in d["edges"]:
        if not lab:
            continue
        en, ja = lab
        we, wj = label_w(en, False), label_w(ja, True)
        o.append("  {% if ja %}" + f'<rect class="el-bg" x="{lx - wj / 2:.1f}" y="{ly - 8}" width="{wj:.1f}" height="15"/>'
                 + "{% else %}" + f'<rect class="el-bg" x="{lx - we / 2:.1f}" y="{ly - 8}" width="{we:.1f}" height="15"/>' + "{% endif %}")
        o.append(f'  <text class="el" x="{lx}" y="{ly + 3.5}" text-anchor="middle">{bi(en, ja)}</text>')
    for nid, x, y, w, h, (te, se), (tj, sj), kind, ref in d["nodes"]:
        cls = "node" + (f" is-{kind}" if kind else "")
        attr = f' data-ref="{ref}"' if ref else ""
        cy = y + h / 2
        o.append(f'  <g class="{cls}"{attr}>')
        o.append(f'    <rect x="{x}" y="{y}" width="{w}" height="{h}"/>')
        o.append(f'    <text class="nt" x="{x + 14}" y="{cy - 4}">{bi(te, tj)}</text>')
        o.append(f'    <text class="ns" x="{x + 14}" y="{cy + 15}">{bi(se, sj)}</text>')
        o.append("  </g>")
        if ref:
            o.append(f'  <g class="bl" data-ref="{ref}"><circle cx="{x + w}" cy="{y}" r="11"/>'
                     f'<text x="{x + w}" y="{y + 4}" text-anchor="middle">{ref}</text></g>')
    o.append("</svg>")
    return "\n".join(o) + "\n"


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, d in DIAGRAMS.items():
        (OUT / f"{slug}.html").write_text(
            "{%- comment -%} GENERATED by tools/gen_diagrams.py — edit the script, not this file. {%- endcomment -%}\n"
            + render(slug, d))
        print("wrote", OUT / f"{slug}.html")
