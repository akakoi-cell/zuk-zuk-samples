# 夜間自走 試行 #4: 子供英会話教室サンプル `Hello Tree` 本格実装

> CLI Claude Code（`claude --permission-mode acceptEdits` + `caffeinate -i`）で夜間自走させるための Plan。
> 設計書: `sample-school-design-brief.md` を必ず参照。
> ヒアリング: `sample-school-hearing.md`
> 画像要件: `../../docs/IMAGE-REQUESTS-SCHOOL.md`
> コンセプト: 「ネイティブの会話を、 まちがえてOK の空間で。」

---

## 0. 前提条件

### 起動前チェック（user 確認）
- [ ] `public/images/school/` に必須画像（最低 6 枚）配置済み
  - hero.jpg / teacher-{emily,mike,aya}.jpg / lesson-1.jpg / exterior.jpg
- [ ] Sanity プロジェクト準備済み（**税理士・美容室と同じプロジェクト `5synfpav` を流用**、 schema だけ分ける = `schoolNews` 追加）
- [ ] `.env.local` の `NEXT_PUBLIC_SITE_URL` が `http://localhost:3004` に設定済み（税理士・美容室と共通）
- [ ] dev server 停止中（CLI が起動するため）

### 🎨 Claude Design 成果物（重要）

設計書 + Claude Design カンプを必ず参照すること:

- **HTML カンプ**: `.claude/plans/claude-design-school/index.html`（要: Step 4 で生成・保存）
- **CSS デザイントークン**: `.claude/plans/claude-design-school/styles.css`
- **スクショ参考画像**: `.claude/plans/claude-design-school/uploads/`

→ レイアウト・余白・タイポグラフィの細部は Claude Design のカンプを「正典」 として参照、 Tailwind v4 で再構築。
→ inline スタイル臭（`style="width: 40px"` 等）はバグ、 無視して CSS で正しく実装。
→ **会員デモページ（mypage / lessons）・Google Map iframe・LINE バナーは Claude Design に未実装**の可能性が高い → 設計書 Section 06 / 10 / 11-2 を見て CLI が新規実装。
→ Claude Design が未実施でも、 設計書だけで実装可能なように記述してある。 カンプがあれば見た目を優先。

### CLI 起動コマンド（user 実行）

```bash
cd "/Users/kakoiatsushi/Projects/zuk-zuk AI DESIGN STUDIO/zuk-zuk-samples"
caffeinate -i claude --permission-mode acceptEdits
```

その後、 CLI 内で:
```
@.claude/plans/night-run-004.md を読んで Phase A から順番に実装してください。
```

---

## 1. Phase A: ディレクトリ + 依存セットアップ（~30 分）

### A-1. ディレクトリ構造作成

```bash
mkdir -p src/app/school/legal/{privacy,terms,tokushoho}
mkdir -p src/app/school/{mypage,lessons}
mkdir -p src/components/school
mkdir -p src/sanity/schemas
mkdir -p public/images/school/content
```

### A-2. school-content.ts 作成

`src/lib/school-content.ts` を新規作成。 design-brief.md Section 3 のデータをすべて移植:

- `SITE_SCHOOL`（教室名・URL・description）
- `COURSES`（4 コース）
- `TEACHERS`（3 名、 Emily に `featured: true`）
- `LESSON_STEPS`（4 ステップ）
- `VOICES`（4 件）
- `PRICING`（joinFee / material / plans 2 本 / notes）
- `ACCESS`（住所・営業時間・連絡先・mapEmbedUrl）
- `FAQ`（7 件）
- `HERO_COPY`（案 1「まちがえても、 だいじょうぶ。」）
- `ABOUT`（見出し + リード + 選ばれる理由 4 つ）
- `MEMBERSHIP_*`（mypage / lessons のモックデータ）
- `NEWS_FALLBACK`（Sanity 未設定時のお知らせ fallback、 3-4 件）

### A-3. styles.css 作成

`src/app/school/styles.css` に Tailwind v4 `@theme` でカラー/フォント/角丸トークン追加（design-brief Section 1）。
- フォント読込: Zen Maru Gothic / Baloo 2 / Quicksand / Nunito / Caveat（next/font or `<link>`）

### A-4. layout.tsx 作成（metadata + JSON-LD）

