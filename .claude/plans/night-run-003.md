# 夜間自走 試行 #3: 美容室サンプル `& moi` 本格実装

> CLI Claude Code (`claude --permission-mode acceptEdits` + `caffeinate -i`) で夜間自走させるための Plan。
> 設計書: `sample-salon-design-brief.md` を必ず参照。
> ヒアリング: `sample-salon-hearing.md`
> 画像要件: `../../docs/IMAGE-REQUESTS-SALON.md`

---

## 0. 前提条件

### 起動前チェック (user 確認)
- [ ] `public/images/salon/` に必須画像 (最低 10 枚) 配置済み
  - hero.jpg / interior-{1..4}.jpg / staff-{1..3}.jpg / works/cut-1.jpg / exterior.jpg
- [ ] Sanity プロジェクト準備済み (新規 or 税理士サンプルと共有)
  - **判断**: シンプル化のため **税理士サンプルと同じ Sanity プロジェクト (5synfpav)** を流用、 schema だけ分ける (salonWork 追加)
- [ ] `.env.local` の `NEXT_PUBLIC_SITE_URL` を `http://localhost:3004` に設定済み (税理士と共通)
- [ ] dev server 停止中 (CLI が起動するため)

### CLI 起動コマンド (user 実行)

```bash
cd "/Users/kakoiatsushi/Projects/zuk-zuk AI DESIGN STUDIO/zuk-zuk-samples"
caffeinate -i claude --permission-mode acceptEdits
```

その後、 CLI 内で:
```
@.claude/plans/night-run-003.md を読んで Phase A から順番に実装してください。
```

---

## 1. Phase A: ディレクトリ + 依存セットアップ (~30 分)

### A-1. ディレクトリ構造作成

```bash
mkdir -p src/app/salon/legal/{privacy,terms,tokushoho}
mkdir -p src/components/salon
mkdir -p src/sanity/schemas
mkdir -p public/images/salon/works
```

### A-2. salon-content.ts 作成

`src/lib/salon-content.ts` を新規作成。 design-brief.md の Section 3 のデータをすべて移植:

- `SITE_SALON` (店名・URL・description)
- `STYLISTS` (3 名)
- `MENU` (CUT / COLOR / TREATMENT / SPA)
- `VOICES` (3-5 件、 design-brief Section 06 の例を 5 件に拡張)
- `ACCESS` (住所・営業時間・連絡先)
- `FAQ` (8 件)
- `HERO_COPY` (案 2 空間ベース)
- `ABOUT_TEXT` (リード文)
- `CONTACT_INTRO` (誘導コピー)
- `GALLERY_FALLBACK` (Sanity 未設定時のハードコード fallback、 4-6 件)

### A-3. styles.css 作成

`src/app/salon/styles.css` に Tailwind v4 `@theme` でカラートークン追加 (design-brief Section 1)。

### A-4. layout.tsx 作成 (metadata + JSON-LD)

`src/app/salon/layout.tsx`:
- `metadata` で title / description / OG
- `jsonLd` で **HairSalon schema** (LocalBusiness 派生)
- address / openingHours / telephone を `salon-content.ts` の ACCESS から引用

---

## 2. Phase B: コンポーネント実装 (~3-4h)

### 実装順序 (依存少 → 多)

1. **B-1. ui.tsx** (基盤、 税理士 `tax/ui.tsx` から流用 + 色差替)
   - Section / Eyebrow / Icon / Btn

2. **B-2. SalonHeader.tsx** (上部ナビ、 lamune 参考)
   - ロゴ「& moi」 (左)
   - ナビ「01.HOME / 02.ABOUT / ... / 09.CONTACT」 (中央 or 右)
   - 「ご予約」 ボタン (右、 disabled、 Contact へスクロール)
   - sticky 固定
   - mobile: hamburger

3. **B-3. SalonFooter.tsx**
   - 店名 / 住所 / 営業時間 / Instagram (任意、 disabled でも OK)
   - 法務リンク (privacy / terms / tokushoho)
   - © 2026 & moi

4. **B-4. SalonHero.tsx** (01)
   - 背景画像 `/images/salon/hero.jpg` (cover、 オーバーレイ)
   - 中央: ロゴ「& moi」 大 (Cormorant Garamond 系)
   - サブ: HERO_COPY (4 行ストーリー)
   - セクション番号 「01 / HOME」
   - 「Scroll」 のスクロール誘導アニメ (任意)

