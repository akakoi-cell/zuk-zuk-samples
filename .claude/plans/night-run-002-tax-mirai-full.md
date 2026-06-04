# 夜間自走 試行 #2: 税理士サイト本格実装 (Phase D-K)

## 🎯 目的

サンプル①「みらい税理士事務所」(税理士事務所) を、Claude Design のカンプを元に **Next.js 16 + TypeScript + Tailwind v4** で本格実装する。samples.zuk-zuk.com/tax/ で公開可能なレベルまで完成させる。

---

## 📋 前提条件 (✅ 準備済み)

| 項目 | 状態 |
|---|---|
| **作業ディレクトリ** | `/Users/kakoiatsushi/Projects/zuk-zuk AI DESIGN STUDIO/zuk-zuk-samples/` ✅ |
| **GitHub リポジトリ** | https://github.com/akakoi-cell/zuk-zuk-samples (public) ✅ |
| **テンプレからの clone** | zuk-zuk-template から派生済み ✅ |
| **依存インストール** | npm install 済み ✅ |
| **設計書** | `.claude/plans/sample-tax-design-brief.md` ✅ |
| **ヒアリング結果** | `.claude/plans/sample-tax-hearing.md` ✅ |
| **Claude Design パッケージ** | `../zuk-zuk-experiments/tax-claude-design/mirai-tax/` ✅ |
| **筆頭 5 Skill** | `.claude/skills/setup-*.md` (5 個) ✅ |

---

## 🚀 起動コマンド (CLI 版 Claude Code)

```bash
# 1. 作業ディレクトリへ
cd "/Users/kakoiatsushi/Projects/zuk-zuk AI DESIGN STUDIO/zuk-zuk-samples"

# 2. スリープ阻止しつつ claude 起動
caffeinate -i claude --permission-mode acceptEdits

# 3. 最初のプロンプトでこう入力:
```

最初のプロンプト (CLI に貼り付け):
```
.claude/plans/night-run-002-tax-mirai-full.md を読んで、Phase D から Phase K まで順番に実装してください。

参照素材:
- 設計書: .claude/plans/sample-tax-design-brief.md
- ヒアリング: .claude/plans/sample-tax-hearing.md
- Claude Design パッケージ: ../zuk-zuk-experiments/tax-claude-design/mirai-tax/
- 筆頭 5 Skill: .claude/skills/

実装方針:
- Claude Design の JSX をベースに TSX に変換、Next.js 16 App Router に組み込み
- src/app/tax/ 配下に税理士サイトを実装
- セクションごとに git commit
- main ブランチで作業 (新規プロジェクトなので)
- 完了したらまとめて push せず一時停止 (朝レビュー後 push 判断)
- エラー時は plans の「エラー時の対処ルール」に従う
```

---

## ✅ 実装ステップ

### Phase D: 案件初期化 — ✅ 完了済み (人間が事前準備)

スキップして OK。 リポジトリ・依存・設計書はすべて揃っている。

---

### Phase E-1: ルーティング構造の準備

#### Step 1.1: src/app/tax/ ディレクトリ作成

```bash
mkdir -p src/app/tax
```

#### Step 1.2: src/app/page.tsx (サンプル一覧トップ) は **後回し**

今回は税理士サイト #67 だけ実装。トップは将来別タスクで実装。

`src/app/tax/page.tsx` が `samples.zuk-zuk.com/tax/` のエントリポイント。

#### Step 1.3: lib/content.ts を税理士サンプル用に拡張

`src/lib/content.ts` を編集して `TAX_SITE` 定数を追加:

