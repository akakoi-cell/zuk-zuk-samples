# 美容室サンプル 設計書 — `& moi` (アンドモイ)

> 試行 #3 (#68) の実装基盤。 CLI 夜間自走 (`night-run-003.md`) はこの設計書を参照して進める。
> 参考サイト: https://lamune-kyoto.com/
> ヒアリング結果: `sample-salon-hearing.md`

---

## 0. プロジェクト概要

| 項目 | 値 |
|---|---|
| サンプル名 | 美容室サンプル `& moi` |
| URL (本番) | https://samples.zuk-zuk.com/salon/ |
| URL (Studio) | https://samples.zuk-zuk.com/studio (税理士と共有) |
| 配置先 | `src/app/salon/` |
| 試行 # | 試行 #3 (夜間自走) |
| 目的 | 画像主体サンプルの実証、 setup-image-workflow + setup-sample-demo-mode + setup-seo-ogp の組み合わせ運用検証 |

---

## 1. デザイントークン (Tailwind v4 @theme)

`src/app/salon/styles.css` (or globals.css 内のスコープ) で:

```css
@theme {
  /* Salon サンプル専用カラー */
  --color-salon-bg: #FAFAF8;          /* Main BG */
  --color-salon-card: #F5F1EB;         /* Card BG */
  --color-salon-accent: #5A4E3F;       /* 焦茶 */
  --color-salon-sub: #7D8A6E;          /* くすんだ緑 */
  --color-salon-text: #2A2520;         /* 深焦茶 */
  --color-salon-border: #E5DFD3;       /* 淡ベージュ */
  --color-salon-text-mute: #6B5F50;    /* テキストミュート */

  /* フォント */
  --font-salon-jp: "Zen Kaku Gothic New", sans-serif;
  --font-salon-en: "DM Sans", sans-serif;
  --font-salon-en-serif: "Cormorant Garamond", serif;  /* アクセント専用 */
  --font-salon-mono: "JetBrains Mono", monospace;
}
```

---

## 2. ファイル構成

```
src/app/salon/
├── page.tsx                  # 全セクションをまとめる
├── layout.tsx                # metadata, JSON-LD (HairSalon schema)
├── opengraph-image.tsx       # OG 画像 (中央 630x630 セーフ)
├── styles.css                # Salon サンプル専用 CSS 変数
└── legal/
    ├── privacy/page.tsx      # プライバシーポリシー (税理士流用)
    ├── terms/page.tsx        # 利用規約 (サンプルなので簡易)
    └── tokushoho/page.tsx    # 特商法 (サンプルなので簡易)

src/components/salon/
├── ui.tsx                    # Section / Eyebrow / Icon / Btn (税理士から流用 + 色差替)
├── SalonHeader.tsx           # 上部ナビ (常時アクセス可能な「ご予約」 disabled ボタン含む)
├── SalonFooter.tsx
├── SalonHero.tsx             # 01 Hero (テキスト主役)
├── SalonAbout.tsx            # 02 About (インテリア 4 枚正方形グリッド)
├── SalonStylists.tsx         # 03 Stylists (3 名横並び)
├── SalonMenu.tsx             # 04 Menu (カット ¥6,000〜)
├── SalonGallery.tsx          # 05 Gallery (Sanity 駆動、 正方形密集)
├── SalonVoice.tsx            # 06 Voice (お客様の声)
├── SalonAccess.tsx           # 07 Access
├── SalonFaq.tsx              # 08 FAQ (アコーディオン、 試行 #2 流用)
└── SalonContact.tsx          # 09 Contact (disabled + AI STUDIO CTA)

src/lib/salon-content.ts       # 全データ集約 (税理士 tax-content.ts と並列)

src/sanity/schemas/
└── salonWork.ts              # Sanity スキーマ (施術後写真ギャラリー用)
```

---

## 3. 各セクション詳細

### 01. Hero