5. **B-5. SalonAbout.tsx** (02)
   - セクション番号 「02 / ABOUT」
   - 見出し「私たちのこと」
   - リード文 (ABOUT_TEXT)
   - **インテリア 4 枚 正方形グリッド** (grid-cols-2 md:gap-3 lg:gap-4)
     - interior-1.jpg 〜 interior-4.jpg
   - 各画像: aspect-square, object-cover, hover 時 scale 1.02

6. **B-6. SalonStylists.tsx** (03)
   - セクション番号 「03 / STYLISTS」
   - 見出し「スタッフ」
   - 3 名横並び (grid-cols-1 md:grid-cols-3 gap-8)
   - 各カード: 顔写真 (aspect-[4/5]) + Stylist + 英名 + 日本名 + プロフィール短文

7. **B-7. SalonMenu.tsx** (04)
   - セクション番号 「04 / MENU」
   - 見出し「メニュー」
   - 4 ブロック (CUT / COLOR / TREATMENT / SPA)
   - 各ブロック: 英タイトル大 + 日タイトル + メニュー行 (名前 ─── 価格) + 注釈
   - 価格は JetBrains Mono (tnum) で揃え

8. **B-8. SalonGallery.tsx** (05)
   - セクション番号 「05 / GALLERY」
   - 見出し「Gallery」
   - 正方形サムネイル密集グリッド (grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2)
   - データソース: Sanity の salonWork (Phase C で実装)
   - env 未設定時: GALLERY_FALLBACK ハードコード (4-6 件) で代替
   - hover で淡く明るく

9. **B-9. SalonVoice.tsx** (06)
   - セクション番号 「06 / VOICE」
   - 見出し「お客様の声」
   - 3-5 件カード横スクロール (mobile) / 縦 stack (desktop)
   - 各カード: 引用文 (Cormorant Garamond アクセント) + 客層 + 来店歴

10. **B-10. SalonAccess.tsx** (07)
    - セクション番号 「07 / ACCESS」
    - 見出し「Access」
    - 左カラム: 住所 + 駅 + 電話 + 営業時間 + 定休日
    - 右カラム: 外観写真 (`/images/salon/exterior.jpg`、 aspect-[4/5])

11. **B-11. SalonFaq.tsx** (08)
    - セクション番号 「08 / FAQ」
    - 見出し「よくあるご質問」
    - 試行 #2 の TaxFaqAccordion を流用、 色差替
    - 8 件の Q&A (FAQ データ)

