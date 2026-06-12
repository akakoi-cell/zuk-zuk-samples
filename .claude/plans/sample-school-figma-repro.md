# Hello Tree — Figma → コード忠実再現 引き継ぎパッケージ

> 2026-06-10 方針変更: Claude Design は**演出重視トーンで品質不足**と判明。
> #69 は user が **Figma で手起こししたデザインを正典**とし、 **Figma MCP で design-to-code** 再現する。
> このドキュメントは現場スレッド（CLI bypassPermissions）向けの引き継ぎ。 ZAS OPS が作成。

---

## 0. ゴール

user が Figma で作った Hello Tree のフル LP を、 `src/app/school/` に **見た目を忠実に再現**する。
「Figma 手起こし → Figma MCP 経由の design-to-code で、 どこまで忠実に再現できるか」 のテストでもある。

---

## 1. Figma ソース（視覚の正典）

| 項目 | 値 |
|---|---|
| リンク | https://www.figma.com/design/IZSnIpCsrV2cjYMIG0CanV/?node-id=8-627 |
| fileKey | `IZSnIpCsrV2cjYMIG0CanV` |
| ルートノード | `8-627`（Desktop フル LP、 1512 × 5052px） |

使う MCP ツール（Figma 公式 MCP）:
- `get_metadata`（構造・子ノードID。 ※タイムアウトしやすい → リトライ or Figma で各フレームを選択して取得）
- `get_screenshot`（ノード単位の見た目。 `maxDimension` を上げて細部確認、 実装と比較）
- `get_design_context`（reference code + アセットDL URL。 **フルページは 66k 超で大きすぎるのでセクション単位で呼ぶ**）
- `get_variable_defs`（カラートークン。 下表は抽出済）
- `download_assets`（写真・イラスト・手書き等の書き出し）

---

## 2. カラートークン（抽出済み = そのまま @theme に移植）

`get_variable_defs(8-627)` で取得した**実値**。 設計書の旧パレット（#4FA85A 等）は破棄し、 **こちらを正**とする。

| Figma 変数 | HEX | 役割（推定） | 提案 Tailwind v4 トークン |
|---|---|---|---|
| シロ | `#f5f3ea` | ベース背景（生成り） | `--color-school-bg` |
| ミドリ_N | `#279f77` | メイン緑（やや青み） | `--color-school-green` |
| ミドリ_Dk | `#1a7859` | 濃緑 | `--color-school-green-dk` |
| ミドリ_Bt | `#8cca77` | 明緑 | `--color-school-green-bt` |
| ミドリ_Lt | `#cddebd` | 淡緑 | `--color-school-green-lt` |
| ミドリ_Pl | `#e8ede3` | ごく淡い緑（セクション地） | `--color-school-green-pl` |
| キイロ_N | `#f3d55e` | 黄 | `--color-school-yellow` |
| オレンジ_N | `#e6ca52` | 黄（濃） | `--color-school-yellow-dk` |
| オレンジ_Dk | `#966d4c` | 茶 | `--color-school-brown` |
| アカ_N | `#e66e61` | コーラル（赤） | `--color-school-coral` |
| アオ_N | `#329ac4` | 青 | `--color-school-blue` |
| アオ_Dk | `#2c6890` | 濃青 | `--color-school-blue-dk` |
| アオ_Dp | `#083136` | 深青（ほぼ黒緑） | `--color-school-blue-dp` |
| クロ | `#2d2c28` | テキスト | `--color-school-text` |

> ⚠️ 各セクションで `get_variable_defs(セクションnodeId)` を呼ぶと、 そのセクションで実際に使われている色だけ返るので、 面積バランスの参考になる。

---

## 3. セクション構成（screenshot から確認、 上から）

```
00. Header        — Hello Tree ロゴ(左) + ナビ + 緑pill「無料体験」CTA(右)
01. Hero          — 「Nice Try! が 私たちのあいことば」+ hero写真 + サブコピー（クリーム地）
02. ABOUT US      — 「この教室のこと」+ イントロ文 + お家イラスト + "Hello!"手書き（緑地・白文字）
03. 教室の特徴     — 3 カード（写真 + 見出し + 説明、 淡緑地）
04. 先生たちの紹介  — Emily / Mike / Aya 3 カード（顔写真 + 名前pill、 青地）
05. コース         — 「成長にあわせて、4つのコース」4 色カード（子供イラスト、 クリーム地）
06. 料金 / アクセス / 無料体験 / Footer — overview では下部が見切れ。 現場で metadata or screenshot で確認して列挙
```

