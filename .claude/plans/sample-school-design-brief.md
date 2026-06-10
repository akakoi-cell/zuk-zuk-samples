# 子供英会話教室サンプル 設計書 — `Hello Tree`（ハローツリー）

> 試行 #4 (#69) の実装基盤。 CLI 夜間自走（`night-run-004.md`）はこの設計書を参照して進める。
> ヒアリング結果: `sample-school-hearing.md`
> コンセプト: 「ネイティブの会話を、 まちがえてOK の空間で。」

---

## 0. プロジェクト概要

| 項目 | 値 |
|---|---|
| サンプル名 | 子供英会話教室サンプル `Hello Tree` |
| URL（本番） | https://samples.zuk-zuk.com/school/ |
| URL（Studio） | https://samples.zuk-zuk.com/studio（税理士・美容室と共有） |
| 配置先 | `src/app/school/` |
| 試行 # | 試行 #4（夜間自走） |
| 目的 | ポップ＆ウォーム系トーンの実証 ＋ **会員マイページ / 会員限定コンテンツ（静的モック）** の見せ場づくり。 強調機能 サブスク・体験予約・会員機能の組み合わせ運用検証 |

---

## 1. デザイントークン（Tailwind v4 @theme）

`src/app/school/styles.css`（or globals.css 内のスコープ）で:

```css
@theme {
  /* Hello Tree サンプル専用カラー */
  --color-school-bg: #FFFDF7;          /* Main BG クリーム白 */
  --color-school-card: #FFF6E4;         /* Card BG 黄ベージュ */
  --color-school-primary: #4FA85A;      /* リーフグリーン（木） */
  --color-school-primary-dk: #3C8A47;   /* 濃いグリーン（hover/text） */
  --color-school-yellow: #FFC83D;       /* サンイエロー */
  --color-school-coral: #FF6B5B;        /* コーラル（赤） */
  --color-school-sky: #4FB6E6;          /* スカイブルー */
  --color-school-text: #3D3128;         /* こげ茶 */
  --color-school-text-mute: #7A6A58;    /* やわらか茶 */
  --color-school-border: #EFE6D2;       /* 薄ベージュ */

  /* フォント */
  --font-school-jp: "Zen Maru Gothic", sans-serif;        /* 丸ゴ・あたたかい */
  --font-school-en: "Baloo 2", "Quicksand", sans-serif;   /* 丸み・ポップ */
  --font-school-en-body: "Quicksand", sans-serif;
  --font-school-num: "Nunito", sans-serif;                /* 数字 */
  --font-school-hand: "Caveat", cursive;                  /* 手書きアクセント専用 */

  /* 角丸（子供向け = 大きめ） */
  --radius-school: 1.5rem;       /* 24px カード */
  --radius-school-lg: 2rem;      /* 32px 大ブロック */
  --radius-school-pill: 9999px;  /* ボタン・チップ */
}
```

> 💡 **安っぽさ回避**: ベースは必ず `--color-school-bg`（クリーム）。 メインは `--color-school-primary`（グリーン）。
> 黄/赤/青の差し色は **面積を抑えてアクセント限定**（見出し装飾・チップ・アイコン・コース色分けのみ）。 4 色を等量で使わない。

---

## 2. ファイル構成

> ⭐ 会員機能（auth.ts / middleware.ts / login / api / lib/db）は `sample-school-membership-spec.md` Section 7 が正典。 以下は LP + デモページの骨子。