**目的**: ファーストビューでブランド世界観を伝える、 lamune と同じ「テキスト主役」 構成。

**構成**:
- 左 (or 中央): ロゴ大「**& moi**」 (Cormorant Garamond)
- メインコピー (Hero コピー 案 2):
  ```
  住宅街の角、 ヴィンテージの椅子が並ぶ小さなサロン。
  窓辺のドライフラワー、 古い雑誌、 ゆるやかに流れるジャズ。
  ここに来る日は、 髪のためというより、 私のための時間。
  「& moi」 ── 「と私」 の、 ささやかな約束です。
  ```
- 背景画像: `/images/salon/hero.jpg` (店舗外観 or 入口、 16:9、 やわらかな自然光)
- 画像にオーバーレイ (rgba(250, 250, 248, 0.7)) でテキスト視認性確保
- セクション番号: `01 / HOME`

### 02. About (インテリア強調、 店主写真なし)

**目的**: 「インテリアこだわり」 を視覚で表現、 言葉以上に空間で伝える。

**構成**:
- セクション番号: `02 / ABOUT`
- 見出し: 「私たちのこと」 (h2、 Zen Kaku)
- リード文 (本文):
  ```
  & moi は、 武蔵小杉の住宅街にひそむ、 完全予約制の小さな美容室です。
  ヴィンテージの椅子、 窓辺のドライフラワー、 古い雑誌、 そして音量を絞ったジャズ。
  髪を整えるその時間に、 心まで少しだけ整うように。
  ── 私たちは、 そんな空間をつくりたいと考えています。
  ```
- **インテリア 4 枚 正方形グリッド** (2x2 グリッド、 各 aspect-square)
  - 1. `/images/salon/interior-1.jpg` (店内全景、 自然光、 ヴィンテージ家具)
  - 2. `/images/salon/interior-2.jpg` (セット面のクローズアップ、 鏡 + 道具)
  - 3. `/images/salon/interior-3.jpg` (ドライフラワー + 雑誌)
  - 4. `/images/salon/interior-4.jpg` (窓辺の植物 + ジャズが流れそうな雰囲気)

### 03. Stylists (スタッフ 3 名)

**目的**: 「親密さ」 と「専門性」 の両立。 lamune の構成を踏襲。

**構成**:
- セクション番号: `03 / STYLISTS`
- 見出し: 「スタッフ」
- 3 名横並びグリッド (`grid-cols-1 md:grid-cols-3 gap-8`)
- 各カード:
  - 顔写真 (`aspect-[4/5]`、 同一トーン、 自然光)
  - 役職: 「Stylist」 (英) or 「Owner Stylist」
  - 英名: 大文字、 DM Sans
  - 日本名: Zen Kaku Gothic New
  - プロフィール短文 (2-3 行)

**データ例** (`salon-content.ts`):
```ts
export const STYLISTS = [
  {
    role: "Owner Stylist",
    enName: "MARIKO YAMADA",
    jaName: "山田 真理子",
    image: "/images/salon/staff-1.jpg",
    profile: "都内大型サロン副店長を経て 2018 年に & moi を開店。 4D カット技術を提唱し、 一人一人の骨格と髪質に寄り添うカットを大切にしています。",
  },
  {
    role: "Stylist",
    enName: "AIKA SUZUKI",
    jaName: "鈴木 愛佳",
    image: "/images/salon/staff-2.jpg",
    profile: "オーガニックカラー専門、 ハーブの香りに包まれる時間を提案します。 趣味は陶芸とコーヒー。",
  },
  {
    role: "Stylist",
    enName: "YUTO TANAKA",
    jaName: "田中 悠人",
    image: "/images/salon/staff-3.jpg",
    profile: "メンズカット・ショートカット得意、 ナチュラルで再現性のあるスタイルを心がけています。",
  },
];
```

### 04. Menu

**目的**: 「カット ¥6,000〜」 の幅表現で「庶民的だけど上質」 を伝える。

