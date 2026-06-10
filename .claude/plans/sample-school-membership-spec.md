# 会員機能 仕様書 — `Hello Tree`（会員マイページ / 会員限定コンテンツ）

> 試行 #4 (#69) の強調機能「会員マイページ」「会員限定コンテンツ」 の仕様・実装方法を固めたもの。
> SAMPLES_PLAN.md ③ オンラインスクールの目玉。 実案件（地域の習いごと教室）の強調機能としても再利用する前提。
> 設計書: `sample-school-design-brief.md` Section 06 / night-run-004 Phase C と連動。

---

## 0. 2 層構成（サンプル と 本番）

| | サンプル #69（今回作る） | 本番（実案件昇格時） |
|---|---|---|
| **作り込み** | **薄い実認証つき** | フル実装 |
| 認証 | Auth.js + **デモログイン**（1クリック） | Auth.js + LINE Login + メールマジックリンク |
| 課金 | なし（デモ会員は `active` 固定） | Stripe サブスク（月謝自動引き落とし） |
| 認可 | middleware で**実際に gate**（未ログイン → /login） | 同左 + サブスク状態判定 |
| 動画 | プレースホルダ / 公開サンプル動画 | Cloudflare Stream 署名URL |
| PDF | 公開ダミー | 非公開ストレージ署名URL（R2） |
| データ | seed 済デモデータ（Postgres or インメモリ） | Vercel Postgres（実データ） |

> ⭐ サンプルの狙い: 「ログインすると本当にマイページが開き、 未ログインだと弾かれる」 という**認可の実物**を見せる。
> 決済とコンテンツ配信の重い部分は本番フラグ（`SCHOOL_DEMO_MODE`）で切り替え、 サンプルでは軽量に。

---

## 1. 確定技術スタック

| 領域 | 採用 | 備考 |
|---|---|---|
| 認証 | **Auth.js (NextAuth v5)** | LINE Login（保護者と親和）+ メールマジックリンク。 サンプルは Credentials「デモログイン」 |
| DB | **Vercel Postgres (Neon)** | 会員/生徒/出席/レポート。 PII を CMS から分離。 ORM は Drizzle 推奨（本体が Prisma なら合わせる） |
| コンテンツ管理 | **Sanity** | 動画/PDF の**メタデータのみ**（実ファイルは置かない） |
| 動画配信 | **Cloudflare Stream** | 署名URL（signed token）で会員限定。 従量課金 |
| PDF/教材配信 | **Cloudflare R2** | presigned GET（短 TTL）。 代替: Vercel Blob |
| 決済（本番のみ） | **Stripe Subscription** | AI STUDIO 本体の実装を流用。 zuk-zuk 所有 Stripe |
| ホスティング | Vercel | クライアント所有 |

> ⚠️ **最重要セキュリティ**: Sanity のファイルアセットは**公開 CDN URL**。 プレミアム動画/PDF を Sanity に直置きしない。
> Sanity には「Stream の動画 UID」「R2 のオブジェクトキー」 等の**参照だけ**を持たせ、 実体はサーバ側で署名URLを発行して配る。

---

## 2. 機能要件

### 2-1. 保護者マイページ（`/school/mypage`）

ログインした保護者が見られる画面。

- **お子さま情報**: 名前・コース・通学期間（複数子供に対応、 切替タブ）
- **出席状況**: 今月の出席/欠席/振替（スタンプ or カレンダー表示）
- **レッスンレポート**: 直近のレポート一覧（その日の単語・先生コメント・star 評価）
- **進捗**: フォニックス/英検 等の到達度バー
- **月謝・お支払い状況**: 当月の金額・支払い済み/未払い（本番は Stripe 由来）
- **お知らせ**: 休講・イベント（Sanity schoolNews と共有可）

### 2-2. 会員限定コンテンツ（`/school/lessons`）

おうち学習用の動画・PDF 一覧。

- **コンテンツ種別**: 動画 / 英語の歌 / 宿題 PDF / 塗り絵 PDF
- **アクセスレベル**: `free`（誰でも） / `member`（会員のみ）
- **一覧**: サムネ + タイトル + 種別 + 所要時間。 `member` は未ログイン時 🔒 ロック表示
- **再生/閲覧**: クリック → サーバが entitlement 確認 → 署名URL で配信
- **フィルタ**: 種別・コースレベル
- **制作者表示**: 「by Emily」（代表自作の手づくり感）