```
src/app/school/
├── page.tsx                  # 全セクションをまとめる（LP 本体）
├── layout.tsx                # metadata, JSON-LD（EducationalOrganization / LocalBusiness schema）
├── opengraph-image.tsx       # OG 画像（中央 630x630 セーフ）
├── styles.css                # School サンプル専用 CSS 変数
├── login/
│   └── page.tsx              # ⭐ デモログイン（Auth.js Credentials「デモアカウントでログイン」）
├── mypage/
│   └── page.tsx              # ⭐ 会員マイページ（要ログイン、 middleware で gate）
├── lessons/
│   └── page.tsx              # ⭐ 会員限定コンテンツ（動画/PDF 一覧、 member は 🔒）
└── legal/
    ├── privacy/page.tsx      # プライバシーポリシー（税理士/美容室流用）
    ├── terms/page.tsx        # 利用規約（簡易）
    └── tokushoho/page.tsx    # 特商法（サブスク決済があるため必須・簡易）

src/components/school/
├── ui.tsx                    # Section / Eyebrow / Icon / Btn / Pill（美容室から流用 + 色差替）
├── SchoolHeader.tsx          # 上部ナビ（「無料体験」 disabled ボタン含む）
├── SchoolFooter.tsx          # LINE バナー組込み
├── SchoolHero.tsx            # 01 Hero（コピー主役 + 木イラスト + 写真）
├── SchoolAbout.tsx           # 02 About（Hello Tree の約束 / 選ばれる理由 4 つ）
├── SchoolCourses.tsx         # 03 Courses（年齢別 4 コース、 色分けカード）
├── SchoolTeachers.tsx        # 04 Teachers（講師 3 名、 Emily 主役）
├── SchoolLesson.tsx          # 05 Lesson（レッスンの流れ・教室の様子）
├── SchoolMembership.tsx      # 06 Membership ⭐（マイページ＆おうち学習の予告 + デモ導線）
├── SchoolVoice.tsx           # 07 Voice（保護者の声 4 件）
├── SchoolPricing.tsx         # 08 Pricing（月謝＝サブスク）
├── SchoolTrial.tsx           # 09 Trial ⭐（無料体験予約、 cal.com 風 UI、 disabled）
├── SchoolAccess.tsx          # 10 Access（教室 + Google Map）
├── SchoolFaq.tsx             # 11 FAQ（アコーディオン、 美容室流用）
└── SchoolContact.tsx         # 12 Contact（disabled + AI STUDIO CTA）

src/lib/school-content.ts      # 全データ集約（tax/salon と並列）

src/sanity/schemas/
└── schoolNews.ts             # Sanity スキーマ（お知らせ or レッスンギャラリー用）
```

---

## 3. 各セクション詳細

### 01. Hero

**目的**: ファーストビューで「まちがえてOK」 のあたたかさ・楽しさを伝える。

**構成**:
- 背景: クリーム（`--bg`）+ 木・葉・小鳥のイラスト（角に配置、 主張しすぎない）
- 上部 eyebrow: 「**Saitama ・ Kita-Urawa**」 + 「こども英会話教室」（Quicksand small caps + 丸ゴ、 muted）
- ロゴ大「**Hello Tree**」（Baloo 2、 "Hello" に手書き Caveat アクセント or 木アイコン）
- メインコピー（案 1）:
  ```
  まちがえても、 だいじょうぶ。
  トロント育ちの先生といっしょに、
  たくさん失敗して、 たくさん話す。
  ```
- サブコピー（小、 muted）: 「"好き" からはじまる、 こどもの英会話。 さいたま市・北浦和の小さな教室から。」
- メイン画像: `/images/school/hero.jpg`（子供がレッスンで笑っている / 先生とハイタッチ等、 明るい自然光）
  - 画像は角丸大（`--radius-school-lg`）の枠 or ブロブ型マスク
- CTA ボタン 2 つ:
  - 主: 「**無料体験レッスン**」（コーラル pill、 disabled → Trial へスクロール）
  - 副: 「コースを見る」（アウトライン、 Courses へ）
- 装飾: 点線の波・star・吹き出し「Hello!」 を散らす（やりすぎ注意）

### 02. About（Hello Tree の約束 / 選ばれる理由）

**目的**: コンセプト「まちがえてOK」 ＋ 個人教室の強み 4 つを伝える。

**構成**:
- eyebrow: `01 / About`
- 見出し: 「**まちがえることが、 いちばんの近道。**」（丸ゴ、 一部グリーン強調）
- リード文:
  ```
  Hello Tree は、 さいたま市・北浦和の住宅街にある、 小さなこども英会話教室です。
  「正解」 を覚える英語ではなく、 まちがえながら、 笑いながら、 たくさん口に出す英語を。
  トロント育ちの代表と、 ネイティブの先生といっしょに、 英語を "好き" になる入口をつくります。
  ```
