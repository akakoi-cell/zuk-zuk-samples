# デプロイ手順 — みらい税理士事務所 (サンプル #67)

> 公開先: **https://samples.zuk-zuk.com/tax/**
> リポジトリ: https://github.com/akakoi-cell/zuk-zuk-samples
> CLI 側で完結できない人間作業（Vercel プロジェクト作成・env 登録・DNS）をまとめる。

## 0. 事前確認（CLI 側で済んでいること）

- [x] `npm run build` がローカルで成功（全ルート静的生成）
- [x] `/tax` トップ + 法務 3 ページ + `/studio` + `sitemap.xml` / `robots.txt` / OG 画像
- [x] env 未設定でも動作（Sanity→ハードコード, Web3Forms→「準備中」）
- [x] main ブランチにコミット済み（push は朝レビュー後に判断）

## 1. push（レビュー後）

```bash
git push origin main
```

## 2. Vercel プロジェクト作成

1. https://vercel.com/dashboard → Add New → Project
2. `akakoi-cell/zuk-zuk-samples` を Import
3. Framework: Next.js（自動検出）。Build 設定は変更不要
4. 環境変数を登録（下表、Production + Preview 両方）→ Deploy

## 3. 環境変数（`.env.local.example` 参照）

| 変数 | 必須 | 値 / 取得元 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://samples.zuk-zuk.com`（末尾 / なし）|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | 任意 | Sanity Manage の Project ID（未設定ならハードコード描画）|
| `NEXT_PUBLIC_SANITY_DATASET` | 任意 | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | 任意 | `2024-01-01` |
| `SANITY_API_WRITE_TOKEN` | 任意 | seed 用（`NEXT_PUBLIC_` を付けない）|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | 任意 | Web3Forms で受信メール登録 → 発行（未設定ならフォーム準備中）|
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | 任意 | 固定: `50b2fe65-b00b-4b9e-ad62-3ba471098be2` |
| `SLACK_WEBHOOK_URL` | 任意 | Phase K（Slack 通知）|
| `STRIPE_*` | 任意 | Phase J（単発決済）|

> ⚠️ `NEXT_PUBLIC_SITE_URL` は OGP / sitemap / canonical / JSON-LD で使用。本番ドメインを必ず設定。
> ⚠️ env 変更後は **Re-deploy** が必要。

## 4. カスタムドメイン（Squarespace DNS）

- サブドメイン `samples.zuk-zuk.com` を使用 → **CNAME** `samples` → `cname.vercel-dns.com`
- Vercel > Project > Settings > Domains で `samples.zuk-zuk.com` を Add
- SSL（Let's Encrypt）自動発行を待つ（~5 分、`dig CNAME samples.zuk-zuk.com` で確認）
- 税理士サイトは `/tax/` サブパスで配信（Next の実ルートのため basePath 不要）

## 5. 本番化チェック

- [ ] `https://samples.zuk-zuk.com/tax/` が表示
- [ ] Hobby → **Pro** に変更（商用利用、$20/月）
- [ ] Web3Forms: ダッシュボードの Allowed Domains に `samples.zuk-zuk.com` を登録
- [ ] Sanity: CORS Origins に本番ドメイン、Members に許可ユーザー（`/studio` は認証必須）
- [ ] Rich Results Test で `AccountingService` 構造化データを検証
- [ ] OGP を Facebook/Twitter デバッガで検証（`/tax/opengraph-image`）

## 6. 留意点

- `/studio`（Sanity Studio）は robots.ts で disallow 済み。Sanity 側でアクセス制御を必ず設定。
- Web3Forms はサーバ POST が 403。クライアント直接 POST 実装済み（Slack 通知は別途 `/api/contact` を fire-and-forget で並列、Phase K で実装予定）。