---

## 3. データモデル

### 3-1. Vercel Postgres（PII / トランザクション）

Auth.js が `users / accounts / sessions / verification_token` を管理（Drizzle adapter）。 それに school プロファイルを 1:1 で拡張。

```
users               -- Auth.js 管理（id, email, name, image, emailVerified）
accounts            -- Auth.js（OAuth: LINE 等）
sessions            -- Auth.js（DB セッション。 JWT なら省略可）

members             -- users と 1:1。 保護者プロファイル
  id (uuid, pk)
  user_id (fk → users.id, unique)
  display_name        -- 「さくらママ」
  line_user_id        -- LINE 連携（任意）
  stripe_customer_id  -- Stripe（本番）
  subscription_status -- 'active' | 'trialing' | 'past_due' | 'canceled' | 'none'
  plan                -- 'week1' | 'week2'
  created_at

students            -- 子供（members 1 : N）
  id (uuid, pk)
  member_id (fk → members.id)
  name                -- 「ゆうと」
  course              -- 'parent-kids' | 'kinder' | 'elem-jr' | 'elem'
  joined_at
  avatar_seed         -- アバター生成用（画像不要）

attendance          -- 出席（students 1 : N）
  id (uuid, pk)
  student_id (fk → students.id)
  date
  status              -- 'present' | 'absent' | 'makeup'

lesson_reports      -- レポート（students 1 : N）
  id (uuid, pk)
  student_id (fk → students.id)
  date
  words (jsonb)       -- ["apple","dog","happy"]
  teacher_comment
  rating (int)        -- 1..5
  teacher_name
```

> entitlement（会員かどうか）= `members.subscription_status IN ('active','trialing')`。 サンプルでは seed で `'active'` 固定。

### 3-2. Sanity（コンテンツ メタデータのみ）

```ts
// src/sanity/schemas/homeworkContent.ts
defineType({
  name: "homeworkContent",
  title: "おうち学習コンテンツ",
  type: "document",
  fields: [
    { name: "title", type: "string" },                 // 「Phonics Song A-B-C」
    { name: "type", type: "string",                    // video | song | pdf | coloring
      options: { list: ["video","song","pdf","coloring"] } },
    { name: "level", type: "string",                   // parent-kids | kinder | elem-jr | elem
      options: { list: ["parent-kids","kinder","elem-jr","elem"] } },
    { name: "accessLevel", type: "string",             // free | member
      options: { list: ["free","member"] }, initialValue: "member" },
    { name: "thumbnail", type: "image" },              // サムネは公開でOK
    { name: "streamVideoId", type: "string" },         // Cloudflare Stream UID（動画のみ）
    { name: "assetKey", type: "string" },              // R2 オブジェクトキー（PDF のみ）
    { name: "duration", type: "string" },              // 「3:20」 表示用
    { name: "publishedAt", type: "datetime" },
    { name: "description", type: "text" },
  ],
})
```

> `thumbnail` だけ Sanity の公開画像でOK。 `streamVideoId` / `assetKey` は**参照のみ**で実体ではない（公開URLにならない）。

### 3-3. 関係図

```
users (Auth.js) ─1:1─ members ─1:N─ students ─1:N─ attendance
                          │                     └1:N─ lesson_reports
                          └─ subscription_status（Stripe webhook 同期）

Sanity homeworkContent ──(streamVideoId)──> Cloudflare Stream
                       └─(assetKey)────────> Cloudflare R2
```

---

## 4. 認可フロー

### 4-1. ページ保護（middleware）

```ts
// middleware.ts（school スコープ）
export const config = { matcher: ["/school/mypage/:path*", "/school/lessons/:path*"] };
// 未ログイン → /school/login へ redirect（callbackUrl 付き）
// /school/lessons は閲覧自体は許可、 member コンテンツの実体取得時に再チェック（下記 API）
```

- `/school/mypage`: **要ログイン**（未ログインは login へ）
- `/school/lessons`: 一覧は閲覧可（free は誰でも、 member は 🔒 表示）。 実体取得で gate

### 4-2. コンテンツ配信（route handler で entitlement 確認 → 署名URL）

```
GET /api/school/content/[id]/play     -- 動画: Cloudflare Stream 署名トークン発行
GET /api/school/content/[id]/download -- PDF: R2 presigned URL 発行
```