- **選ばれる理由 4 カード**（`grid md:grid-cols-2 gap-6`、 各カードに色分けアイコン）:
  1. 🟢 **少人数 4〜6 名**: ちゃんと話せる、 聞くだけで終わらない
  2. 🟡 **ネイティブ級の代表**: トロント育ちのハーフ、 本物の発音を日本語フォロー付きで
  3. 🔴 **まちがえてOK の空間**: 失敗を笑顔で受け止める、 自己肯定感が育つ
  4. 🔵 **おうちでも続く会員サイト**: 代表自作の動画・宿題で、 教室外も英語漬け

> 各カードはアイコン（葉・吹き出し・star・家）+ 見出し + 2 行説明。 アクセント色は 1 カード 1 色で散らす。

### 03. Courses（年齢別 4 コース）

**目的**: 「うちの子はどれ?」 を一目で。 年齢別に色分けして親しみやすく。

**構成**:
- eyebrow: `02 / Courses`
- 見出し: 「コース紹介」 / 「1.5 歳から、 小学 6 年生まで」
- 4 カード横並び（`grid sm:grid-cols-2 lg:grid-cols-4 gap-5`）、 各カード上部に**コース色帯** + 対象年齢バッジ

**データ例**（`school-content.ts`）:
```ts
export const COURSES = [
  {
    en: "Parent & Kids",
    ja: "親子コース",
    age: "1.5〜3歳",
    color: "yellow",
    icon: "baby",
    desc: "歌・絵本・スキンシップで、 英語の「音」 に親しむ最初のいっぽ。 ママ・パパと一緒に。",
    points: ["親子で参加", "英語の歌・手遊び", "週1・40分"],
  },
  {
    en: "Kinder",
    ja: "幼児コース",
    age: "年少〜年長",
    color: "coral",
    icon: "star",
    desc: "アルファベットとフォニックス入門。 体を動かすアクティビティで、 楽しく英語の基礎を。",
    points: ["フォニックス入門", "アクティビティ中心", "週1・50分"],
  },
  {
    en: "Elementary Jr.",
    ja: "小学生 低学年",
    age: "小1〜3",
    color: "primary",
    icon: "pencil",
    desc: "読む・書くの基礎と、 かんたんな会話。 フォニックスを本格的に、 自分で読める喜びを。",
    points: ["読み書き基礎", "フォニックス本格", "週1〜2・60分"],
  },
  {
    en: "Elementary",
    ja: "小学生 高学年",
    age: "小4〜6",
    color: "sky",
    icon: "trophy",
    desc: "英検 5〜4 級対策とスピーキング。 自分の言葉で話す力を、 失敗を恐れず伸ばします。",
    points: ["英検5〜4級対策", "スピーキング重視", "週1〜2・60分"],
  },
];
```

### 04. Teachers（講師 3 名、 Emily 主役）

**目的**: 「この先生に習いたい」。 代表 Emily を主役に、 親しみと信頼。

**構成**:
- eyebrow: `03 / Teachers`
- 見出し: 「先生たちのこと」
- 代表 Emily は **大きめ 1 枚（横長 or 2 カラム）**、 Mike / Aya は 2 名横並び（or 3 名均等でも可）
- 各カード: 顔写真（角丸 or ブロブ、 笑顔・明るい自然光）+ 役職 + 英名（Baloo 2）+ 日本名 + プロフィール + 担当タグ

**データ例**:
```ts
export const TEACHERS = [
  {
    role: "代表 / Founder",
    enName: "Emily",
    jaName: "桜井 エミリー",
    image: "/images/school/teacher-emily.jpg",
    profile: "日本人の母とカナダ人の父のハーフ。 トロントで6年間育ったネイティブ級バイリンガル。 「まちがえても大丈夫」 を信条に、 おうち教材の動画も自分で作っています。",
    tags: ["全コース監修", "スピーキング", "おうち教材制作"],
    featured: true,
  },
  {
    role: "Native Teacher",
    enName: "Mike",
    jaName: "マイク",
    image: "/images/school/teacher-mike.jpg",
    profile: "アメリカ出身の明るいネイティブ講師。 ゲームと笑いで、 子供が気づいたら英語で話している、 そんなレッスンが得意。",
    tags: ["ネイティブ発音", "アクティビティ", "Kinder"],
    featured: false,
  },
  {
    role: "Bilingual Teacher",
    enName: "Aya",
    jaName: "あや",
    image: "/images/school/teacher-aya.jpg",
    profile: "日本人バイリンガル講師。 フォニックスと読み書きの指導が丁寧で、 「日本語で安心して質問できる」 と保護者からの信頼も厚い。",
    tags: ["フォニックス", "読み書き", "英検対策"],
    featured: false,
  },
];
```

