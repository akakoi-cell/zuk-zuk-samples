# 夜間自走 試行 #3 サマリー — 美容室サンプル「& moi」

> 実行: 2026-06-10 / CLI Claude Code (acceptEdits)
> Plan: `.claude/plans/night-run-003.md` / 設計書: `.claude/plans/sample-salon-design-brief.md`
> 正典デザイン: `.claude/plans/claude-design-salon/` (index.html / styles.css)

## 結論

Phase A〜E をすべて完了。`/salon` に 9 セクションの美容室サンプルサイトを実装し、
`npm run build` 成功 + ローカル動作確認済み。git commit + push 済み。

## 実装した成果物

### ページ / ルート
- `src/app/salon/page.tsx` — 全セクション統合 (Sanity gallery を SSR fetch)
- `src/app/salon/layout.tsx` — metadata + OG + **HairSalon JSON-LD** + next/font 4 書体 + CSS import
- `src/app/salon/salon.css` — Claude Design styles.css を **`.salon-root` にスコープ移植**
- `src/app/salon/opengraph-image.tsx` — OG 画像 (**中央 630x630 正方形セーフ**、salon 配色)
- `src/app/salon/legal/{privacy,terms,tokushoho}/page.tsx` — 法務 3 ページ (冒頭にサンプル注記)

### コンポーネント (`src/components/salon/`)
ui.tsx (Brand/Eyebrow/Ph) / SalonReveal (fail-open IntersectionObserver) /
SalonHeader (sticky hero⇄solid 切替 + mobile sheet) / SalonHero / SalonAbout /
SalonStylists / SalonMenu / SalonGallery / SalonVoice /
**SalonAccess (Google Map iframe 強調)** / SalonFaq /
**SalonLineBanner (LINE 緑バナー強調)** / SalonContact (サンプル誘導モード) /
SalonFooter / SalonLegalLayout

### データ / CMS
- `src/lib/salon-content.ts` — 全コンテンツ定数 (Claude Design 採用版データ)
- `src/sanity/schemas/salon/salonWork.ts` — 施術事例スキーマ (Studio に追加済み)
- `src/sanity/queries.ts` — `getSalonWorks()` 追加 (env 未設定時 `GALLERY_FALLBACK` フォールバック)
- `src/app/sitemap.ts` — `/salon/` + 法務 3 ページを追記

## 重要ルールの遵守状況

| ルール | 状況 |
|---|---|
| ① Claude Design を正典として参照 | ✅ styles.css を `.salon-root` にスコープ移植、HTML 構造も踏襲 |
| ② 設計書を Phase ごと参照 | ✅ Stylists 名/タグ・Voice 2x2 星評価・About 見出し等を採用版で実装 |
| ③ 画像は hero.jpg 以外 placeholder | ✅ `Ph` が画像未配置でも壊れないグレー枠ラベルを表示 |
| ④ サンプル誘導モードを最初から | ✅ Contact 全 input disabled + 警告バナー + AI STUDIO CTA |
| ⑤ OG 中央 630x630 正方形セーフ | ✅ opengraph-image.tsx で実装 |
| ⑥ Phase 1 強調機能 | ✅ Google Map iframe (Access) + LINE バナー (Footer 直前) |

## 設計判断 (朝に確認いただきたい点)

1. **CSS 方針**: 「Tailwind v4 で再構築」が Plan の指示だったが、Claude Design の
   styles.css が完成度高く「正典」指定のため、**styles.css を `.salon-root` に
   スコープ移植する方針**を採った (specificity で globals.css と非衝突)。
   → 利点: カンプとピクセル忠実・低リスク。欠点: 税理士サンプル (Tailwind utility 主体)
   と実装スタイルが揃わない。揃えたい場合は朝にご指示ください。

2. **セクション番号**: Claude Design は Voice を省き About=01 で振り直していた。
   本実装は Voice を入れて About=01 / Stylist=02 / Menu=03 / Gallery=04 /
   **Voice=05** / Access=06 / FAQ=07 / Contact=08 と通し番号にした。

3. **Google Map embed URL**: API キー不要の `output=embed` 方式で武蔵小杉駅中心を表示。
   架空住所のため駅中心ズーム。実店舗の正式 embed URL に差し替え可能。

4. **画像**: hero.jpg のみ実画像。interior-{1..4} / staff-{1..3} / exterior /
   gallery は placeholder。画像が揃ったら `public/images/salon/` に配置し、
   `Ph` / Sanity に差し替え。

## 検証結果

- `npm run build` ✅ 成功 (TypeScript / 静的生成 20 ページ、salon は ISR 1m)
- `/salon` 200 / 9 セクション全描画 / hydration エラーなし
- `/salon/legal/{privacy,terms,tokushoho}` 200
- `/salon/opengraph-image` 200 (1200x630)
- `/sitemap.xml` に salon 4 ルート含む
- Contact: input/button 全 disabled、AI STUDIO リンク機能、送信不可
- Google Map iframe 描画、LINE バナー描画

## 朝の人間チェックポイント (Plan §10)

1. 見た目: http://localhost:3004/salon を lamune-kyoto.com と並べて比較
2. 画像: placeholder の差し替え計画
3. Sanity: 上記 #2 の env 設定後、/studio で「施術事例 (Salon)」を 1 件作成 → 反映確認
4. OG: http://localhost:3004/salon/opengraph-image を開いて中央正方形で全情報読めるか
5. 誘導 CTA: Contact で AI STUDIO リンクが click できる
6. 設計判断 1〜4 の確認

## 残タスク / 朝の確認待ち

- [ ] 画像の本配置 (interior/staff/exterior/gallery)
- [ ] Sanity env 設定 + salonWork を 1 件以上作成して連動確認
- [ ] (任意) CSS 方針を Tailwind 統一にするか判断
- [ ] (任意) Google Map を実店舗 embed URL に差し替え
- [ ] (任意) seed-sanity-salon.ts 作成 (Plan §7 で「任意」)
