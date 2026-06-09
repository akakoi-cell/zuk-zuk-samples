---
name: setup-sample-demo-mode
description: zuk-zuk-samples (業種別サンプルサイト) で「サンプル誘導型 UI」 を実装するための標準パターン。 Contact フォーム / Stripe 決済ボタン / その他 SaaS 連動機能を disabled + サンプル警告バナー + zuk-zuk AI STUDIO 誘導 CTA に置き換える。 「サンプルだからフォーム送信は不要」「美容室サンプル作る」「EC サンプル作る」「歯科サンプル作る」「スクールサンプル作る」「飲食店サンプル作る」「AI STUDIO 誘導 CTA 入れたい」「フォーム disabled」「サンプル警告バナー」「誤送信防止」「公開デモで誤送信されたら困る」 等の発言があったら必ず使う。 zuk-zuk-template (本番案件用) には適用しない。
---

# サンプル誘導モード (zuk-zuk-samples 専用)

samples.zuk-zuk.com は公開デモサイト。 訪問者が「動くか試そう」 と Contact フォーム送信 / Stripe 決済を実行する可能性がある。 これを防ぐ + AI STUDIO への営業動線として転用するための標準パターン。

## 適用対象

- ✅ **zuk-zuk-samples 配下の全サンプル** (税理士 / 美容室 / EC / 歯科 / スクール / 飲食店)
- ❌ zuk-zuk-template (本番案件用、 フォーム動作させる)
- ❌ zuk-zuk-ai-studio 本体 (本番運用)

## 3 つの構成要素

### 1. サンプル警告バナー (Contact セクション最上部)
- 視覚: ゴールド枠 + 📌 マーク
- 内容:
  - 「このサイトは zuk-zuk AI STUDIO のサンプルです」
  - 「[業種事業者名] は架空のデモ事務所です」
  - 「サイト制作のご相談は zuk-zuk AI STUDIO までお願いいたします」 + リンク

### 2. フォーム / 決済ボタン disabled
- 全 `<input>` / `<select>` / `<textarea>` / `<checkbox>` / `<button>` を `disabled`
- ボタンラベルを「サンプル表示のため送信できません」 等の文言に変更
- フォーム自体に `onSubmit={(e) => e.preventDefault()}` + `aria-disabled="true"`
- opacity 60-70% で視覚的にも非操作を示す

### 3. AI STUDIO 誘導 CTA (フォーム下部 / 決済ボタン横)
- 大きなゴールドボタン: 「zuk-zuk AI STUDIO で相談する →」
- リンク先: `https://ai-studio.zuk-zuk.com#contact`
- `target="_blank" rel="noopener noreferrer"`
- アイコン: 右上矢印 (外部リンクを示唆)

## 定数

```tsx
const AI_STUDIO_URL = "https://ai-studio.zuk-zuk.com";
```

全コンポーネントの先頭に定義。 全 6 サンプルで統一。

## 実装パターン (Contact 系)

```tsx
"use client";

const AI_STUDIO_URL = "https://ai-studio.zuk-zuk.com";

export function SampleContact() {
  return (
    <Section id="contact">
      {/* (左カラム: 見出し / 連絡先表示はそのまま) */}

      <div className="md:col-span-7">
        {/* 1. サンプル警告バナー */}
        <div className="mb-5 border border-gold/50 bg-gold/[0.08] p-5">
          <p className="font-mincho text-[15px] text-gold-light flex items-start gap-2">
            <span aria-hidden>📌</span>
            <span>このサイトは <strong>zuk-zuk AI STUDIO</strong> のサンプルです</span>
          </p>
          <p className="jp text-[13px] text-navy-100/85 mt-2 leading-relaxed">
            [事業者名] は架空のデモ事業者です。 サイト制作のご相談は、
            <a href={AI_STUDIO_URL} target="_blank" rel="noopener noreferrer"
               className="text-gold-light underline underline-offset-2 hover:text-gold mx-1">
              zuk-zuk AI STUDIO
            </a>
            までお願いいたします。
          </p>
        </div>

        <div className="surf border border-white/15 bg-white/[0.02] p-6 md:p-9">
          {/* 2. フォーム UI (見た目のみ、 送信不可) */}
          <form onSubmit={(e) => e.preventDefault()} aria-disabled="true" className="grid grid-cols-2 gap-5">
            <input name="name" disabled className="... disabled:opacity-70" placeholder="お名前" />
            {/* ... 他のフィールド全部 disabled */}
            <button type="button" disabled className="w-full opacity-60 pointer-events-none">
              サンプル表示のため送信できません
            </button>
          </form>

          {/* 3. AI STUDIO 誘導 CTA */}
          <div className="mt-7 pt-7 border-t border-white/10">
            <p className="font-zen text-[13px] text-navy-100/70 text-center mb-4">
              実際にサイト制作をご相談されたい方は、 こちらへ
            </p>
            <a href={`${AI_STUDIO_URL}#contact`} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center gap-3 bg-gold text-navy-900 font-mincho text-[16px] py-4 hover:bg-gold-light transition-colors group">
              <span>zuk-zuk AI STUDIO で相談する</span>
              <Icon name="arrowUR" className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