**構成**:
- セクション番号: `04 / MENU`
- 見出し: 「メニュー」
- カテゴリ別 4 ブロック (CUT / COLOR / TREATMENT / SPA)
- 各ブロック:
  - 英タイトル (DM Sans 大)
  - 日タイトル (Zen Kaku)
  - メニュー一覧 (各行: メニュー名 ─── 価格)
  - 注釈 (「シャンプー / ブロー込」 等)

**データ例**:
```ts
export const MENU = [
  {
    en: "CUT",
    ja: "カット",
    items: [
      { name: "カット", price: "¥6,000〜" },
      { name: "前髪カット", price: "¥1,500〜" },
      { name: "メンズカット", price: "¥5,500〜" },
    ],
    note: "シャンプー / ブロー込",
  },
  {
    en: "COLOR",
    ja: "カラー",
    items: [
      { name: "リタッチ", price: "¥6,500〜" },
      { name: "フルカラー", price: "¥8,500〜" },
      { name: "デザインカラー", price: "¥10,500〜" },
      { name: "オーガニックカラー", price: "¥11,000〜" },
    ],
    note: "ロング料金 +¥1,000",
  },
  {
    en: "TREATMENT",
    ja: "トリートメント",
    items: [
      { name: "基本トリートメント", price: "¥3,000〜" },
      { name: "オーガニックトリートメント", price: "¥4,500〜" },
      { name: "髪質改善トリートメント", price: "¥6,000〜" },
    ],
    note: "",
  },
  {
    en: "SPA",
    ja: "ヘッドスパ",
    items: [
      { name: "リラックスヘッドスパ 30 分", price: "¥4,000" },
      { name: "リラックスヘッドスパ 60 分", price: "¥7,000" },
    ],
    note: "ジャズの中、 ゆっくりと",
  },
];
```

### 05. Gallery (施術後写真のみ)

**目的**: 「上手なサロン」 の証拠。 ビフォー不要、 仕上がりだけで魅せる。

