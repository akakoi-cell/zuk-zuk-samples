# 環境変数 セットアップガイド — サンプルサイト共通

> samples.zuk-zuk.com 配下のサンプル (#67〜#72) の env 設定ガイド。
>
> 想定所要時間: **10-20 分** (Sanity だけ設定すれば OK、 他はスキップ)
> 結果: ローカル `http://localhost:3004/tax/` (or 他サンプル) で「サンプル誘導型」 として動作

---

## ⚠️ サンプル運用方針 (2026-06-09 決定、 重要)

**samples.zuk-zuk.com は zuk-zuk AI STUDIO の営業ツール (公開デモ)** です。 訪問者が誤送信しないよう、 以下の方針で実装:

| 機能 | サンプル方針 | 理由 |
|---|---|---|
| **Sanity CMS** | ✅ **本物連動** (env 必須) | 動く CMS デモが価値、 クライアント体験 |
| **Web3Forms フォーム** | ❌ **無効化 (UI のみ)** | 誤送信防止 + 月 50 件 Free 枠の浪費防止 |
| **Stripe 決済** | ❌ **無効化 (UI のみ)** | 訪問者が「動くか試す」 を防ぐ |
| **Slack 通知** | ❌ **env 未設定で no-op** | 不要な通知を避ける |

**実装方法**: `setup-sample-demo-mode` Skill (`.claude/skills/`) を参照。 フォーム / 決済ボタンを `disabled` + サンプル警告バナー + AI STUDIO 誘導 CTA を表示する 3 レイヤー構成。

→ **このガイドは Sanity (Section 1) だけ実施必須**、 Section 2-4 (Web3Forms / Stripe / Slack) は **クライアント本番案件で必要時の参考** として残しています (サンプルでは設定不要)。

---

## 📋 全体フロー

```
1. Sanity     アカウント作成 → Project ID + Token 取得 → .env.local に記入 → 動作確認  ← 必須
2. Web3Forms  (サンプルではスキップ) — 本番案件で必要時に設定                           ← 任意
3. Stripe     (サンプルではスキップ) — 本番案件で必要時に設定                           ← 任意
4. Slack      (サンプルではスキップ) — 本番案件で必要時に設定                           ← 任意
5. 動作確認   npm run dev → http://localhost:3004/tax/ で各機能テスト
```

---

## 1. Sanity (必須) — CMS 連動

### 1-1. アカウント作成 + プロジェクト作成

1. https://www.sanity.io/login を開く
2. **GitHub or Google でログイン** (アカウント作成兼ねる、 無料)
3. ダッシュボード → 「Create new project」
4. **Project name**: `みらい税理士サンプル` or `zuk-zuk-tax-sample`
5. **Dataset**: `production` (デフォルト OK)
6. プロジェクト作成完了

### 1-2. Project ID を取得

1. https://www.sanity.io/manage を開く
2. 作ったプロジェクトをクリック
3. **Project ID** が表示される (例: `9q3o7nof`)
4. これをコピー

### 1-3. API Token を作成 (seed 用)

1. プロジェクト > **API** > **Tokens**
2. 「Add API token」
3. **Name**: `dev-write` 等
4. **Permission**: **Editor** (Read + Write)
5. 「Create」 をクリック
6. **トークンをコピー** (二度と表示されない、 安全な場所に保管)

### 1-4. CORS Origins を追加 (重要!)

1. プロジェクト > **API** > **CORS Origins**
2. 「Add CORS origin」
3. 以下を追加:
   - `http://localhost:3000`
   - `http://localhost:3004`
   - `https://samples.zuk-zuk.com` (本番、 後で)
4. 各 origin に **Allow credentials: ON**

### 1-5. .env.local に記入

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=9q3o7nof  ← 1-2 で取得した ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_WRITE_TOKEN=skXXXXXXXXXX...  ← 1-3 で取得したトークン (NEXT_PUBLIC を付けない!)
```

### 1-6. 動作確認

```bash
PORT=3004 npm run dev
```

- http://localhost:3004/studio にアクセス
- Sanity ログイン (1-1 と同じアカウント)
- Studio が表示されれば成功
- 「Works」「Column」 スキーマが見える
- ドキュメント作成 → http://localhost:3004/tax/ で表示確認

---

## 2. Web3Forms (必須) — Contact フォーム送信

### 2-1. メール登録 + Access Key 取得

1. https://web3forms.com を開く
2. 「Get Access Key」 をクリック
3. **受信メールアドレス** (例: `contact@zuk-zuk.com`) を入力
4. 確認メールが届く → リンククリック
5. **Access Key** が表示される (例: `abc123-def456-...`)
6. ダッシュボードへ進む

### 2-2. Allowed Domains を登録 (重要!)

1. ダッシュボード > **Allowed Domains**
2. 以下を追加:
   - `localhost`
   - `samples.zuk-zuk.com` (本番、 後で)

### 2-3. hCaptcha を有効化

1. ダッシュボード > **Security Settings**
2. 「Captcha Protection」 → **hCaptcha** を有効化
3. これで Web3Forms 共有 Sitekey (`50b2fe65-b00b-4b9e-ad62-3ba471098be2`) が動く

### 2-4. .env.local に記入

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=abc123-def456-...  ← 2-1 で取得
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=50b2fe65-b00b-4b9e-ad62-3ba471098be2  ← 固定値、 そのまま
```

### 2-5. 動作確認

- http://localhost:3004/tax/#contact にアクセス
- フォームに必要事項を入力 + hCaptcha チェック
- 送信 → 「送信ありがとうございます」 表示
- 登録メールアドレスに受信を確認

---

## 3. Stripe (オプション) — 初回相談料 ¥5,000 単発決済

> 銀行口座未開設なら **Test mode で動作確認のみ**。 Live mode 移行は #79 Vercel デプロイ後で OK。

### 3-1. Stripe アカウント作成 (Test mode)

1. https://dashboard.stripe.com/register を開く
2. メール + パスワードで登録
3. ダッシュボード右上が **「Test mode」 (黄色 toggle)** であることを確認

### 3-2. Test API Keys を取得

1. https://dashboard.stripe.com/test/apikeys を開く
2. **Publishable Key** (`pk_test_...`) をコピー
3. **Secret Key** (`sk_test_...`) を「Reveal test key」 → コピー

### 3-3. Webhook endpoint を設定 (本番デプロイ後でも可)

> Test mode では Webhook は必須ではないが、 ローカルで Stripe CLI を使う場合に Webhook secret が必要。
> 今は **空欄のまま OK**、 本番デプロイ後に設定。

### 3-4. .env.local に記入

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY  ← 3-2 Publishable
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY  ← 3-2 Secret
STRIPE_WEBHOOK_SECRET=  ← 後で
```

### 3-5. 動作確認 (Test mode)

- http://localhost:3004/tax/ → Service タブ「スポット相談」 を開く
- 「初回相談 ¥5,000 を予約する」 ボタンクリック
- Stripe Checkout 画面が開く
- **テストカード**: `4242 4242 4242 4242`、 月年: 任意未来 (12/30 等)、 CVC: 任意 3 桁、 郵便番号: 任意
- 決済成功 → /tax/checkout/success にリダイレクト

---

## 4. Slack (オプション) — 内部通知

### 4-1. Slack App 作成

1. https://api.slack.com/apps を開く
2. 「Create New App」 → 「From scratch」
3. **App name**: `みらい税理士サンプル通知` etc.
4. **Workspace**: zuk-zuk のもの

### 4-2. Incoming Webhooks を有効化

1. 左メニュー > **Incoming Webhooks**
2. **Activate Incoming Webhooks** を ON
3. 「Add New Webhook to Workspace」
4. 通知先チャンネル選択 (例: `#sample-tax-notify` を新規作成)
5. **Webhook URL** をコピー (例: `https://hooks.slack.com/services/T.../B.../...`)

### 4-3. Slack User ID 取得 (任意、 メンション通知用)

1. Slack ワークスペースで自分のプロフィールを開く
2. 「︙」 メニュー → 「メンバー ID をコピー」 (`U` で始まる、 例: `U03SFFN5AFR`)

### 4-4. .env.local に記入

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T.../B.../...  ← 4-2 Webhook URL
SLACK_NOTIFY_USER_ID=U03XXXXX  ← 4-3 User ID (任意、 デスクトップ通知が確実に飛ぶ)
```

### 4-5. 動作確認

- http://localhost:3004/tax/#contact からフォーム送信
- Slack の通知チャンネルに新着メッセージが届く
- メンション (`@your-name`) が冒頭に付いてればデスクトップ通知が飛ぶ

---

## 5. 全体動作確認

env 全部入れたら:

```bash
cd "/Users/kakoiatsushi/Projects/zuk-zuk AI DESIGN STUDIO/zuk-zuk-samples"
PORT=3004 npm run dev
```

ブラウザで:

| URL | 確認内容 |
|---|---|
| http://localhost:3004/tax/ | サイト全体表示、 「準備中」 が消えてるか |
| http://localhost:3004/studio | Sanity Studio、 Works / Column 編集可能か |
| http://localhost:3004/tax/#contact | フォーム送信 → メール受信 + Slack 通知 |
| http://localhost:3004/tax/#service | スポット相談 → Stripe Checkout |

---

## 6. 完了後の次ステップ

env 設定が完了したら:

1. **タスク #78 を completed に更新**
2. **タスク #79 (Vercel デプロイ)** に進む
3. `docs/DEPLOY.md` を参照しながら Vercel に上げる
4. samples.zuk-zuk.com サブドメイン設定
5. Vercel 側の env 登録 (Production + Preview 両方)
6. **本番動作確認** (https://samples.zuk-zuk.com/tax/)
7. Hobby → Pro 切替 (商用利用)

---

## ❓ よくある質問

### Q. Sanity アカウント作成しないとサイト見れない?
A. いいえ、 env 未設定でも「ハードコードデータ」 でサイトは表示されます。 ただし「クライアントが Studio で編集する」 体験は確認できません。

### Q. Web3Forms の Free プランは月 50 件まで?
A. はい。 サンプルなのでこれで十分。 案件で本格運用するなら Starter ($9/月、 200 件) へ。

### Q. Stripe アカウント作成は銀行口座いる?
A. **Test mode は不要**、 すぐ始められる。 Live mode (本番決済) は銀行口座必須。

### Q. Slack 通知は本当に必要?
A. オプション。 ただし運用時に「問い合わせが入った瞬間に気づける」 ので便利。

### Q. env を .env.local に書いたのに反映されない
A. **dev server を再起動** してください。 .env.local は起動時に読み込まれます。