### 05. Lesson（レッスンの流れ・教室の様子）

**目的**: 「通ったらこんな感じ」 を写真主体で。 不安を「楽しそう」 に変える。

**構成**:
- eyebrow: `04 / Lesson`
- 見出し: 「レッスンの 1 日」 / 「こんなふうに、 すすみます」
- **横スクロール or 4 ステップのタイムライン**（番号付き、 各ステップに写真 + 短文）:
  1. **Hello! あいさつ** — 元気にあいさつ、 今日の気分を英語で
  2. **Songs & Games** — 歌・ゲームで体を動かしながら
  3. **Speaking Time** — 少人数だから一人ひとり話す番が回る
  4. **See you! ふりかえり** — できたことをほめて、 おうち宿題を確認
- 下部に教室風景写真 2〜3 枚（`/images/school/classroom-*.jpg`、 カラフルな教室・絵本棚・子供の作品）

### 06. Membership ⭐（会員マイページ ＆ おうち学習）

> 📐 **仕様の正典**: 会員機能の仕様・実装方法は `sample-school-membership-spec.md` に集約。
> 確定スタック = **Auth.js (NextAuth v5) + Vercel Postgres + Cloudflare Stream + Stripe(本番のみ)**。
> サンプル #69 は **薄い実認証つき**（デモログインで gate を実演、 決済なし）。 以下は LP 内セクションと 2 デモページの UI 設計。

**目的**: SAMPLES_PLAN ③ の目玉 **会員マイページ + 会員限定コンテンツ** を「機能の見せ場」 として提示。 他サンプルにない差別化。

**構成**:
- eyebrow: `05 / Members`
- 見出し: 「教室の外でも、 英語はつづく。」
- リード: 「Hello Tree の生徒は、 会員サイトで代表 Emily 手づくりの動画やプリントが使い放題。 保護者の方は、 お子さまの出席や成長をマイページでいつでも確認できます。」
- **2 枚のプレビューカード**（実画面のミニチュア or イラスト的モック）:
  - 左: 「📱 保護者マイページ」 — 出席スタンプ・レッスンレポート・進捗 → ボタン「マイページを見る（デモ）」 → `/school/mypage`
  - 右: 「🎬 おうち学習コンテンツ」 — 練習動画・英語の歌・宿題 PDF → ボタン「コンテンツを見る（デモ）」 → `/school/lessons`
- 注記（小）: 「※ サンプルはデモアカウントでログインして体験できます。 実装では LINE ログイン + Stripe サブスク決済 + 限定配信で構築します。」
- CTA: 「デモアカウントでログイン →」（`/school/login`、 薄い実認証で実際にログインできる）

> このセクションは **強調機能のショーケース**。 デモログイン → mypage / lessons で「認可が本当に効く」 体験を見せるのがメイン。 詳細は `sample-school-membership-spec.md`。

#### デモページ A: `/school/mypage`（会員マイページ・**要ログイン**）

> 薄い実認証: 未ログインで開くと `/school/login` へ redirect（middleware）。 「デモアカウントでログイン」 で解錠。

- ヘッダー: 「こんにちは、 さくらママ 👋」 + ログアウトボタン（実際に動く → 再度 gate）
- カード群:
  - **お子さま情報**: 「ゆうとくん（Kinder コース・週1）」 アバター + 通学 8 ヶ月目
  - **出席スタンプ**: カレンダー風 or スタンプラリー風（🌟 が並ぶ、 今月 3/4 回出席）
  - **最新レッスンレポート**: 「Today's words: apple / dog / happy。 大きな声で言えました!」 先生コメント + star 評価
  - **進捗バー**: フォニックス進捗・英検目標 等（プログレスバー、 グリーン）
  - **今月の月謝**: 「¥8,800（お支払い済み）」 + Stripe 風バッジ（サブスク決済の示唆）
- 上部に **サンプル誘導バナー**: 「📌 これは zuk-zuk AI STUDIO のサンプル（デモ画面）です」

#### デモページ B: `/school/lessons`（会員限定コンテンツ・静的モック）