**構成**:
- セクション番号: `05 / GALLERY`
- 見出し: 「Gallery」 / 「これまでの仕上がり」
- 正方形サムネイル密集グリッド (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2`、 12-16 枚)
- 各画像: `aspect-square`、 `object-cover`、 hover で淡く明るく
- データソース: **Sanity の `salonWork` スキーマ** (env 未設定時はハードコード fallback)
- 各画像 click で詳細モーダル (任意、 試行 #3 では省略可)

### 06. Voice (お客様の声)

**目的**: 「親しまれてる感」 を出す、 信頼性補完。

**構成**:
- セクション番号: `06 / VOICE`
- 見出し: 「お客様の声」
- 3-5 件のレビューカード (横スクロール or 縦 stack)
- 各カード:
  - レビュー本文 (引用風、 セリフフォント)
  - 客層属性 (例: 「34歳 / 会社員 / 武蔵小杉在住」)
  - 来店歴 (例: 「来店歴 2 年」)

**データ例**:
```ts
export const VOICES = [
  {
    quote: "「ここでカットしてもらった日は、 帰ってからずっと鏡を見ています。 髪が軽くなると気持ちも軽くなる、 そんなサロンです。」",
    profile: "34歳 / 会社員 / 武蔵小杉在住",
    history: "来店歴 2 年",
  },
  // ... 他 4 件
];
```

### 07. Access ⭐ Google Map 統合 (強調機能 #4)

**目的**: 「行きやすそう」 と感じさせる + SAMPLES_PLAN.md の強調機能 ④ Google Map を実装。

**構成**:
- セクション番号: `07 / ACCESS`
- 見出し: 「Access」
- 上段: 住所 + 電話 + 営業時間 + 定休日 + 外観写真 1 枚 (`/images/salon/exterior.jpg`)
- 下段: **Google Map iframe (横幅 100%、 高さ 400-500px)**
  - 武蔵小杉駅周辺の地図 (architcureural 住所は架空、 表示は駅周辺中心)
  - embed URL は Google Maps「共有」→「地図を埋め込む」 で取得
  - レスポンシブ対応 (`aspect-[16/9]` ラッパー)

**データ例**:
```ts
export const ACCESS = {
  address: "神奈川県川崎市中原区小杉町 X-X-X 1F",
  station: "JR 南武線 / 東急東横線「武蔵小杉駅」 徒歩 7 分",
  phone: "044-1234-5678",
  hours: "10:00 - 19:00 (最終受付 17:30)",
  closed: "月曜日 / 第 3 火曜日",
  // 武蔵小杉駅周辺、 zoom 16 程度、 architectural 住所は架空のため駅中心
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.123!2d139.659!3d35.576!2m3...",
};
```

**注意**:
- 実 embed URL は CLI 自走中に Google Maps から取得 or プレースホルダで実装し、 後で差し替え可能に
- iframe は loading="lazy", referrerPolicy="no-referrer-when-downgrade", allowFullScreen で実装

### 08. FAQ

**目的**: 不安を取り除く、 試行 #2 の TaxFaqAccordion を流用。

**構成**:
- セクション番号: `08 / FAQ`
- アコーディオン UI
- 質問例:
  - 「予約はどうやってすればいいですか?」
  - 「キャンセルは何日前まで OK?」
  - 「子連れで行ってもいいですか?」
  - 「駐車場はありますか?」
  - 「初めてですが大丈夫?」
  - 「クレジットカードは使えますか?」

### 08-2. LINE バナー (Footer に組み込み) ⭐ 強調機能 #2

**目的**: SAMPLES_PLAN.md の強調機能 ② LINE 公式アカウント連携を実装。

**構成**:
- Footer の上部 (Contact の上 or Footer 内 1 段目) に LINE バナー
- レイアウト:
  ```
  [LINE 緑バナー 全幅]
   左: 「LINE でお気軽にご連絡を」 + 説明文 「ご予約・お問い合わせ・スタイル相談まで」
   右: QR コード画像 (placeholder) + 「友だち追加」 ボタン
  ```
- カラー: LINE 公式緑 (`#06C755`) + ホワイトテキスト
- ボタンの挙動: **サンプル誘導モード** (disabled or click で「サンプル表示のため LINE 登録できません、 AI STUDIO へ」)
- QR コード: placeholder (`/images/salon/sample-line-qr.png` プレースホルダ画像 or `<div>` でグレー枠)

**実装例**:
```tsx
<section className="bg-[#06C755] py-12 md:py-16">
  <div className="container grid md:grid-cols-2 gap-8 items-center">
    <div className="text-white">
      <p className="font-mincho text-[24px] md:text-[32px]">LINE でお気軽にご連絡を</p>
      <p className="jp text-[14px] mt-3 opacity-90">ご予約・お問い合わせ・スタイル相談まで、 LINE でお気軽にどうぞ。</p>
      <button
        type="button"
        disabled
        className="mt-6 bg-white text-[#06C755] px-8 py-3 font-bold opacity-70 cursor-not-allowed"
      >
        ※ サンプル表示のため LINE 登録不可
      </button>
    </div>
    <div className="flex justify-center">
      {/* QR コード placeholder */}
      <div className="w-40 h-40 bg-white/10 border-2 border-white/30 flex items-center justify-center text-white/50 text-sm">
        QR Code<br/>(sample)
      </div>
    </div>
  </div>
</section>
```

---

### 09. Contact (サンプル誘導型)

**目的**: setup-sample-demo-mode 適用、 試行 #2 と同じ仕様。

**構成**:
- セクション番号: `09 / CONTACT`
- 警告バナー: 「📌 このサイトは zuk-zuk AI STUDIO のサンプルです」
- フォーム UI (disabled): お名前 / メールアドレス / 電話 / ご希望日時 / ご相談内容
- 送信ボタン: 「サンプル表示のため送信できません」
- 下部 CTA: 「zuk-zuk AI STUDIO で相談する →」

---

## 4. ナビゲーション (Header)

```
[& moi (ロゴ)]    01.HOME / 02.ABOUT / 03.STYLISTS / 04.MENU / 05.GALLERY / 06.VOICE / 07.ACCESS    [ご予約 (disabled)]
```

- スクロール時、 ヘッダーは固定 (sticky)
- 「ご予約」 ボタンは常時表示、 ただし disabled (Contact セクションへスクロール or AI STUDIO に飛ばす選択肢あり、 推奨: スクロール → Contact)

---

## 5. Sanity スキーマ (`salonWork`)

```ts
// src/sanity/schemas/salonWork.ts
import { defineField, defineType } from "sanity";

export const salonWork = defineType({
  name: "salonWork",
  title: "施術事例",
  type: "document",
  fields: [
    defineField({ name: "title", title: "タイトル", type: "string", validation: r => r.required() }),
    defineField({ name: "category", title: "カテゴリ", type: "string", options: { list: ["cut", "color", "perm", "treatment"] } }),
    defineField({ name: "image", title: "施術後の写真", type: "image", validation: r => r.required(), options: { hotspot: true } }),
    defineField({ name: "stylistName", title: "担当スタイリスト名", type: "string" }),
    defineField({ name: "order", title: "表示順 (小さいほど上)", type: "number" }),
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "category" },
  },
});
```

`src/sanity/structure.ts` で Studio に表示。

---

## 6. OG 画像 (正方形セーフ必須)

`src/app/salon/opengraph-image.tsx`:
- 中央 630x630 セーフエリアに集約
- 内容: 「& moi」 ロゴ大 + サブタイトル「Hair Salon. Musashi-Kosugi.」 + 統計 (営業年数 / 価格レンジ 等は控えめ)
- カラー: `#FAFAF8` (Main BG) + `#5A4E3F` (Accent)
- 詳細は `setup-seo-ogp` Skill 参照

---

## 7. 完成イメージ・トーン (5 つのチェックポイント)

- [ ] **lamune-kyoto.com を見たとき → & moi も見たとき**、 同種の落ち着き・親密感がある
- [ ] スマホで見たとき、 写真の正方形グリッドが綺麗に整列
- [ ] OG 画像は LINE / Slack でも左右切れない (中央 630x630 セーフ)
- [ ] 「庶民的だけどインテリアこだわり」 が伝わる (高級感が出すぎていない)
- [ ] 「30-40代女性が通いやすい」 雰囲気 (若すぎず大人すぎず)

---

## 8. 実装フロー (CLI 自走想定)

詳細は `night-run-003.md` 参照。 概要:

```
Phase A: ディレクトリ + 依存 (~30 分)
Phase B: 全 9 セクション + Header/Footer 実装 (~3-4h)
Phase C: Sanity 連動 (salonWork スキーマ + Gallery) (~1h)
Phase D: SEO/OGP/法務ページ (~1h)
Phase E: 動作確認 + 微調整 (~30 分)
```

合計想定 6-8 時間 (CLI 夜間自走、 acceptEdits + caffeinate -i)

---

## 9. 関連リソース

- ヒアリング: `sample-salon-hearing.md`
- 画像要件: `../../docs/IMAGE-REQUESTS-SALON.md`
- CLI 自走 Plan: `night-run-003.md`
- 業務ルール正典: `../../../zuk-zuk-ai-studio/docs/CLIENT_PROJECT_FLOW.md`
- Skill:
  - `../../../zuk-zuk-template/.claude/skills/setup-image-workflow.md`
  - `../../../zuk-zuk-template/.claude/skills/setup-seo-ogp.md`
  - `../../../zuk-zuk-template/.claude/skills/setup-sanity-cms.md`
  - `../../.claude/skills/setup-sample-demo-mode.md`
