# 子供英会話教室サンプル `Hello Tree` 画像リクエスト

> 試行 #4 (#69) で必要な画像のリスト。
> user が AdobeStock or AI 生成で準備 → `public/images/school/` 配下に配置。
> 詳細な配置ルールは Skill `setup-image-workflow.md` 参照。
> ⚠️ **子供が写る画像の権利・モデルリリースに注意**。 サンプルなので AI 生成を強く推奨（実在児童の写真トラブル回避）。

---

## 📋 画像準備チェックリスト

### 🏫 Hero / Access（教室・外観）

| # | ファイル名 | 用途 | サイズ目安 | 指定 | 推奨ソース |
|---|---|---|---|---|---|
| 1 | `hero.jpg` | Hero メイン | 1200x900 (4:3) | **子供がレッスンを楽しんでいる / 先生とハイタッチ・笑顔**、 明るい自然光、 カラフルだが上品な教室、 ポップ＆ウォーム | AI 生成（推奨）/ AdobeStock「子供 英語 レッスン 笑顔」 |
| 2 | `exterior.jpg` | Access 用 | 800x1000 (4:5 縦) | **住宅街の一軒家を改装した小さな教室の外観**、 木の看板「Hello Tree」、 植物、 のぼり、 明るい雰囲気 | AI 生成 or AdobeStock |

### 👩‍🏫 Teachers（講師 3 名、 明るい笑顔・同トーン）

| # | ファイル名 | 用途 | サイズ目安 | 指定 | 推奨ソース |
|---|---|---|---|---|---|
| 3 | `teacher-emily.jpg` | 代表 Emily | 1000x800 (5:4 横) or 800x1000 | **30代後半のハーフ女性（日加ミックス）**、 明るく活発な笑顔、 ナチュラルメイク、 カジュアルきれいめ、 教室で。 親しみ＋知的さ | AI 生成（推奨、 一貫スタイル）|
| 4 | `teacher-mike.jpg` | ネイティブ Mike | 800x1000 (4:5 縦) | **30代の白人男性ネイティブ講師**、 とびきり明るい笑顔、 フレンドリー、 カジュアル、 教室で | AI 生成 |
| 5 | `teacher-aya.jpg` | バイリンガル Aya | 800x1000 (4:5 縦) | **20代後半の日本人女性**、 やさしい笑顔、 落ち着いた親しみ、 教室で | AI 生成 |

> 💡 **AI 生成のコツ**: 3 名とも同じ照明・背景トーン（明るい教室、 暖色光、 カラフルな壁の一部）で生成し統一感を。

### 🎒 Lesson / 教室の様子（レッスン風景）

| # | ファイル名 | 用途 | サイズ目安 | 指定 | 推奨ソース |
|---|---|---|---|---|---|
| 6 | `lesson-1.jpg` | レッスン Step 1〜2 | 800x600 (4:3) | **子供たちが歌・ゲームで体を動かす**、 笑顔、 フラッシュカード | AI 生成 |
| 7 | `lesson-2.jpg` | レッスン Step 3 | 800x600 (4:3) | **少人数で一人ずつ発話**、 先生が耳を傾ける、 手を挙げる子 | AI 生成 |
| 8 | `classroom-1.jpg` | 教室風景 | 800x800 (1:1) | **カラフルだが上品な教室全景**、 絵本棚、 アルファベット装飾、 木の床、 自然光 | AI 生成 |
| 9 | `classroom-2.jpg` | 教室風景 | 800x800 (1:1) | **子供の作品・英語ポスター・小物のクローズアップ**、 手づくり感、 あたたかさ | AI 生成 |

### 🎬 Membership デモ（会員コンテンツ サムネ）

> `/school/lessons` のコンテンツカード用サムネ。 イラスト的でも実写でも可。 軽量で OK。

| # | ファイル名 | 用途 | サイズ目安 | 指定 |
|---|---|---|---|---|
| 10-15 | `content/thumb-{1..6}.jpg` | 動画/PDF サムネ 6 枚 | 600x400 (3:2) | フォニックスソング動画 / アルファベットカード / 宿題プリント / 塗り絵（Fruits・Animals）/ 英語の歌 等。 **イラスト調・明るい配色**。 一部は鍵🔒オーバーレイ用 |

> 💡 これらは `opengraph-image.tsx` のように **コードで生成（プレースホルダ div + アイコン）でも代替可**。 画像準備は任意。

### 🏷 OG 画像 / ファビコン