- 見出し: 「おうち学習コンテンツ」
- フィルタチップ: すべて / 動画 / 歌 / 宿題 PDF / 塗り絵
- **コンテンツカードグリッド**（`grid sm:grid-cols-2 lg:grid-cols-3`）:
  - 各カード: サムネ（イラスト or 画像）+ タイトル + タイプアイコン + 所要時間
  - 例: 「Phonics Song "A-B-C"（動画 3:20）」 「Animal Flashcards（PDF）」 「Weekly Homework #12（PDF）」 「ぬりえ: Fruits（PDF）」
  - **一部カードにロックアイコン 🔒**（`accessLevel: member`）→ 未ログイン時は鍵 + 「ログインして見る」、 デモログイン後は解錠
  - 再生/DL クリック → API（`/api/school/content/[id]/play|download`）が entitlement 確認 → 署名URL（本番）/ デモ配信
- 上部に同じ **サンプル誘導バナー**
- 注記: 「※ 動画・PDF は代表 Emily が制作したサンプルです。 実装では Cloudflare Stream/R2 の署名URL で会員限定配信します。」

### 07. Voice（保護者の声）

**目的**: 決裁者＝保護者の不安を、 同じ立場の声で溶かす。

**構成**:
- eyebrow: `06 / Voice`
- 見出し: 「通わせている、 おうちの声。」
- **2x2 グリッドで 4 件カード**（card 背景、 角丸大、 上に大きな引用符）
- 各カード: 引用本文（3-4 行）+ 保護者属性 + star

**データ例**:
```ts
export const VOICES = [
  {
    quote: "人見知りな娘が、 半年で「英語で言ってみる!」 と言うように。 まちがえても先生が笑顔で受け止めてくれるので、 自信がついたみたいです。",
    parent: "年中さんのママ", area: "浦和区", rating: 5,
  },
  {
    quote: "少人数なので、 ちゃんと一人ひとり話す時間があるのが決め手でした。 おうちの動画も子どもが自分で見ていて、 親としても助かっています。",
    parent: "小2 の男の子のママ", area: "中央区", rating: 5,
  },
  {
    quote: "代表の先生の発音が本物で、 子どもの「R」 の音が変わってびっくり。 マイページでレポートが届くので、 何を習ったか分かるのも安心です。",
    parent: "小4 の女の子のパパ", area: "南区", rating: 5,
  },
  {
    quote: "「英語きらい」 にならないか心配でしたが、 毎週「行きたい!」 と。 ゲームと歌で楽しく、 でもちゃんと身についているのが分かります。",
    parent: "年長さんのママ", area: "浦和区", rating: 4,
  },
];
```

### 08. Pricing（料金プラン ＝ サブスク強調機能）

**目的**: 月謝制（サブスク）を分かりやすく。 「思ったより通わせやすい」 を伝える。

**構成**:
- eyebrow: `07 / Pricing`
- 見出し: 「料金プラン」 / 「月謝制で、 はじめやすく。」
- **プランカード**（週1 / 週2 の 2 本立て、 おすすめに「人気」 リボン）:

**データ例**:
```ts
export const PRICING = {
  joinFee: "¥11,000",        // 入会金（税込）
  material: "年 ¥6,000 程度", // 教材費
  plans: [
    {
      name: "週1 プラン",
      price: "¥8,800",
      unit: "/ 月（税込）",
      desc: "まずは英語に慣れたいお子さまに。 全コース対応。",
      features: ["月4回レッスン", "会員サイト使い放題", "レッスンレポート"],
      popular: false,
    },
    {
      name: "週2 プラン",
      price: "¥15,400",
      unit: "/ 月（税込）",
      desc: "しっかり伸ばしたい・英検も目指すお子さまに。",
      features: ["月8回レッスン", "会員サイト使い放題", "英検サポート", "振替OK"],
      popular: true,
    },
  ],
  notes: [
    "ごきょうだい割: 2 人目以降 月謝 10% OFF",
    "月謝は Stripe による口座/カード自動引き落とし（サブスク決済）",
    "入会金は体験当日のご入会で半額キャンペーンあり",
  ],
};
```
- 下部に「サブスク決済（Stripe）で毎月自動引き落とし、 手続きラクラク」 の注記（強調機能の明示）

### 09. Trial ⭐（無料体験レッスン予約）