```typescript
export const TAX_SITE = {
  name: "みらい税理士事務所",
  tagline: "賃貸経営の「手取り」を、最大化する。",
  description: "不動産オーナー専門の若手税理士が運営。個人 → 資産管理会社化までワンストップ。クラウド完結で全国対応。",
  url: "https://samples.zuk-zuk.com/tax",
  nav: [
    { id: "service", label: "Service", jp: "サービス" },
    { id: "whyus", label: "Why us", jp: "選ばれる理由" },
    { id: "works", label: "Works", jp: "事例" },
    { id: "column", label: "Column", jp: "コラム" },
    { id: "about", label: "About", jp: "代表挨拶" },
    { id: "faq", label: "FAQ", jp: "よくあるご質問" },
    { id: "contact", label: "Contact", jp: "お問い合わせ" },
  ],
  stats: [
    { label: "不動産オーナー特化", value: "75", unit: "%", desc: "顧問先の80社中60社が不動産オーナー" },
    { label: "法人化支援実績", value: "30", unit: "件以上", desc: "個人から資産管理会社への移行を完結" },
    { label: "クラウド対応", value: "100", unit: "%", desc: "Zoom × freee / MFで全国どこでも完結" },
  ],
  // 必要に応じて concerns / pillars / services / works / column / faq / voice 等の配列を追加
} as const;
```

詳細は `Claude Design パッケージ/App.jsx` を読んで、ハードコードされたデータを抜き出す。

**完了判定**:
- [ ] `src/app/tax/` ディレクトリが存在
- [ ] `src/lib/content.ts` に `TAX_SITE` が定義され、 nav / stats 等を含む
- [ ] git commit: `feat(tax): scaffold /tax/ route + content data`

---

### Phase E-2: Tailwind v4 カラートークン定義

`src/app/globals.css` の `:root` に税理士サイト用のカラーを追加 (既存のテンプレ用変数の後ろに追記):

```css
/* ---------- Tax site palette (navy + gold) ---------- */
:root {
  --tax-navy:      26 43 74;   /* #1A2B4A (RGB triplet) */
  --tax-navy-950:  15 25 43;
  --tax-navy-900:  20 33 60;
  --tax-navy-800:  35 58 99;
  --tax-navy-700:  60 82 121;
  --tax-navy-600:  100 116 152;
  --tax-navy-500:  139 151 171;
  --tax-navy-100:  220 226 235;
  --tax-navy-50:   244 246 250;

  --tax-gold:        201 169 97;
  --tax-gold-dark:   181 149 80;
  --tax-gold-deep:   140 108 50;
  --tax-gold-light:  220 200 140;
  --tax-gold-tint:   244 236 215;

  --tax-ivory: #F6F3EC;
  --tax-paper: #FBFAF6;
  --tax-line:  #E4E0D5;
  --tax-ink:   #1A2B4A;
  --tax-ink-600: #54607A;
  --tax-ink-400: #8B93A6;
}
```

Tailwind v4 では JS config 不要、 `@theme` ディレクティブで定義:

```css
@theme {
  --color-tax-navy: rgb(var(--tax-navy) / <alpha-value>);
  --color-tax-navy-950: rgb(var(--tax-navy-950) / <alpha-value>);
  /* ... 同様に全変数 ... */

  --font-mincho: "Shippori Mincho B1", serif;
  --font-zen: "Zen Kaku Gothic New", sans-serif;
  --font-dm: "DM Sans", "Zen Kaku Gothic New", sans-serif;
  --font-inst: "Instrument Serif", serif;
  --font-mono-jp: "JetBrains Mono", monospace;
}
```

これで Tailwind から `text-tax-navy` `bg-tax-gold` `font-mincho` 等が使える。

**完了判定**:
- [ ] `globals.css` に navy/gold/ivory/paper/line のカラートークン定義
- [ ] `@theme` で Tailwind v4 から参照可能
- [ ] git commit: `feat(tax): add navy/gold palette + Mincho font tokens`

---

### Phase E-3: Google Fonts を next/font に

`src/app/layout.tsx` (もしくは tax 用の layout を作る) に next/font を追加:

```typescript
import { Shippori_Mincho_B1, Zen_Kaku_Gothic_New, DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const mincho = Shippori_Mincho_B1({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
// ... 他のフォントも同様
```

ただし、テンプレ用の layout は既存 (`src/app/layout.tsx` で Zen Kaku + Caveat)。
**税理士サイト用に別 layout を作る**: `src/app/tax/layout.tsx`