`src/app/school/layout.tsx`:
- `metadata` で title / description / OG
- `jsonLd` で **EducationalOrganization**（+ LocalBusiness 的 address/openingHours）
- address / openingHours / telephone を `school-content.ts` の ACCESS から引用

---

## 2. Phase B: LP コンポーネント実装（~3-4h）

### 実装順序（依存少 → 多）

1. **B-1. ui.tsx**（基盤、 美容室 `salon/ui.tsx` から流用 + 色差替）
   - Section / Eyebrow / Icon / Btn / **Pill**（コース色チップ）
   - 角丸を大きめ（`--radius-school`）に

2. **B-2. SchoolHeader.tsx**
   - ロゴ「🌳 Hello Tree」（左、 Baloo 2 + 木アイコン）
   - ナビ「About / Courses / Teachers / Members / Pricing / Access」
   - 「無料体験」 ボタン（右、 コーラル pill、 disabled、 Trial へスクロール）
   - sticky 固定（クリーム背景 + 薄影）
   - mobile: hamburger → 角丸ドロワー

3. **B-3. SchoolFooter.tsx**（LINE バナー組込み）
   - **LINE バナー**（Footer 上部、 全幅、 LINE 緑 `#06C755`）
     - 左: 「LINE で体験のお申し込み・ご質問を」 + 「友だち追加」 ボタン（disabled）
     - 右: QR placeholder（グレー枠 or div）
     - サンプル誘導モード（「サンプル表示のため登録できません」）
   - 教室名 / 住所 / 営業時間 / 法務リンク / © 2026 Hello Tree

4. **B-4. SchoolHero.tsx**（01）
   - 背景クリーム + 木・葉・小鳥イラスト（角に、 控えめ）
   - eyebrow「Saitama ・ Kita-Urawa / こども英会話教室」
   - ロゴ大「Hello Tree」（Baloo 2、 "Hello" に Caveat or 木アイコン）
   - HERO_COPY（案 1、 3 行）+ サブコピー
   - メイン画像 `/images/school/hero.jpg`（角丸大 or ブロブマスク）
   - CTA: 「無料体験レッスン」（コーラル pill, disabled→Trial）+「コースを見る」（アウトライン→Courses）

5. **B-5. SchoolAbout.tsx**（02）
   - eyebrow「01 / About」
   - 見出し「まちがえることが、 いちばんの近道。」
   - リード文
   - **選ばれる理由 4 カード**（grid md:grid-cols-2、 各カード 1 アクセント色 + アイコン）

6. **B-6. SchoolCourses.tsx**（03）
   - eyebrow「02 / Courses」
   - 見出し「コース紹介」
   - 4 カード（grid sm:grid-cols-2 lg:grid-cols-4）、 上部に色帯 + 対象年齢バッジ + アイコン + desc + points チップ

7. **B-7. SchoolTeachers.tsx**（04）
   - eyebrow「03 / Teachers」
   - 見出し「先生たちのこと」
   - Emily は大きめ（横長 or 2 カラム、 featured）、 Mike/Aya は横並び
   - 各カード: 顔写真（角丸/ブロブ）+ role + 英名（Baloo 2）+ 日本名 + profile + tags

8. **B-8. SchoolLesson.tsx**（05）
   - eyebrow「04 / Lesson」
   - 見出し「レッスンの 1 日」
   - 4 ステップのタイムライン（番号 + 写真 + 短文）
   - 下部に教室風景写真 2-3 枚（classroom-1/2.jpg）

9. **B-9. SchoolMembership.tsx**（06）⭐ **強調機能ショーケース**
   - eyebrow「05 / Members」
   - 見出し「教室の外でも、 英語はつづく。」+ リード
   - **2 枚プレビューカード**: 保護者マイページ → `/school/mypage` / おうち学習コンテンツ → `/school/lessons`
   - 各カードに「（デモ）」 ボタン（実際に遷移可能にする）
   - 注記: 「※ サンプルではデモ画面をご覧いただけます」

10. **B-10. SchoolVoice.tsx**（07）
    - eyebrow「06 / Voice」
    - 見出し「通わせている、 おうちの声。」
    - 2x2 グリッド 4 件カード（引用符 + 本文 + 保護者属性 + star）

11. **B-11. SchoolPricing.tsx**（08）⭐ **サブスク強調**
    - eyebrow「07 / Pricing」
    - 見出し「料金プラン」
    - 入会金 + 教材費 + プラン 2 カード（週2 に「人気」 リボン）
    - notes（ごきょうだい割 / Stripe サブスク自動引き落とし / キャンペーン）
    - 数字は Nunito