**目的**: SAMPLES_PLAN ③ 強調機能 **体験予約（cal.com）**。 サンプルでは disabled デモ。

**構成**:
- eyebrow: `08 / Trial`
- 見出し: 「まずは、 無料体験から。」
- リード: 「英語がはじめてでも大丈夫。 教室の雰囲気を見に来てください。 体験は無料、 しつこい勧誘はありません。」
- **予約 UI（cal.com 風、 disabled）**:
  - コース選択（プルダウン disabled）
  - カレンダー風の日付グリッド（クリック不可、 ◯ 印で空き表現）
  - 時間スロット（チップ、 disabled）
  - 予約ボタン: 「サンプル表示のため予約できません」（disabled）
- 下部 CTA: 「zuk-zuk AI STUDIO で、 体験予約システムを相談する →」

> 美容室 Phase 2 と共通の cal.com 連携基盤を想定。 サンプルは見た目だけのモック。

### 10. Access（教室 + Google Map）

**目的**: 「通えそう・送り迎えしやすい」。 店舗ありサンプルなので Map 復活（美容室と共通）。

**構成**:
- eyebrow: `09 / Access`
- 見出し: 「教室について」
- 上段: 住所 + 最寄駅 + 営業時間 + 定休日 + 外観写真 1 枚（`/images/school/exterior.jpg`、 一軒家・看板・植物）
- 下段: **Google Map iframe**（横幅 100%、 `aspect-[16/9]` ラッパー、 北浦和駅周辺中心、 架空住所のため駅周辺表示）

**データ例**:
```ts
export const ACCESS = {
  address: "埼玉県さいたま市浦和区北浦和 X-X-X 1F",
  station: "JR京浜東北線「北浦和駅」 西口 徒歩 6 分",
  hours: "火〜金 14:00-19:00 / 土 9:30-13:00",
  closed: "日曜・月曜",
  tel: "048-123-4567",
  parking: "近隣にコインパーキングあり / ベビーカー・自転車OK",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=...", // 北浦和駅中心、 CLI 自走中に取得 or placeholder
};
```

**注意**: iframe は `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, `allowFullScreen`。 実 URL は後で差替可能に。

### 11. FAQ

**目的**: 保護者の「あるある不安」 を解消。 美容室の FaqAccordion 流用。

**質問例**:
- 「英語がまったくはじめてでも大丈夫?」
- 「体験レッスンは本当に無料ですか? しつこい勧誘は?」
- 「月謝の支払い方法は?（サブスク決済について）」
- 「レッスンを休んだら振替できますか?」
- 「送り迎えは必要ですか? 親の付き添いは?」
- 「ごきょうだいで通うと割引はありますか?」
- 「会員サイト（マイページ・動画）はどう使うの?」

### 11-2. LINE バナー（Footer に組込み）⭐

**目的**: 保護者連絡は LINE が定番 → 自然な強調。 美容室と同じ実装パターン。

**構成**:
- Footer 上部に LINE バナー（全幅）
- 左: 「LINE で体験のお申し込み・ご質問を」 + 説明、 右: QR placeholder + 「友だち追加」 ボタン
- カラー: LINE 緑（`#06C755`）+ ホワイト
- ボタン: **サンプル誘導モード**（disabled、 「サンプル表示のため登録できません」）
- QR: placeholder（グレー枠 or `/images/school/sample-line-qr.png`）

### 12. Contact（サンプル誘導型）

**目的**: setup-sample-demo-mode 適用、 税理士/美容室と同仕様。

**構成**:
- eyebrow: `10 / Contact`
- 警告バナー: 「📌 このサイトは zuk-zuk AI STUDIO のサンプルです」
- フォーム UI（disabled）: 保護者名 / お子さまの年齢 / メール / 電話 / ご希望コース / ご相談内容
- 送信ボタン: 「サンプル表示のため送信できません」
- 下部 CTA: 「zuk-zuk AI STUDIO で相談する →」

---

## 4. ナビゲーション（Header）

```
[🌳 Hello Tree]   About / Courses / Teachers / Members / Pricing / Access   [無料体験 (disabled・コーラル pill)]
```

- スクロール時、 ヘッダー固定（sticky、 クリーム背景 + 影うっすら）
- ロゴは木アイコン + Baloo 2 の「Hello Tree」
- 「無料体験」 ボタンは常時表示・disabled → クリックで Trial へスクロール
- モバイル: ハンバーガー → ドロワー（角丸・クリーム）