## 実装パターン (決済ボタン系)

```tsx
"use client";

const AI_STUDIO_URL = "https://ai-studio.zuk-zuk.com";

export function SampleStripeButton() {
  return (
    <div className="mt-4">
      <button type="button" disabled aria-disabled
              className="inline-flex items-center gap-2 font-dm text-[13px] tracking-wide border border-gold/30 px-5 py-2.5 opacity-60 cursor-not-allowed">
        [料金表示]を予約・決済する
        <Icon name="arrowUR" className="w-4 h-4" />
      </button>
      <p className="text-[11px] text-ink-400 mt-2">
        ※ <strong>サンプル表示のため決済機能は無効</strong>です。 実際のご相談は
        <a href={`${AI_STUDIO_URL}#contact`} target="_blank" rel="noopener noreferrer"
           className="text-gold underline underline-offset-2 hover:text-gold-dark mx-1">
          zuk-zuk AI STUDIO
        </a>
        までどうぞ。
      </p>
    </div>
  );
}
```

## 既知の罠 (Pitfalls)

### ❌ env (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` 等) に依存した条件分岐
- 「env があれば本物動作、 無ければサンプル」 にすると user が誤って本番 env を入れた時にフォーム動作してしまう
- → **常にサンプル仕様** にハードコード (samples リポジトリ全体の前提)

### ❌ AI STUDIO URL のハードコード分散
- 各コンポーネントで `"https://ai-studio.zuk-zuk.com"` を直書きすると、 ドメイン変更時に漏れる
- → ファイル先頭に `const AI_STUDIO_URL = "..."` で定数化

### ❌ 警告バナーの文言が各サンプルでバラバラ
- 「ここは見本です」 / 「デモサイトです」 / 「サンプルサイト」 で揺れる
- → 全 6 サンプル共通の文言テンプレート (上記コード参照)

### ❌ フォームの一部だけ disabled (心理的に「動く」 と誤認させる)
- 例: 入力欄は disabled、 ボタンだけ active のままで onClick 何もしない → 訪問者が「壊れてる」 と思う
- → **全 input + ボタン両方 disabled**、 明示的に「無効」 と分かるように

### ❌ AI STUDIO CTA を小さく目立たないように配置
- 「営業色出したくない」 と CTA を小さくすると営業動線として機能しない
- → **目立つゴールド枠 + 大きめフォント + 矢印アイコン** で「次のアクション」 と明示

## 6 サンプル別の文言バリエーション

| サンプル | バナー文言 (架空事業者の表現) |
|---|---|
| 税理士 (#67) | みらい税理士事務所は架空のデモ事務所です |
| 美容室 (#68) | このサロンは架空のデモサロンです |
| スクール (#69) | このスクールは架空のデモスクールです |
| EC (#70) | このショップは架空のデモショップです |
| 歯科 (#71) | このクリニックは架空のデモクリニックです |
| 飲食店 (#72) | この店舗は架空のデモ店舗です |

## 検証方法 (実装後)

```js
// preview_eval で確認
(() => {
  const contact = document.querySelector('#contact');
  return {
    bannerFound: !!contact.querySelector('[class*="gold"]'),
    aiStudioLinks: [...contact.querySelectorAll('a')].filter(a => a.href.includes('ai-studio.zuk-zuk.com')).length,
    disabledElements: contact.querySelectorAll('input[disabled], button[disabled]').length,
  };
})()
```

期待値:
- `bannerFound: true`
- `aiStudioLinks: 2` (バナー + CTA)
- `disabledElements: 6+` (input × 5 + button、 セクション構成により変動)

## 関連 Skill / ドキュメント

- `setup-image-workflow` (画像主体サンプルでの画像配置)
- `setup-sanity-cms` (サンプルで唯一本物連動する CMS)
- `docs/ENV-SETUP-GUIDE.md` (サンプル運用方針セクション参照)

## 改訂履歴

- 2026-06-09: 初版 (税理士サンプル #67 で実装パターン確立、 残り 5 サンプルで使い回す)
