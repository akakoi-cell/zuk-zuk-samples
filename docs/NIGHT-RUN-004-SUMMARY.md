# NIGHT-RUN-004 SUMMARY — Hello Tree（#69）Figma 忠実再現テスト

> 現場スレッド成果報告。ZAS OPS の引き継ぎ正典 `.claude/plans/sample-school-figma-repro.md` に基づき、
> user が Figma で手起こししたデザインを **Figma MCP（design-to-code）** で `src/app/school/` に再現した。
> 「Figma 手起こし → MCP 再現でどこまで忠実にできるか」のワークフロー検証を兼ねる。

- ブランチ: `feature/sample-school-69`
- Figma: fileKey `IZSnIpCsrV2cjYMIG0CanV` / node `8-627`（Desktop フル LP 1512×5052）
- 確認 URL: `localhost:3004/school`（dev server, samples 共通ポート）

---

## 1. 実装したもの

### Figma 忠実再現セクション（視覚の正典 = Figma）
| # | セクション | Figma node | 状態 |
|---|---|---|---|
| 00 | Header（ロゴ+ナビ+コーラル pill CTA） | `2:12` | ✅ ほぼ完全一致 |
| 01 | Hero（Nice Try! 手書きステッカー + 楕円マスク写真 + 緑の丘/木） | `4:194` / `5:191` | ✅ 高忠実 |
| 02 | この教室のこと（ベタ緑地・白文字 + お家/鳥/＼NiceTry!／） | `4:125` / `5:60` | ✅ 高忠実 |
| 03 | 教室の特徴（淡緑地・白カード3枚 + ピン留め） | `7:413` | ✅ 高忠実 |
| 04 | 先生たちの紹介（青地・荷札カード3枚） | `9:782` | ✅ 高忠実 |
| 05 | コース（淡緑地・4色ヘッダーカード + 子供イラスト） | `8:557` | ✅ ほぼ完全一致 |

### コード設計セクション（Figma に図面なし → on-brand 設計）
> Figma は **コースで終わり**（総高 5052px が上記5フレームで充足）。「以降」は図面が存在しないため
> design-brief 準拠で Figma のトークン・手書きトーンに合わせてコード設計。サンプル誘導モード維持。

- 06 Pricing（週1/週2 月謝プラン・サブスク強調・人気リボン）
- 07 Trial（cal.com 風 予約 UI・全 disabled デモ + AI STUDIO CTA）
- 08 Access（住所 dl + Google Map 実 iframe）
- 09 FAQ（アコーディオン）
- 10 Contact（サンプル誘導バナー + AI STUDIO CTA）
- 11 LINE バナー（公式緑・disabled）
- Footer（深青地・ロゴ反転・ナビ）

### Figma からダウンロードしたアセット（`public/images/school/`）
`logo.svg`（Hello Tree ロゴ）/ `hero.jpg`（ハイタッチ写真）/ `house.svg`（お家）/ `bird.svg`（鳥）/
`hero-hill.svg`（緑の丘+木）/ `child.svg`（子供イラスト）/ `teacher-emily|mike|aya.jpg`
※ SVG は Figma 書き出し時に混入する**キャンバス/セクション背景 rect（#1E1E1E / #E8EDE3 / #279F77）を除去**して使用。

---

## 2. Figma 忠実度の所感

**総評: 5つの Figma セクションは高忠実に再現できた。** Figma 手起こし → MCP design-to-code は、
演出依存度の高い（イラスト・余白・装飾の重なり・世界観が要のトーン）案件で**確実に機能する**ことを確認。
Claude Design 直書きでは品質が出なかった同案件が、Figma を正典にすることで一発で狙いどおりになった。

### よく効いた点
- **`get_design_context`（セクション単位）** が、色（CSS 変数名つき: `--ミドリ_n,#279f77` 等）・テキスト実値・
  フォント・サイズ・回転角（`rotate(-2.4deg)` 等）まで返すので、配色/寸法の推測が不要だった。
- **`get_variable_defs`** でカラートークン14色を実値で取得 → そのまま `@theme` に移植。
- **`download_assets`（svg）** でロゴ・お家・鳥・木・子供イラストをベクターで取得。描き直し不要で破綻なし。
- **`get_screenshot` + dev server スクショの並置比較**（Chrome headless）で、波/丘・カード回転・ピンの位置を詰められた。

### 完全一致しなかった点（=本テストの「差分」、下記 §3）
- 手書きフォント **SicHandic（Figma）→ Yusei Magic（Google）** の代替。質感は近い（マーカー手書き）が、
  SicHandic よりやや細い。和欧・かな漢字をカバーし、本文も line-height 2.7 で可読性は確保。