12. **B-12. SchoolTrial.tsx**（09）⭐ **体験予約強調**
    - eyebrow「08 / Trial」
    - 見出し「まずは、 無料体験から。」+ リード
    - **cal.com 風 予約 UI（全部 disabled）**: コース選択 / カレンダー風日付グリッド / 時間スロット chip / 予約ボタン（「サンプル表示のため予約できません」）
    - 下部 CTA: 「zuk-zuk AI STUDIO で体験予約システムを相談する →」

13. **B-13. SchoolAccess.tsx**（10）⭐ **Google Map**
    - eyebrow「09 / Access」
    - 見出し「教室について」
    - 上段: 住所 + 駅 + 営業時間 + 定休日 + 外観写真（exterior.jpg）+ 駐車/ベビーカー注記
    - 下段: **Google Map iframe**（全幅、 aspect-[16/9]、 北浦和駅中心）
      - loading="lazy", allowFullScreen, referrerPolicy="no-referrer-when-downgrade"

14. **B-14. SchoolFaq.tsx**（11）
    - eyebrow「10 / FAQ」
    - 美容室 SalonFaq のアコーディオンを流用、 色差替
    - 7 件の Q&A

15. **B-15. SchoolContact.tsx**（12）— **setup-sample-demo-mode 適用**
    - eyebrow「11 / Contact」
    - サンプル警告バナー
    - フォーム UI（disabled）: 保護者名 / お子さまの年齢 / メール / 電話 / ご希望コース / ご相談内容
    - 送信ボタン: 「サンプル表示のため送信できません」
    - 下部 CTA: 「zuk-zuk AI STUDIO で相談する →」

16. **B-16. page.tsx**（全セクション統合）
    - Header / Hero / About / Courses / Teachers / Lesson / Membership / Voice / Pricing / Trial / Access / FAQ / Contact / Footer

---

## 3. Phase C: 会員デモページ実装（~1-1.5h）⭐ 試行 #4 の新規挑戦

> SAMPLES_PLAN ③ の目玉。 認証・決済は**実装せず、 静的モック**で「こういう機能が作れます」 を見せる。

### C-1. `/school/mypage`（保護者マイページ・モック）

`src/app/school/mypage/page.tsx`:
- 上部に **サンプル誘導バナー**（「📌 これは zuk-zuk AI STUDIO のサンプル（デモ画面）です」）
- ヘッダー: 「こんにちは、 さくらママ 👋」 + ログアウト風ボタン（disabled）
- カード群（design-brief Section 06 デモページ A 参照）:
  - お子さま情報（ゆうとくん・Kinder・週1・通学 8 ヶ月目）
  - 出席スタンプ（スタンプラリー風、 今月 3/4 回 🌟）
  - 最新レッスンレポート（先生コメント + star）
  - 進捗バー（フォニックス進捗・英検目標、 グリーン）
  - 今月の月謝（「¥8,800（お支払い済み）」 + Stripe 風バッジ）
- 戻る導線: 「← Hello Tree トップへ」（/school/）

### C-2. `/school/lessons`（会員限定コンテンツ・モック）

`src/app/school/lessons/page.tsx`:
- 上部に同じ **サンプル誘導バナー**
- 見出し「おうち学習コンテンツ」 + フィルタチップ（すべて/動画/歌/宿題PDF/塗り絵、 見た目のみ）
- **コンテンツカードグリッド**（grid sm:grid-cols-2 lg:grid-cols-3）:
  - 各カード: サムネ（content/thumb-*.jpg or プレースホルダ div）+ タイトル + タイプアイコン + 所要時間
  - **一部カードに 🔒 ロックオーバーレイ**（「会員限定」）
- 注記: 「※ 動画・PDF は代表 Emily 制作のサンプル。 実装ではミドルウェアで会員認証 + 限定公開します」
- 戻る導線: 「← Hello Tree トップへ」

### C-3. 動作確認

- http://localhost:3004/school/mypage 表示、 バナー目立つ、 全 disabled
- http://localhost:3004/school/lessons 表示、 ロックアイコン表示、 画像なくても崩れない（プレースホルダ）

---

## 4. Phase D: Sanity 連動（~1h）

### D-1. schoolNews スキーマ作成