12. **B-12. SalonContact.tsx** (09) — **setup-sample-demo-mode 適用**
    - セクション番号 「09 / CONTACT」
    - **サンプル警告バナー** (gold/border 系、 試行 #2 と同じパターン)
    - フォーム UI (disabled):
      - お名前 / メールアドレス / 電話番号 / ご希望日時 / ご希望メニュー / ご相談内容
    - 送信ボタン: 「サンプル表示のため送信できません」
    - 下部 CTA: 「zuk-zuk AI STUDIO で相談する →」
    - 動作確認: 警告バナーが目立つこと、 input 全部 disabled、 CTA が機能

13. **B-13. page.tsx** (全セクション統合)
    - import + 順番に配置: Header / Hero / About / Stylists / Menu / Gallery / Voice / Access / FAQ / Contact / Footer

---

## 3. Phase C: Sanity 連動 (~1h)

### C-1. salonWork スキーマ作成

`src/sanity/schemas/salonWork.ts`:
```ts
import { defineField, defineType } from "sanity";

export const salonWork = defineType({
  name: "salonWork",
  title: "施術事例 (Salon)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "タイトル", type: "string", validation: r => r.required() }),
    defineField({ name: "category", title: "カテゴリ", type: "string", options: { list: [
      { title: "Cut", value: "cut" },
      { title: "Color", value: "color" },
      { title: "Perm", value: "perm" },
      { title: "Treatment", value: "treatment" },
    ]}}),
    defineField({ name: "image", title: "施術後の写真", type: "image", validation: r => r.required(), options: { hotspot: true } }),
    defineField({ name: "stylistName", title: "担当スタイリスト名", type: "string" }),
    defineField({ name: "order", title: "表示順 (小さいほど上)", type: "number", initialValue: 100 }),
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "category" },
  },
});
```

### C-2. structure.ts (Studio) に追加

`src/sanity/structure.ts` を編集して、 既存の TaxWork / TaxColumn に並べて salonWork を追加。 lamune 風に「美容室サンプル」 グループでまとめる。

### C-3. SalonGallery.tsx の Sanity 連動

- `client.fetch(\`*[_type == "salonWork"] | order(order asc, _createdAt desc)\`)` で取得
- env 未設定時 or データ 0 件時: GALLERY_FALLBACK でフォールバック表示
- ISR (revalidate 60) で軽い動的化

### C-4. 動作確認

- http://localhost:3004/studio で「施術事例 (Salon)」 が見える
- 1 件作成 → http://localhost:3004/salon/#gallery で表示確認

---

## 4. Phase D: SEO/OGP/法務 (~1h)

### D-1. opengraph-image.tsx (中央 630x630 セーフ)

`src/app/salon/opengraph-image.tsx`:
- 設計書 Section 6 + setup-seo-ogp Skill に従う
- 中央 630x630 セーフエリア
- 内容:
  - 上: 「Hair Salon, Musashi-Kosugi.」 (eyebrow)
  - 中央: 「**& moi**」 ロゴ大 (Cormorant Garamond 系想定、 ただし @vercel/og 標準 serif)
  - 下: 「Cut from ¥6,000 / Open since 2018」 ぐらいの短い情報
- カラー: bg=`#FAFAF8`, accent=`#5A4E3F`, sub=`#7D8A6E`

### D-2. sitemap.ts / robots.ts (拡張)

既存の sitemap.ts / robots.ts に salon ルートを追加:
- `/salon/` (priority 1.0)
- `/salon/legal/{privacy,terms,tokushoho}` (priority 0.3)
- robots.ts は `/studio/` を引き続き Disallow (既存通り)

### D-3. JSON-LD (HairSalon schema)

`src/app/salon/layout.tsx` の jsonLd:
```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "& moi",
  address: {
    "@type": "PostalAddress",
    streetAddress: "小杉町 X-X-X 1F",
    addressLocality: "中原区",
    addressRegion: "神奈川県川崎市",
    postalCode: "211-0063",
    addressCountry: "JP",
  },
  telephone: "+81-44-1234-5678",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "10:00", closes: "19:00" },
  ],
  priceRange: "¥¥",
  image: `${SITE.url}/salon/opengraph-image`,
};
```

### D-4. 法務 3 ページ (税理士から流用)

`src/app/salon/legal/{privacy,terms,tokushoho}/page.tsx`:
- 税理士サンプルの法務ページから内容を流用
- 「みらい税理士事務所」 → 「& moi」 に置換
- 業種特有の文言調整 (例: 「税務相談」 → 「予約・施術」)
- サンプル注記を必ず冒頭に: 「※このサイトは zuk-zuk AI STUDIO のサンプルです」

---

## 5. Phase E: 動作確認 + 微調整 (~30 分)

### E-1. ローカル確認チェックリスト

```bash
PORT=3004 npm run dev
```

http://localhost:3004/salon/ で:

- [ ] 全 9 セクション表示
- [ ] Hero に背景画像 + テキスト + セクション番号
- [ ] About インテリア 4 枚正方形グリッド整列
- [ ] Stylists 3 名横並び、 mobile で縦 stack
- [ ] Menu の価格表示崩れなし
- [ ] Gallery 正方形サムネイル密集 (Sanity から 1 件以上、 または fallback で 4-6 件)
- [ ] Voice カード表示
- [ ] Access 住所 + 外観写真
- [ ] FAQ アコーディオン動作
- [ ] Contact サンプル警告 + form disabled + AI STUDIO CTA
- [ ] Header sticky、 「ご予約」 ボタン disabled
- [ ] Footer の法務リンクで /salon/legal/{privacy,terms,tokushoho} が表示
- [ ] http://localhost:3004/salon/opengraph-image で OG 画像 (1200x630) 表示
- [ ] http://localhost:3004/sitemap.xml に /salon/ が含まれる

### E-2. レスポンシブ確認

各 viewport (iPhone SE 375x667 / iPad 768x1024 / iPad Pro 1024x1366 / Desktop 1440) で:
- [ ] Hero テキスト読める
- [ ] About 4 枚グリッドが綺麗 (mobile は 2x2 維持)
- [ ] Stylists が壊れない
- [ ] Menu 価格が揃ってる
- [ ] Gallery の密集グリッドが綺麗
- [ ] Header ナビが入りきる (入らないなら hamburger 切替)

### E-3. ビルド確認

```bash
npm run build
```
→ Type error / Lint error なし、 全 page を static or ISR で出力できる

---

## 6. 試行 #3 で実証したいこと (試行 #2 の経験を踏まえ)

| 観点 | 試行 #2 (税理士) | 試行 #3 (美容室) で確認 |
|---|---|---|
| 画像主体実装 | 文字主体 (ネイビーパネルのみ) | **画像主体** で動く確認 (Hero / About / Gallery 等) |
| 画像 placeholder | なし | env / 画像未配置でも壊れない fallback (`/images/salon/` 無くてもグレー枠表示) |
| サンプル誘導モード | 試行 #2 後に手動追加 | **最初から組み込み** で実装 |
| OG 正方形セーフ | 試行 #2 後に修正 | **最初から正方形セーフ** で実装 |
| Sanity 連動 | TaxWork / TaxColumn | **salonWork** で同じパターン適用 (Skill 再利用検証) |
| セクション数 | 5 セクション | **9 セクション** (1.8 倍、 大規模実装の運用感) |

---

## 7. 試行 #2 の反省点と対処

| 反省点 | 対処 (試行 #3) |
|---|---|
| 67% の Bash で許可待ち | `.claude/settings.json` allow/deny 整備済 (試行 #2 後) |
| envFile 未設定でも動作させる工夫 | salonWork は env 未設定時 `isSanityConfigured` ガード必須 |
| seed script 未作成 | seed-sanity-salon.ts も作る (任意、 #80 と並列) |
| 詳細ページ未実装 | salon は詳細ページなし (Gallery は単一画像) |
| OG 和文未対応 | OG 画像は欧文のみ (英語表現で UI 統一) |

---

## 8. 完成後の納品物

夜間自走完了で得られるもの:

1. ✅ `src/app/salon/` 配下に動くサンプルサイト (9 セクション)
2. ✅ Sanity スキーマ `salonWork` + Studio で編集可能
3. ✅ OG 画像 (正方形セーフ)
4. ✅ 法務 3 ページ
5. ✅ サンプル誘導モード組み込み済み
6. ✅ ローカル動作確認済み
7. ✅ git commit + push 済み
8. ✅ 朝起きた時に確認できる状態の summary.md (`docs/NIGHT-RUN-003-SUMMARY.md`)

---

## 9. 関連リソース

- 設計書: `sample-salon-design-brief.md`
- ヒアリング: `sample-salon-hearing.md`
- 画像要件: `../../docs/IMAGE-REQUESTS-SALON.md`
- 試行 #2 の Plan: (参考、 zuk-zuk-template/.claude/plans/night-run-001.md があれば)
- Skill:
  - `../../zuk-zuk-template/.claude/skills/setup-image-workflow.md`
  - `../../zuk-zuk-template/.claude/skills/setup-sanity-cms.md`
  - `../../zuk-zuk-template/.claude/skills/setup-seo-ogp.md`
  - `../../zuk-zuk-template/.claude/skills/setup-vercel-deploy.md`
  - `../../zuk-zuk-template/.claude/skills/setup-legal-pages.md`
  - `../.claude/skills/setup-sample-demo-mode.md`
  - `../.claude/skills/setup-image-workflow.md` (samples 配下にもあり)

---

## 10. 実装後の人間チェックポイント

朝、 user が確認すべきこと:

1. **見た目**: http://localhost:3004/salon/ をスクロール、 lamune-kyoto.com と並べて比較
2. **画像**: 全画像配置済みか、 placeholder 残ってないか
3. **Sanity**: http://localhost:3004/studio で「施術事例 (Salon)」 を 1 件作成 → 反映確認
4. **OG**: http://localhost:3004/salon/opengraph-image を開いて中央 630x630 で全情報読めるか
5. **誘導 CTA**: Contact セクションで AI STUDIO リンクが click できる
6. **commit summary**: NIGHT-RUN-003-SUMMARY.md を読む
7. 問題なければ Vercel デプロイ準備 (#79 と同じパターン)