```typescript
// src/app/tax/layout.tsx
import { Shippori_Mincho_B1, Zen_Kaku_Gothic_New, DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "../globals.css"; // 既存の globals は共有

const mincho = Shippori_Mincho_B1({ variable: "--font-mincho", subsets: ["latin"], weight: ["400","500","600","700","800"], display: "swap" });
const zen = Zen_Kaku_Gothic_New({ variable: "--font-zen", subsets: ["latin"], weight: ["300","400","500","700","900"], display: "swap" });
const dm = DM_Sans({ variable: "--font-dm", subsets: ["latin"], display: "swap" });
const inst = Instrument_Serif({ variable: "--font-inst", subsets: ["latin"], weight: ["400"], display: "swap" });
const jb = JetBrains_Mono({ variable: "--font-mono-jp", subsets: ["latin"], weight: ["400","500"], display: "swap" });

export default function TaxLayout({ children }: { children: React.ReactNode }) {
  const fontClass = [mincho.variable, zen.variable, dm.variable, inst.variable, jb.variable].join(" ");
  return (
    <div className={fontClass + " font-dm bg-tax-paper text-tax-ink"} style={{ fontFeatureSettings: '"palt" 1, "kern" 1' }}>
      {children}
    </div>
  );
}
```

**完了判定**:
- [ ] `src/app/tax/layout.tsx` 作成
- [ ] 5 つのフォントが次世代 font 経由で読み込まれる
- [ ] git commit: `feat(tax): wire next/font for tax site`

---

### Phase E-4: コンポーネント変換 (Claude Design → Next.js TSX)

#### Step 4.1: Claude Design のソースを読む

```bash
# 必ず各ファイルを Read してから書き換える
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/App.jsx
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/Header.jsx
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/Hero.jsx
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/SectionsTop.jsx
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/SectionsMid.jsx
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/SectionsEnd.jsx
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/Footer.jsx
cat ../zuk-zuk-experiments/tax-claude-design/mirai-tax/ui.jsx
```

#### Step 4.2: コンポーネント別に TSX 化

配置先:
```
src/components/tax/
├── TaxHeader.tsx
├── TaxHero.tsx
├── TaxConcerns.tsx        ← SectionsTop.jsx の Concerns 部分
├── TaxWhyUs.tsx           ← SectionsTop.jsx の Why us 部分
├── TaxService.tsx         ← SectionsMid.jsx の Service 部分
├── TaxWorks.tsx           ← SectionsMid.jsx の Works 部分
├── TaxColumn.tsx          ← SectionsMid.jsx の Column 部分
├── TaxVoice.tsx           ← SectionsEnd.jsx の Voice 部分
├── TaxAbout.tsx           ← SectionsEnd.jsx の About 部分
├── TaxFaq.tsx             ← SectionsEnd.jsx の FAQ 部分 (zuk-zuk-template の FaqAccordion を使う)
├── TaxContact.tsx         ← SectionsEnd.jsx の Contact 部分
├── TaxFooter.tsx
└── ui.tsx                 ← Claude Design の ui.jsx を流用
```

**変換ルール**:
1. **JSX → TSX**: 型注釈追加 (Props を `type Props = {...}` で)
2. **className 内の色**: `bg-[#1A2B4A]` → `bg-tax-navy`、 `text-[#C9A961]` → `text-tax-gold`
3. **フォント**: `font-serif` → `font-mincho` or `font-inst` (見出しか引用かで使い分け)
4. **`tracking-loose`** (Tailwind 標準にない) → Tailwind v4 では `tracking-[0.04em]` 等の任意値で
5. **useState 等**: そのまま (React 19 で動く)
6. **画像参照**: Claude Design パッケージの _shots/ は使わず、後で OG 画像生成等で代替
7. **lucide-react など外部 lib**: 使わず、 SVG インライン or zuk-zuk-template の Icons.tsx を活用

#### Step 4.3: src/app/tax/page.tsx を組み立てる

```typescript
import { TaxHeader } from "@/components/tax/TaxHeader";
import { TaxHero } from "@/components/tax/TaxHero";
import { TaxConcerns } from "@/components/tax/TaxConcerns";
// ... 全部 import

export default function TaxPage() {
  return (
    <>
      <TaxHeader />
      <main>
        <TaxHero />
        <TaxConcerns />
        <TaxWhyUs />
        <TaxService />
        <TaxWorks />
        <TaxColumn />
        <TaxVoice />
        <TaxAbout />
        <TaxFaq />
        <TaxContact />
      </main>
      <TaxFooter />
    </>
  );
}
```