各ハンドラの処理:
1. `auth()` でセッション取得 → 未ログインなら 401
2. `homeworkContent` を取得し `accessLevel` 確認
3. `member` なら `members.subscription_status` を確認（`active`/`trialing` 以外は 403）
4. OK → 署名URL/トークンを TTL 付き（例: 動画 2h、 PDF 5min）で発行して返す
5. クライアントはそのURLで Stream プレイヤー or PDF を開く

> **多層防御**: middleware（ページ）+ API（実体）の二重チェック。 直リンクを踏まれても実体は守られる。

### 4-3. Cloudflare Stream 署名URL（要点）

- Stream 側で「署名URL必須」 に設定（公開再生を無効化）
- サーバで署名鍵（`CF_STREAM_KEY_ID` / `CF_STREAM_JWK`）を使い JWT を生成 → プレイヤーに渡す
- TTL で期限切れ。 entitlement の都度発行

### 4-4. PDF（R2 presigned）

- R2 バケットは非公開。 サーバが `GetObject` presigned URL（TTL 5分）を発行
- 代替: Vercel Blob（URLはランダムだが公開）→ 真の gate には R2 を推奨

---

## 5. Stripe サブスク連携（本番のみ）

AI STUDIO 本体の Stripe Subscription 実装を流用。

```
保護者が「入会」 → Stripe Checkout（mode: subscription, price: 週1/週2）
   → 成功 → webhook(checkout.session.completed / customer.subscription.updated)
   → members.stripe_customer_id / subscription_status / plan を更新
解約・支払い失敗 → webhook で subscription_status を canceled/past_due に
```

- entitlement 判定は常に `members.subscription_status`（Stripe を信頼の源泉に）
- 月謝表示（mypage）は Stripe の請求情報 or members.plan から算出
- ⚠️ **徴収主体ルール（正典 0-2-1 に明文化済）**: 月謝はクライアント（教室）の売上 → **クライアント所有 Stripe で徴収**（zuk-zuk 所有 Stripe は使わない）。 複数教室を横展開する場合のみ Stripe Connect を検討。 詳細は `../../../zuk-zuk-ai-studio/docs/CLIENT_PROJECT_FLOW.md` 0-2-1

---

## 6. サンプル(#69) 薄い実認証の実装方針

> `SCHOOL_DEMO_MODE=true`（既定）で動く軽量版。 認可の machinery は本物、 決済とStream/R2 は回避。

### 6-1. デモログイン

- `/school/login` に **「デモアカウントでログイン」 ボタン**（1クリック）
- Auth.js の **Credentials provider**（デモ専用）で seed 済の親アカウント（さくらママ）にサインイン
- LINE / メール provider は**コードに用意してコメントアウト or 無効**（本番で有効化）
- ログイン後 `/school/mypage` が実際に開く。 ログアウトで再び弾かれる ← **gate の実演**

### 6-2. デモデータ

- seed: members(さくらママ, subscription_status='active') / students(ゆうと, kinder) / attendance(今月3件) / lesson_reports(2件)
- 保存先: Vercel Postgres にデモ行を seed（`scripts/seed-school-demo.ts`）。 DB 未接続環境向けに**インメモリ fallback** も用意（サンプルが env なしでも動く）

### 6-3. コンテンツ（動画/PDF）

- `homeworkContent` は Sanity or ハードコード fallback（NEWS と同様）
- 動画: サンプルでは Cloudflare Stream を設定せず、 **公開サンプル動画 or プレースホルダ**を再生。 `streamVideoId` があれば本番ロジック、 なければデモ再生に分岐
- PDF: 公開ダミー PDF（`/public/school/sample-homework.pdf`）。 ロック表示は未ログイン時のみ
- `member` コンテンツ: 未ログイン → 🔒 オーバーレイ + 「ログインして見る」。 デモログイン後は解錠

### 6-4. デモ表示の明示

- mypage / lessons の上部に **サンプル誘導バナー**:
  「📌 これは zuk-zuk AI STUDIO のサンプルです。 デモアカウントでログイン中。 実装では会員登録・Stripe 決済・限定配信が動きます。」

---

## 7. ファイル構成（会員機能 追加分）