`src/sanity/schemas/schoolNews.ts`（design-brief Section 5 参照）:
- title / category（イベント/休講/体験会/お知らせ）/ publishedAt / body / thumbnail

### D-2. structure.ts（Studio）に追加

`src/sanity/structure.ts` を編集、 既存 TaxWork / salonWork に並べて schoolNews を追加。 「英会話教室サンプル」 グループでまとめる。

### D-3. お知らせセクション or コンポーネントの Sanity 連動

- LP 内に小さな「お知らせ」（About 付近 or Footer 上）を置く
- `client.fetch(\`*[_type == "schoolNews"] | order(publishedAt desc)[0...4]\`)` で取得
- env 未設定時 or 0 件時: `NEWS_FALLBACK`（3-4 件）でフォールバック
- ISR（revalidate 60）

### D-4. 動作確認

- http://localhost:3004/studio で「お知らせ（英会話教室）」 が見える
- 1 件作成 → /school/ のお知らせに反映確認

---

## 5. Phase E: SEO/OGP/法務（~1h）

### E-1. opengraph-image.tsx（中央 630x630 セーフ）

`src/app/school/opengraph-image.tsx`（design-brief Section 6 + setup-seo-ogp Skill）:
- 中央 630x630 セーフ
- 内容: 木アイコン + 「Hello Tree」 + 「こども英会話教室 ・ さいたま市北浦和」 + 「まちがえても、 だいじょうぶ。」
- カラー: bg=`#FFFDF7`, primary=`#4FA85A`, accent=黄/コーラル
- ⚠️ 和文を使うため @vercel/og のフォント読込に注意（Zen Maru Gothic を fetch、 or 欧文 + 最小限和文）

### E-2. sitemap.ts / robots.ts（拡張）

既存に school ルート追加:
- `/school/`（priority 1.0）
- `/school/mypage`, `/school/lessons`（priority 0.5）
- `/school/legal/{privacy,terms,tokushoho}`（priority 0.3）
- robots.ts は `/studio/` を引き続き Disallow

### E-3. JSON-LD（EducationalOrganization）

`src/app/school/layout.tsx` の jsonLd:
```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Hello Tree English School",
  address: {
    "@type": "PostalAddress",
    streetAddress: "北浦和 X-X-X 1F",
    addressLocality: "浦和区",
    addressRegion: "埼玉県さいたま市",
    addressCountry: "JP",
  },
  telephone: "+81-48-123-4567",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday","Wednesday","Thursday","Friday"], opens: "14:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:30", closes: "13:00" },
  ],
  image: `${SITE.url}/school/opengraph-image`,
};
```

### E-4. 法務 3 ページ（税理士/美容室から流用）

`src/app/school/legal/{privacy,terms,tokushoho}/page.tsx`:
- 既存サンプルの法務ページから流用、 「Hello Tree」 に置換
- **特商法はサブスク決済があるため要点を明記**（月謝・解約・返金方針、 ただしサンプル簡易）
- サンプル注記を冒頭に必ず

---

## 6. Phase F: 動作確認 + 微調整（~30 分）

### F-1. ローカル確認チェックリスト

```bash
PORT=3004 npm run dev
```

http://localhost:3004/school/ で:
- [ ] 全 12 セクション表示
- [ ] Hero に画像 + コピー + CTA（無料体験 disabled）
- [ ] About 選ばれる理由 4 カードが色分けで整列
- [ ] Courses 4 コースが色帯付きで並ぶ
- [ ] Teachers Emily が主役、 Mike/Aya 横並び
- [ ] Lesson 4 ステップタイムライン
- [ ] Members の 2 カードから mypage / lessons に遷移できる ⭐
- [ ] Voice 2x2 カード
- [ ] Pricing 2 プラン + 人気リボン、 サブスク注記
- [ ] Trial 予約 UI（全 disabled）+ CTA
- [ ] Access 住所 + 外観写真 + Google Map iframe
- [ ] FAQ アコーディオン動作
- [ ] Contact サンプル警告 + form disabled + AI STUDIO CTA
- [ ] Footer LINE バナー（disabled）+ 法務リンク
- [ ] /school/mypage 表示・全 disabled・バナー
- [ ] /school/lessons 表示・ロックアイコン
- [ ] /school/opengraph-image で OG（1200x630）表示、 中央 630 で全情報読める
- [ ] /sitemap.xml に /school/ が含まれる

### F-2. レスポンシブ確認