**コミット粒度**: コンポーネント 1〜2 個ごとに commit (例: `feat(tax): add TaxHeader + TaxHero`)

**完了判定**:
- [ ] 12 個のコンポーネントが `src/components/tax/` 配下に作成
- [ ] `src/app/tax/page.tsx` で全部使われている
- [ ] `npm run build` 成功 (TypeScript エラーゼロ)
- [ ] `npm run dev` で `http://localhost:3000/tax/` を見て **Claude Design のスクショとほぼ同じ見た目**

---

### Phase F: Sanity CMS (Works / Column 用)

Skill `setup-sanity-cms` を実行。

#### Step F.1: Sanity アカウント作成 + Project ID 取得

**人間の作業** (CLI では完遂不可、 user に依頼):
1. https://www.sanity.io/manage で新規 project 作成 (name: "zuk-zuk-samples-tax")
2. Project ID をコピー
3. `.env.local` に書き込む

CLI は env が無い間「Sanity 設定は user 待ち、 ハードコードデータで進行」と判断して進める。

#### Step F.2: スキーマ定義

`src/sanity/schemas/tax/`:
- `taxWork.ts` (解決事例)
- `taxColumn.ts` (お役立ち記事)

設計書 (sample-tax-design-brief.md セクション 6-5, 6-6) のフィールド構成参照。

#### Step F.3: TaxWorks / TaxColumn から Sanity を fetch

```typescript
// TaxWorks.tsx 内で
import { sanityClient } from "@/sanity/client";

async function getWorks() {
  return sanityClient.fetch(`*[_type == "taxWork"]| order(_createdAt desc)[0...3]{ ... }`,
    {}, { next: { revalidate: 60, tags: ["taxWork"] } });
}
```

**完了判定**:
- [ ] Sanity スキーマ 2 個定義 (taxWork / taxColumn)
- [ ] `/studio` で Sanity Studio が起動
- [ ] TaxWorks / TaxColumn が Sanity から fetch
- [ ] (env 未設定なら) フォールバックでハードコードデータを描画

---

### Phase G: Web3Forms (Contact フォーム)

Skill `setup-contact-form-web3forms` を実行。

#### Step G.1: env 設定

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=  # user が Web3Forms で取得
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=50b2fe65-b00b-4b9e-ad62-3ba471098be2
```

#### Step G.2: TaxContact コンポーネントに Web3Forms 連動

Claude Design の Contact セクションは静的フォーム → クライアント側 fetch で Web3Forms に POST する処理を追加。

タブ切替 (無料相談 / お見積もり / その他) は Claude Design の構造を維持。

**完了判定**:
- [ ] Contact フォーム送信が Web3Forms に届く
- [ ] hCaptcha が動く
- [ ] honeypot 実装済み

---

### Phase H: SEO + 法務

Skill `setup-seo-ogp` + `setup-legal-pages`。

#### Step H.1: metadata 整備

`src/app/tax/page.tsx` の隣に `metadata` export:

```typescript
export const metadata: Metadata = {
  title: "みらい税理士事務所",
  description: "賃貸経営の「手取り」を、最大化する。不動産オーナー特化の若手税理士。",
  openGraph: { ... },
  twitter: { ... },
};
```

#### Step H.2: 構造化データ (AccountingService)

設計書セクション 10 の JSON-LD を `src/app/tax/layout.tsx` に埋め込み。

#### Step H.3: 法務ページ (税理士事務所版に書き換え)

`src/app/tax/legal/terms/page.tsx` 等を作成。

**完了判定**:
- [ ] metadata / OG / JSON-LD すべて税理士サイト用
- [ ] `/tax/legal/terms` `/tax/legal/privacy` `/tax/legal/tokushoho` の 3 ページ

---

### Phase I: Vercel デプロイ

Skill `setup-vercel-deploy` を実行。

#### Step I.1: Vercel プロジェクト作成

**user の手作業**:
1. Vercel ダッシュボードで「Import」→ `zuk-zuk-samples` リポジトリ
2. 環境変数を登録
3. Deploy

#### Step I.2: カスタムドメイン

samples.zuk-zuk.com のサブドメインを Vercel に向ける (Squarespace DNS 設定)。

`/tax/` で税理士サイトにアクセスできる状態を確認。

**完了判定**:
- [ ] https://samples.zuk-zuk.com/tax/ で本番動作
- [ ] OGP / 構造化データが Rich Results Test 通過

---

### Phase J: Stripe 単発決済 (オプション、 余裕あれば)

設計書セクション 6-4 で言及した「初回相談料 ¥5,000」を Stripe Checkout 単発で実装。

Skill `setup-stripe-subscription` を参考に、 Checkout Session 単発版を `/api/checkout/single` で作成。

**完了判定**:
- [ ] スポット相談タブから「¥5,000 の決済へ」ボタン
- [ ] Stripe Checkout 経由で決済 → 完了ページ

---

### Phase K: Slack 通知 (オプション)

Skill `setup-slack-notifications` を実行。

Contact 送信 + Stripe Webhook → Slack 通知。

---

## 🚨 エラー時の対処ルール

| 状況 | 対処 |
|---|---|
| `npm run build` 失敗 | エラー読んで該当箇所修正、 30 分以上詰まったら現状 commit して停止 |
| TypeScript エラー | 型定義を緩めるか、 `as` で明示的キャスト (本番化前にきれいにする) |
| 画像が無い | `_shots/` のは使わず、 unsplash プレースホルダー or 空 div で代替 |
| Sanity env 未設定 | ハードコードデータで描画、 後で env が来たら fetch に切替 |
| Web3Forms env 未設定 | フォーム disabled 状態にして「準備中」表示 |
| Bash で permission 要求 | `--permission-mode acceptEdits` で実行している前提なら自動承認、 それ以外は停止して user 確認 |
| commit メッセージ判断 | プレフィックス: `feat(tax):` / `fix(tax):` / `chore:` / `docs:` |
| 30 分以上同じエラーで詰まる | 現状 commit してログ出力 `## 朝のレビュー時に確認 ##` で停止 |