> Hero 見出しは Figma 上で **「Nice Try! が 私たちのあいことば」** に変更されている（"Nice Try"＝まちがえOK の体現。 良コピー）。
> **コピー・文言も Figma を正**とする（設計書のコピー案は参考）。 「この教室のこと」本文は設計済みの 200字版がベース。

---

## 4. 再現ワークフロー（セクション単位で回す）

各セクションについて:

1. **構造取得**: そのセクションの nodeId で `get_design_context`（reference code + アセットURL）
2. **トークン**: `get_variable_defs` で色を確認 → `src/app/school/styles.css` の `@theme` に第2章の変数を定義
3. **アセット書き出し**: `download_assets` or design_context の DL URL で、 写真・イラスト・"Hello!"手書き・お家・子供イラストを `public/images/school/` 配下に保存（**描き直さず画像として配置**）
   - hero 写真は既に `public/images/school/hero.jpg` 配置済み（Figma の Hero 写真と同一）
4. **コード化**: 既存サンプル（`src/app/salon/`）の作法に合わせ Next.js + Tailwind v4 で実装。 reference code の寸法・余白・角丸・影を踏襲
5. **忠実度チェック（重要）**: dev server（`PORT=3004 npm run dev` → `localhost:3004/school/`）を起動し、 **実装スクショ vs Figma スクショ**（`get_screenshot`）を並べて差分確認 → 合うまで微調整
6. 次セクションへ

---

## 5. フォント・レスポンシブ（差が出やすい注意点）

- **フォント**: Figma のフォント指定を確認し、 Web フォントへマッピング。 日本語=丸ゴシック系（Zen Maru Gothic 等）、 欧文=丸み系（Baloo 2 / Quicksand 等）。 Figma が別フォントを使っていれば近い Google Font に寄せる
- **レスポンシブ**: Figma は **Desktop 1512px のみ**。 スマホ版は Figma に情報が無い → **コード側で再設計**（コンテナ幅・段組みの折返し・文字サイズを実装者が設計）。 まず Desktop 忠実 → 次に SP 対応

---

## 6. 技術前提（既存サンプル準拠）

- 配置: `src/app/school/`、 コンポーネントは `src/components/school/`、 データは `src/lib/school-content.ts`
- ポート: **3004**（samples 共通。 ※ Hello Tree 専用 3012 の割当もあるが、 samples 内 /school/ で確認するなら 3004）
- サンプル誘導モード（フォーム/予約/LINE は disabled + AI STUDIO CTA）は維持
- 会員機能（mypage / lessons / 薄い実認証）は別途 `sample-school-membership-spec.md` 準拠（今回の忠実再現テストは LP 見た目が主目的、 会員は後追いで可）
- OG 画像は中央 630×630 セーフ

---

## 7. 成果物

1. `src/app/school/` にフル LP（Figma 忠実再現）
2. `public/images/school/` に Figma アセット一式
3. `styles.css` の `@theme` に第2章トークン
4. `docs/NIGHT-RUN-004-SUMMARY.md` に「Figma 忠実度の所感・差分リスト」 を記載（テストの結論）
5. feature ブランチ `feature/sample-school-69` で commit + push

---

## 8. 関連ドキュメント

- 設計書（構成・コピー・会員仕様の参考）: `sample-school-design-brief.md`
- ヒアリング: `sample-school-hearing.md`
- 会員機能: `sample-school-membership-spec.md`
- 画像要件: `../../docs/IMAGE-REQUESTS-SCHOOL.md`
- ⚠️ アーカイブ: `sample-school-claude-design-brief.md`（Claude Design 方式は演出トーンで品質不足のため #69 では不採用）
- 既存サンプル流用元: `src/app/salon/`

---

## 9. ワークフロー学習（OPS 記録）

- **Claude Design は「演出（イラスト配置・余白の妙・装飾の重なり・世界観）」が強く求められるトーンで品質が出にくい**
- → そのケースは **user が Figma で手起こし → Figma MCP で design-to-code 再現** が確実
- 税理士/美容室のような「構造的・端正」トーンは Claude Design でも可。 **判定軸 = 演出依存度**
- 横展開メモ: 演出依存度が高い案件は最初から Figma 手起こし前提で見積る
