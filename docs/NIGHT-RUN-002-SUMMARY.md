# 夜間自走 #2 サマリー — 税理士サイト本格実装 (Phase D–K)

> 実行: Claude Code (CLI)。main ブランチに 9 コミット。**push は未実施**（朝レビュー後に判断）。

## 完遂状況: Phase D–K すべて実装完了 ✅

| Phase | 内容 | 状態 |
|---|---|---|
| D | 案件初期化 | ✅ 事前準備済み（スキップ）|
| E-1〜4 | ルーティング / パレット / フォント / 全セクション TSX 化 | ✅ 完了 |
| F | Sanity CMS（Works / Column） | ✅ スキーマ + fetch + フォールバック |
| G | Web3Forms（Contact 3 タブ） | ✅ 送信ロジック + hCaptcha + honeypot |
| H | SEO / OGP / JSON-LD / 法務 3 ページ | ✅ 完了 |
| I | Vercel デプロイ | ✅ 準備完了（手順書 `docs/DEPLOY.md`、デプロイ自体は人間作業）|
| J | Stripe 単発決済（¥5,000） | ✅ Checkout + 成功ページ |
| K | Slack 通知 | ✅ Contact + Stripe webhook |

## ビルド / 動作確認

- `npm run build` 成功（TypeScript エラーゼロ、Turbopack）
- ルート 14 個生成: `/tax`、法務 3、`/tax/checkout/success`、`/studio`、OG 画像、sitemap、robots、API 3
- dev で全ルート 200 / 全 10 セクション描画を確認

## 実装の要点 / 設計判断

- **採用カンプ = 案A 王道エディトリアル**（formal トーン）。Tweaks パネル・案切替・ライブテーマは production では除去。
- **Tailwind トークンは未プレフィックス**（`navy`/`gold`/`ink`/`ivory`/`paper`/`line`）で `@theme` 定義。Claude Design の className をほぼ verbatim に移植し、視覚再現性を最優先（プラン例の `tax-*` プレフィックスからは意図的に変更）。テンプレ既存の `/` には影響なし（名前衝突なし）。
- **next/font 5 書体**を `@theme inline` で Tailwind の font ユーティリティに橋渡し。`.tax-root` でテンプレ body の字間・行間をリセット。
- **env 未設定でも完全動作**（夜間自走の前提）:
  - Sanity 未設定 → `tax-content.ts` のハードコードデータにフォールバック
  - Web3Forms 未設定 → フォーム「準備中」表示
  - Stripe 未設定 → API 503「準備中」、ボタンはエラーメッセージ表示
  - Slack 未設定 → 静かに no-op

## Next.js 16 で踏んだブレイキングチェンジ（AGENTS.md の警告どおり）

- **`"use client"` ファイルから `metadata` を export 不可** → Sanity Studio を Server（metadata）+ Client（NextStudio）に分離して解決。
- `@sanity/image-url` の型 import パスが変更 → `@sanity/image-url` 本体から `SanityImageSource` を named import。

## FaqAccordion について（プランとの差分）

- プランは「zuk-zuk-template の FaqAccordion を使う」と指示。template 版はモノクロのテンプレ CSS 依存で navy/gold の世界観に合わないため、**Claude Design 準拠の `TaxFaqAccordion`（client）を新規作成**。視覚再現性を優先。

## 朝レビューでやること（人間作業）

1. `PORT=3004 npm run dev` → http://localhost:3004/tax/ で目視確認（`docs/DEPLOY.md` の本番化チェックも参照）
2. OK なら `git push origin main`
3. Vercel プロジェクト作成 + env 登録 + DNS（`docs/DEPLOY.md`）
4. 各 SaaS の env を取得して `.env.local` / Vercel に登録（Sanity / Web3Forms / Stripe / Slack）

## 残課題 / 将来タスク

- Sanity の seed スクリプト（`scripts/seed-sanity.ts`）は未作成（env が来てから）。
- Column / Works の詳細ページ（`/tax/column/[slug]` 等）は未実装（設計書のページ構成では将来展開）。
- OG 画像は CJK フォント未読込のため欧文構成。和文 OG が必要なら JP woff を `ImageResponse` に読み込む拡張が必要。
- `npm audit`: 18 moderate（主に sanity 依存）。本番前に精査。