iPhone SE 375 / iPad 768 / Desktop 1440 で:
- [ ] Hero コピー読める、 画像崩れない
- [ ] Courses 4 → 2 → 1 列に綺麗に折り返す
- [ ] Teachers / Voice が壊れない
- [ ] Pricing カードが縦積みで崩れない
- [ ] Header ナビ入りきる（入らねば hamburger）
- [ ] mypage / lessons がモバイルで読める

### F-3. ビルド確認

```bash
npm run build
```
→ Type error / Lint error なし、 全 page を static or ISR で出力できる

---

## 7. 試行 #4 で実証したいこと

| 観点 | 試行 #3（美容室） | 試行 #4（Hello Tree）で確認 |
|---|---|---|
| トーン | 静謐ナチュラル | **ポップ＆ウォーム**（多色を上品に保てるか） |
| 強調機能 | Google Map / LINE | **会員マイページ + 会員限定コンテンツ（静的モック）** ⭐ 新規 |
| サブページ | Gallery 単一画像 | **mypage / lessons の独立ページ 2 枚** |
| サブスク表現 | なし | **月謝 = Stripe サブスク** を UI で示唆 |
| Sanity 連動 | salonWork（ギャラリー） | **schoolNews（お知らせ）** で別パターン検証 |
| セクション数 | 9 | **12 + デモ 2 ページ** |
| フォント | 丸ゴ + serif | **丸ゴ + 丸み欧文（Baloo 2/Quicksand）** |

---

## 8. 試行 #3 の反省点と対処

| 反省点 | 対処（試行 #4） |
|---|---|
| 画像未配置で崩れ | mypage/lessons は**プレースホルダ div で画像なしでも成立**させる |
| 多色で安っぽくなりやすい | ベースはクリーム固定、 差し色は面積制限（design-brief の鉄則を厳守） |
| OG 和文フォント | @vercel/og で Zen Maru Gothic を fetch、 失敗時は欧文 fallback |
| 認証実装の誘惑 | **会員機能は静的モックに徹する**（認証/決済は実装しない、 サンプルの範囲を超えない） |

---

## 9. 完成後の納品物

1. ✅ `src/app/school/` 配下に動くサンプルサイト（12 セクション）
2. ✅ 会員デモページ 2 枚（mypage / lessons）⭐
3. ✅ Sanity スキーマ `schoolNews` + Studio で編集可能
4. ✅ OG 画像（正方形セーフ）
5. ✅ 法務 3 ページ（特商法にサブスク要点）
6. ✅ サンプル誘導モード組み込み済み
7. ✅ ローカル動作確認済み
8. ✅ git commit + push 済み
9. ✅ 朝確認用 summary（`docs/NIGHT-RUN-004-SUMMARY.md`）

---

## 10. 実装後の人間チェックポイント

1. **見た目**: http://localhost:3004/school/ をスクロール、 税理士・美容室と並べて「第 3 のトーン」 になっているか
2. **会員デモ**: mypage / lessons が「機能の見せ場」 として伝わるか ⭐
3. **画像**: 全画像配置済みか、 placeholder 残ってないか
4. **Sanity**: /studio で「お知らせ」 を 1 件作成 → 反映確認
5. **OG**: /school/opengraph-image を開いて中央 630x630 で全情報読めるか
6. **誘導 CTA**: Contact / Trial / LINE で AI STUDIO 導線が機能
7. **commit summary**: NIGHT-RUN-004-SUMMARY.md を読む
8. 問題なければ Vercel デプロイ準備

---

## 11. 関連リソース

- 設計書: `sample-school-design-brief.md`
- ヒアリング: `sample-school-hearing.md`
- 画像要件: `../../docs/IMAGE-REQUESTS-SCHOOL.md`
- Claude Design 依頼文: `sample-school-claude-design-brief.md`
- 参照元（同構造）: `night-run-003.md`（美容室）
- Skill:
  - `../../zuk-zuk-template/.claude/skills/setup-image-workflow.md`
  - `../../zuk-zuk-template/.claude/skills/setup-sanity-cms.md`
  - `../../zuk-zuk-template/.claude/skills/setup-seo-ogp.md`
  - `../../zuk-zuk-template/.claude/skills/setup-vercel-deploy.md`
  - `../../zuk-zuk-template/.claude/skills/setup-legal-pages.md`
  - `../.claude/skills/setup-sample-demo-mode.md`