---

## 5. Sanity スキーマ（`schoolNews`）

> 美容室は施術ギャラリーで Sanity 実証。 スクールは **お知らせ（休講・イベント・体験会情報）** で実証する（保護者向けに最も自然）。

```ts
// src/sanity/schemas/schoolNews.ts
import { defineField, defineType } from "sanity";

export const schoolNews = defineType({
  name: "schoolNews",
  title: "お知らせ",
  type: "document",
  fields: [
    defineField({ name: "title", title: "タイトル", type: "string", validation: r => r.required() }),
    defineField({ name: "category", title: "カテゴリ", type: "string", options: { list: ["イベント", "休講", "体験会", "お知らせ"] } }),
    defineField({ name: "publishedAt", title: "公開日", type: "datetime", validation: r => r.required() }),
    defineField({ name: "body", title: "本文", type: "text" }),
    defineField({ name: "thumbnail", title: "サムネイル", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "thumbnail" } },
});
```

- LP 内に小さな「お知らせ」 セクション（About 付近 or Footer 上）を置き、 Sanity 駆動（env 未設定時はハードコード fallback）
- `src/sanity/structure.ts` で Studio に表示

---

## 6. OG 画像（正方形セーフ必須）

`src/app/school/opengraph-image.tsx`:
- 中央 630x630 セーフエリアに集約
- 内容: 木アイコン + 「**Hello Tree**」 ロゴ + サブ「こども英会話教室 ・ さいたま市北浦和」 + 「まちがえても、 だいじょうぶ。」
- カラー: `#FFFDF7`（クリーム）背景 + `#4FA85A`（グリーン）+ 黄/コーラルの小アクセント
- 詳細は `setup-seo-ogp` Skill 参照

---

## 7. 完成イメージ・トーン（チェックポイント）

- [ ] 税理士・美容室と**明確に違う**「ポップ＆ウォーム」 になっている（クリーム＋多色＋角丸）
- [ ] 多色を使っても**安っぽくない**（ベースはクリーム、 差し色は面積控えめ）
- [ ] 「子供がワクワク」 と「親が安心」 が**両立**している
- [ ] 会員マイページ・会員限定コンテンツのデモが「**こんな機能が作れる**」 と一目で伝わる
- [ ] スマホで見たとき、 コースカード・講師・声が綺麗に整列
- [ ] OG 画像は LINE / Slack でも左右切れない（中央 630x630 セーフ）
- [ ] 「まちがえてOK」 のコンセプトがコピー全体で一貫している

---

## 8. 実装フロー（CLI 自走想定）

詳細は `night-run-004.md` 参照。 概要:

```
Phase A: ディレクトリ + 依存 + デザイントークン（~30 分）
Phase B: LP 全 12 セクション + Header/Footer 実装（~3-4h）
Phase C: 会員機能（薄い実認証: Auth.js + middleware + mypage / lessons + API）⭐（~2-2.5h）
Phase D: Sanity 連動（schoolNews + homeworkContent）（~1h）
Phase E: SEO/OGP/法務ページ（~1h）
Phase F: 動作確認 + 微調整（~30 分）
```

合計想定 8-10 時間（CLI 夜間自走、 acceptEdits + caffeinate -i）
会員機能の仕様詳細は `sample-school-membership-spec.md` を正典とする。

---

## 9. 関連リソース

- ヒアリング: `sample-school-hearing.md`
- 画像要件: `../../docs/IMAGE-REQUESTS-SCHOOL.md`
- Claude Design 依頼文: `sample-school-claude-design-brief.md`
- CLI 自走 Plan: `night-run-004.md`
- 業務ルール正典: `../../../zuk-zuk-ai-studio/docs/CLIENT_PROJECT_FLOW.md`
- Skill:
  - `../../../zuk-zuk-template/.claude/skills/setup-image-workflow.md`
  - `../../../zuk-zuk-template/.claude/skills/setup-seo-ogp.md`
  - `../../../zuk-zuk-template/.claude/skills/setup-sanity-cms.md`
  - `../../.claude/skills/setup-sample-demo-mode.md`
- 参照元（同構造）: `sample-salon-design-brief.md`