- Hero 写真の楕円は Figma の alpha マスク画像 → CSS `border-radius:50%` で再現（視覚的に等価）。

---

## 3. 差分リスト（Figma ↔ 再現コード）

| 区分 | Figma | 再現コード | 理由 / 影響 |
|---|---|---|---|
| フォント | SicHandic（手書き） | Yusei Magic（Google, next/font） | 無料の完全一致なし。近似マーカー手書き。やや細い |
| `@theme` 配置 | （プラン記載: school/styles.css） | `globals.css` の `@theme` に集約 | Tailwind v4 は `@import "tailwindcss"` を持つエントリでしか `@theme` を処理しない（税理士と同パターン）。視覚に影響なし。複雑な視覚は `school/styles.css` の `.school-root` スコープ |
| Hero 写真マスク | alpha マスク画像（楕円） | CSS 楕円（border-radius 50%） | 視覚的に等価 |
| 先生写真 | 3枚とも同一プレースホルダ（手を振る女性） | 同一画像を3名に複製 | Figma 仕様どおり。実案件では別途撮影 |
| 特徴カード写真 | 3枚とも同一プレースホルダ（ハイタッチ写真） | `hero.jpg` を3枚流用 | Figma 仕様どおり |
| 子供イラスト | コース4枚で微妙に色違い | 1種を4枚流用 | 軽微な忠実度低下。charm は維持 |
| 特徴 F2/F3 本文 | プレースホルダ重複文 | タイトルに合う文を新規作成 | Figma のダミーを改善（破綻回避） |
| コース C2 | ラベル「親子クラス」（Figma の copy 漏れ。年齢3〜6歳/フォニックス内容） | 「幼児クラス」に修正 | 内容と整合させる修正 |
| 料金/アクセス/体験/FAQ/LINE/Contact/Footer | Figma に**図面なし** | design-brief 準拠でコード設計 | Figma がコースで終わるため（§1） |
| レスポンシブ | Desktop 1512px のみ | SP をコード再設計（縦積み等） | Figma に SP 情報なし（figma-repro 第5章方針） |
| セクション境界の波 | Figma の波エッジ/丘 | hero は Figma の丘 SVG、他は近似波 SVG（次セクション色で塗り） | 視覚的に同等の繋ぎ |

---

## 4. 技術メモ / ハマりどころ

- **globals.css の `.nav { position:fixed }` 汚染**: テンプレ既定の `.nav` が固定配置でヘッダーが崩れた
  → `.school-root .nav { position:static; ... }` で打ち消し（salon と同じ対処）。
- **Figma SVG 書き出しの背景 rect 混入**: ノード単体書き出しでも親フレーム/キャンバスの背景 rect が入る
  → 該当 `<rect fill="#1E1E1E|#E8EDE3|#279F77">` を除去してから配置。
- **`get_design_context` はフルページだと 66k 超**で大きすぎる → 必ずセクション node 単位で呼ぶ（正典どおり）。
- **スクショ検証の reveal アーティファクト**: スクロール出現（`.rv`）が headless 全ページ撮影だと下部を opacity:0 にする
  → `--force-prefers-reduced-motion=reduce` で reveal を no-op 化して撮影すると全要素が見える。実ブラウザでは正常。

---

## 5. ワークフロー学習（OPS 記録）

- **演出依存度が高い案件 = Figma 手起こし → MCP design-to-code が正解**（figma-repro 第9章の仮説を実証）。
  Claude Design 直書きで品質不足だった #69 が、Figma 正典化で高忠実に再現できた。
- **横展開メモ**: 見積り時に「演出依存度」を判定軸にし、高い案件は最初から Figma 手起こし前提で工数を見る。
- **MCP 運用のコツ**: ① `get_variable_defs` で色を先に固める → `@theme` 化 ② `get_design_context` はセクション単位
  ③ イラスト/装飾は `download_assets(svg)` でベクター取得し背景 rect を除去 ④ dev スクショと Figma スクショを
  Chrome headless で並置して波/回転/位置を詰める。
- **未完（後追い可）**: 会員機能（mypage / lessons / 薄い実認証）は `sample-school-membership-spec.md` 準拠で別途。
  本テストは LP 見た目の忠実再現が主目的のため範囲外。

---

## 6. 確認方法

```bash
cd zuk-zuk-samples
PORT=3004 npm run dev   # → http://localhost:3004/school
```