---

## 🌅 朝のレビューチェックリスト

```bash
cd "/Users/kakoiatsushi/Projects/zuk-zuk AI DESIGN STUDIO/zuk-zuk-samples"
git log --oneline -30
PORT=3004 npm run dev
```

ブラウザで http://localhost:3004/tax/ を開いて確認:

- [ ] Hero (ネイビー + ゴールド、 数字 3 つ並び、 大胆タイポ)
- [ ] Concerns (お悩み 3 つカード)
- [ ] Why us (差別化 3 本柱)
- [ ] Service (3 タブ切替: 顧問契約 / 法人化 / スポット)
- [ ] Works (解決事例 3 件、 Sanity 連動 or ハードコード)
- [ ] Column (お役立ち記事 3 件)
- [ ] Voice (お客様の声)
- [ ] About (代表挨拶 + ネイビーパネル + プロフ)
- [ ] FAQ (アコーディオン、 zuk-zuk-template の FaqAccordion 使用)
- [ ] Contact (3 タブ、 Web3Forms 連動)
- [ ] Footer
- [ ] 全体的に Claude Design スクショと **同じ見た目** (色・余白・タイポのリズム)
- [ ] レスポンシブ崩れなし
- [ ] `npm run build` 成功
- [ ] git log で各 Phase ごとに commit がある (15-30 件想定)

**合格ライン**: 上記 14 項目中 10 項目以上 OK

---

## 📊 朝のあとに記入

- 完遂 Phase 数: __ / 7 (D-K)
- 想定時間 vs 実時間: 30-40h → ?
- 詰まった点:
- 良かった点:
- 次のアクション (push する? main マージ?):

---

## 📦 参照素材まとめ

| 素材 | 場所 | 用途 |
|---|---|---|
| 設計書 | `.claude/plans/sample-tax-design-brief.md` | 全体要件 |
| ヒアリング | `.claude/plans/sample-tax-hearing.md` | クライアント情報 |
| Claude Design パッケージ | `../zuk-zuk-experiments/tax-claude-design/mirai-tax/` | ビジュアルリファレンス + JSX ソース |
| 筆頭 5 Skill | `.claude/skills/setup-*.md` | Phase F-I で参照 |
| zuk-zuk-template の README | `../zuk-zuk-template/README.md` | テンプレ構造の理解 |