| # | ファイル名 | 用途 | サイズ目安 | 指定 |
|---|---|---|---|---|
| 16 | `og.png` | OG 画像 | 1200x630 | `opengraph-image.tsx` で動的生成、 user 用意不要（コードで作る）。 中央 630x630 セーフ |
| 17 | `favicon.ico` | ファビコン | 64x64 | 木「🌳」 or 「H」+葉 のシンプルロゴ | デザイナー作成 or 自作 |
| 18 | `sample-line-qr.png` | LINE QR placeholder | 200x200 | グレー枠 + "QR (sample)"。 コードの div で代替可（任意） |

---

## 📁 配置例

```
public/images/school/
├── hero.jpg                   ← Hero メイン
├── exterior.jpg               ← Access 用外観
├── teacher-emily.jpg          ← 代表
├── teacher-mike.jpg           ← ネイティブ
├── teacher-aya.jpg            ← バイリンガル
├── lesson-1.jpg               ← レッスン風景
├── lesson-2.jpg
├── classroom-1.jpg            ← 教室
├── classroom-2.jpg
├── content/
│   ├── thumb-1.jpg            ← 会員コンテンツ サムネ
│   ├── thumb-2.jpg
│   ├── thumb-3.jpg
│   ├── thumb-4.jpg
│   ├── thumb-5.jpg
│   └── thumb-6.jpg
├── favicon.ico
└── sample-line-qr.png
```

---

## 🎨 全体トーンの統一指針

すべての画像で **共通のトーン** を保つこと:

| 要素 | 指針 |
|---|---|
| **照明** | 明るい自然光 + 暖色（ハイキー、 あたたかい） |
| **彩度** | 元気だが**上品**（ビビッドすぎない、 ペールトーン寄り） |
| **カラーアクセント** | クリーム / リーフグリーン / サンイエロー / コーラル / スカイブルー |
| **避けたいトーン** | 蛍光色、 ケバい原色、 暗い・ローキー、 無機質・スタジオ的、 チェーン塾の安っぽさ |
| **雰囲気** | あたたかい、 楽しい、 安心、 手づくり感、 「まちがえてOK」 のおおらかさ |
| **モデル（子供）** | 自然な笑顔、 多様、 やらせっぽくない。 **AI 生成推奨**（権利・モデルリリース回避） |

---

## 📝 user 準備の進め方（推奨）

### Phase 1: 必須画像（6 枚）— まずはこれで dev が走る
- `hero.jpg`（1）
- `teacher-emily.jpg` 〜 `teacher-aya.jpg`（3）
- `lesson-1.jpg`（1）
- `exterior.jpg`（1）

### Phase 2: リッチ表示（3 枚追加）
- `lesson-2.jpg`, `classroom-1.jpg`, `classroom-2.jpg`

### Phase 3: 細部（任意・コード代替可）
- `content/thumb-{1..6}.jpg`, `favicon.ico`, `sample-line-qr.png`

---

## 💡 AI 画像生成のおすすめプロンプト例

### Hero / Lesson / Classroom（一貫トーン）
```
A bright, warm children's English classroom in a Japanese residential area,
kids (age 4-9) smiling and playing learning games with a teacher,
colorful but tasteful interior, picture books, alphabet decorations,
wooden floor, soft natural light, cream and leaf-green color palette,
cheerful and cozy atmosphere, photorealistic, editorial style, 35mm
```

### Teachers（明るい笑顔・同トーン）
```
A friendly [late-30s mixed Japanese-Canadian woman / 30s American man /
late-20s Japanese woman] English teacher for kids, bright cheerful smile,
casual smart clothing, standing in a warm colorful classroom,
soft natural light, cream and green tones, approachable and trustworthy,
photorealistic, editorial portrait
```

### 会員コンテンツ サムネ（イラスト調）
```
A cute flat-illustration thumbnail for a kids English learning video,
phonics theme, alphabet letters, friendly animals, leaf-green and yellow
and coral palette, rounded shapes, clean and warm, no text
```

> ⚠️ **重要**: 実在の子供の写真を使う場合はモデルリリース必須。 サンプルでは **AI 生成で統一** を強く推奨。

---

## 🔗 関連ドキュメント

- 設計書: `.claude/plans/sample-school-design-brief.md`
- ヒアリング: `.claude/plans/sample-school-hearing.md`
- CLI 自走 Plan: `.claude/plans/night-run-004.md`
- Skill: `../../zuk-zuk-template/.claude/skills/setup-image-workflow.md`
- 参照元（同構造）: `IMAGE-REQUESTS-SALON.md`