```
src/
├── auth.ts                              # Auth.js 設定（providers, adapter, callbacks）
├── middleware.ts                        # /school/mypage・/school/lessons 保護
├── app/
│   ├── school/
│   │   ├── login/page.tsx               # デモログイン画面
│   │   ├── mypage/page.tsx              # 保護者マイページ（要ログイン）
│   │   └── lessons/page.tsx             # 会員限定コンテンツ一覧
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # Auth.js ハンドラ
│       └── school/content/[id]/
│           ├── play/route.ts            # 動画 署名トークン（本番）/ デモ再生
│           └── download/route.ts        # PDF presigned（本番）/ デモDL
├── lib/
│   ├── db/
│   │   ├── schema.ts                    # Drizzle スキーマ（members/students/...）
│   │   └── index.ts                     # DB クライアント（+ インメモリ fallback）
│   ├── school-entitlement.ts            # entitlement 判定ロジック
│   └── school-content.ts               # 既存（コンテンツ fallback 等）
├── components/school/
│   ├── MyPageDashboard.tsx              # マイページ UI
│   ├── AttendanceStamps.tsx
│   ├── LessonReportCard.tsx
│   ├── ProgressBar.tsx
│   ├── ContentGrid.tsx                  # lessons 一覧
│   └── ContentLock.tsx                  # 🔒 オーバーレイ
├── sanity/schemas/homeworkContent.ts
└── scripts/seed-school-demo.ts          # デモ会員 seed
```

---

## 8. 環境変数

```bash
# Auth.js
AUTH_SECRET=                 # openssl rand
AUTH_URL=http://localhost:3004
# 本番 providers（サンプルは未設定でOK）
AUTH_LINE_ID=
AUTH_LINE_SECRET=
EMAIL_SERVER=                # メールマジックリンク用 SMTP
EMAIL_FROM=

# DB
POSTGRES_URL=               # Vercel Postgres（未設定ならインメモリ fallback）

# Cloudflare Stream（本番のみ）
CF_ACCOUNT_ID=
CF_STREAM_KEY_ID=
CF_STREAM_JWK=

# Cloudflare R2（本番のみ）
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=

# Stripe（本番のみ、 本体流用）
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_WEEK1=
STRIPE_PRICE_WEEK2=

# サンプル動作モード
SCHOOL_DEMO_MODE=true       # true: デモログイン+デモ配信 / false: 本番フル
```

---

## 9. 段階導入（サンプル → 実案件 昇格手順）

1. **サンプル稼働**: `SCHOOL_DEMO_MODE=true`、 デモログインで gate を実演（#69 完成形）
2. **実案件で認証有効化**: LINE/メール provider を有効化、 デモ Credentials を無効化
3. **DB 本番化**: Vercel Postgres を接続、 `members/students/...` を実データに
4. **決済接続**: Stripe Checkout（subscription）+ webhook、 `subscription_status` 同期
5. **配信本番化**: Cloudflare Stream/R2 を接続、 `SCHOOL_DEMO_MODE=false` で署名URL 配信
6. **講師運用**: Sanity で `homeworkContent` 追加、 レポートは管理UI（or Studio 拡張）で入力

> サンプルの構造（テーブル/ページ/API/entitlement ロジック）を**そのまま流用**できるのが狙い。 差分は env と provider のみ。

---

## 10. セキュリティ・運用上の注意

- **Sanity 公開アセット問題**: 動画/PDF 実体を Sanity に置かない（参照のみ）。 サムネだけ公開でOK
- **多層防御**: middleware（ページ）+ API（実体取得）で二重に entitlement 確認
- **署名URL TTL**: 動画 2h / PDF 5min 程度。 都度発行、 使い回さない
- **PII 分離**: メール/Stripe ID/出席/レポートは Postgres。 CMS 編集者（講師）に PII を見せない
- **子供の情報**: 氏名は表示名のみ、 写真は持たせない（アバターは seed 生成）。 個人情報保護に配慮
- **デモアカウント**: サンプル公開時、 デモ Credentials は read-only 相当に（書き込み API はデモで no-op）

---

## 11. 関連リソース

- 設計書: `sample-school-design-brief.md`（Section 06 / mypage / lessons）
- CLI 自走 Plan: `night-run-004.md`（Phase C を本仕様に合わせて更新）
- ヒアリング: `sample-school-hearing.md`
- 業務ルール正典: `../../../zuk-zuk-ai-studio/docs/CLIENT_PROJECT_FLOW.md`
- Stripe 流用元: AI STUDIO 本体（Stripe Subscription 実装済）
- Skill: `../../.claude/skills/setup-sample-demo-mode.md`
