# 美容室サンプル `& moi` 画像リクエスト

> 試行 #3 (#68) で必要な画像 26 枚のリスト。
> user が AdobeStock or AI 生成で準備 → `public/images/salon/` 配下に配置。
> 詳細な配置ルールは Skill `setup-image-workflow.md` 参照。

---

## 📋 画像準備チェックリスト

### 🏠 Hero / Access (店舗外観・入口)

| # | ファイル名 | 用途 | サイズ目安 | 指定 | 推奨ソース |
|---|---|---|---|---|---|
| 1 | `hero.jpg` | Hero 背景 | 1920x1080 (16:9) | **武蔵小杉エリアの住宅街にある小さな美容室の外観**、 ガラス張り、 やわらかな自然光、 入口にドライフラワーや植物、 落ち着いた木の素材、 ヴィンテージ感 | AdobeStock 「小さな美容室 外観 自然光」 / AI 生成 |
| 2 | `exterior.jpg` | Access 用 | 800x1000 (4:5 縦) | 同上、 でも別カット (例: ガラス越しに店内が少し見える、 立て看板) | AdobeStock or AI 生成 |

### 🪑 About (インテリア 4 枚正方形グリッド)

| # | ファイル名 | 用途 | サイズ目安 | 指定 | 推奨ソース |
|---|---|---|---|---|---|
| 3 | `interior-1.jpg` | About 1/4 | 800x800 (1:1) | **店内全景**、 自然光、 ヴィンテージ家具 (木の椅子、 古いミラー)、 ドライフラワー | AdobeStock or AI 生成 |
| 4 | `interior-2.jpg` | About 2/4 | 800x800 (1:1) | **セット面のクローズアップ**、 ミラー + ヘアアイロン + クシ + ハサミ等の道具、 木のカウンター | AdobeStock or AI 生成 |
| 5 | `interior-3.jpg` | About 3/4 | 800x800 (1:1) | **ドライフラワー + 雑誌**、 窓辺、 古本、 コーヒーカップ等、 「待ち時間にゆっくり読める雰囲気」 | AdobeStock or AI 生成 |
| 6 | `interior-4.jpg` | About 4/4 | 800x800 (1:1) | **窓辺の植物 + 本棚**、 観葉植物、 自然光、 「ジャズが流れる空間」 を視覚化 | AdobeStock or AI 生成 |

### 👤 Stylists (スタッフ 3 名、 同トーン推奨)

| # | ファイル名 | 用途 | サイズ目安 | 指定 | 推奨ソース |
|---|---|---|---|---|---|
| 7 | `staff-1.jpg` | Owner (山田) | 800x1000 (4:5 縦) | **40 代女性、 ナチュラルなショート or ボブ**、 やわらかい笑顔、 自然光、 ベージュ系の服、 サロンの中で | AdobeStock 「美容師 女性 40代 ナチュラル」 / AI (一貫したスタイル) |
| 8 | `staff-2.jpg` | Stylist (鈴木) | 800x1000 (4:5 縦) | **30 代前半女性、 ロングヘアまたはミディアム**、 落ち着いた表情、 ベージュ系の服、 同じトーン | 同上 |
| 9 | `staff-3.jpg` | Stylist (田中) | 800x1000 (4:5 縦) | **20 代後半男性、 ナチュラル**、 ややクールな表情、 落ち着いた服 | 同上 |

> 💡 **AI 生成のコツ**: 3 名とも同じプロンプト系統 (例: 「natural lighting, beige aesthetic, modern hair salon staff」) で生成し、 一貫したスタイル感を出す。

### 🖼 Gallery (施術後写真のみ、 12-20 枚)

> **重要**: ビフォー写真は不要、 **施術後のみ**。 様々な髪型・カラー・スタイルを混在させる。

| # | ファイル名 | カテゴリ | サイズ目安 | 指定 |
|---|---|---|---|---|
| 10-13 | `works/cut-{1..4}.jpg` | CUT 4 枚 | 800x800 (1:1) | ナチュラルなショート / ボブ / ミディアム / ロング、 様々な顔の向き、 自然光 |
| 14-17 | `works/color-{1..4}.jpg` | COLOR 4 枚 | 800x800 (1:1) | ベージュ系 / グレージュ / オーガニック系 / ハイライト、 ロング・ミディアム混在 |
| 18-20 | `works/perm-{1..3}.jpg` | パーマ 3 枚 | 800x800 (1:1) | ナチュラルパーマ / ゆるふわ / 縮毛矯正後 |
| 21-22 | `works/treatment-{1..2}.jpg` | トリートメント 2 枚 | 800x800 (1:1) | ツヤ感の出た髪、 サラサラ感が伝わるもの |

> 💡 **AdobeStock 検索**: 「hair salon style after」 「japanese hair model」 等で探すと豊富。
> 💡 **AI 生成**: 一貫した「ナチュラル」 「落ち着き」 トーンで全枚生成。

### 🏷 OG 画像 (1 枚、 正方形セーフ)

| # | ファイル名 | 用途 | サイズ目安 | 指定 |
|---|---|---|---|---|
| 23 | `og.png` | OG 画像 | 1200x630 | サイト/Next.js の `opengraph-image.tsx` で動的生成、 user 用意不要 (コードで作る) |

> 💡 OG 画像は **中央 630x630 セーフエリア** にコンテンツ集約必須 (LINE / Slack / Discord 1:1 クロップ対応)。 詳細は `setup-seo-ogp` Skill 参照。

### 🎨 ファビコン (1 枚)

| # | ファイル名 | 用途 | サイズ目安 | 指定 |
|---|---|---|---|---|
| 24 | `favicon.ico` | ファビコン | 64x64 (or 32x32) | ロゴ「&」 マークだけ、 シンプル | デザイナー作成 or 自作 |

---

## 📁 配置例

```
public/images/salon/
├── hero.jpg                   ← Hero 背景
├── exterior.jpg               ← Access 用外観
├── interior-1.jpg             ← About 1/4
├── interior-2.jpg             ← About 2/4
├── interior-3.jpg             ← About 3/4
├── interior-4.jpg             ← About 4/4
├── staff-1.jpg                ← Owner ポートレート
├── staff-2.jpg                ← Stylist ポートレート
├── staff-3.jpg                ← Stylist ポートレート
├── works/
│   ├── cut-1.jpg              ← Gallery CUT
│   ├── cut-2.jpg
│   ├── cut-3.jpg
│   ├── cut-4.jpg
│   ├── color-1.jpg            ← Gallery COLOR
│   ├── color-2.jpg
│   ├── color-3.jpg
│   ├── color-4.jpg
│   ├── perm-1.jpg             ← Gallery PERM
│   ├── perm-2.jpg
│   ├── perm-3.jpg
│   ├── treatment-1.jpg        ← Gallery TREATMENT
│   └── treatment-2.jpg
└── favicon.ico
```

---

## 🎨 全体トーンの統一指針

すべての画像で **共通のトーン** を保つこと:

| 要素 | 指針 |
|---|---|
| **照明** | やわらかい自然光 (ハイキー寄り、 ローキーすぎない) |
| **彩度** | 控えめ (ナチュラル、 派手ではない) |
| **カラーアクセント** | ベージュ / 木の色 / グリーン (植物) |
| **避けたいトーン** | ネオン、 ピンク、 ハイトーン、 商業的なきらびやかさ |
| **雰囲気** | 落ち着き、 静謐、 ヴィンテージ、 ナチュラル |
| **モデル (スタッフ)** | 30-40代の親しみやすさ、 派手すぎない、 庶民的 |

---

## 📝 user 準備の進め方 (推奨)

### Phase 1: 必須画像 (10 枚) — まずはこれだけ揃えれば dev が走る
- `hero.jpg` (1)
- `interior-1.jpg` 〜 `interior-4.jpg` (4)
- `staff-1.jpg` 〜 `staff-3.jpg` (3)
- `works/cut-1.jpg` (1) ← Gallery placeholder 代わり
- `exterior.jpg` (1)

### Phase 2: Gallery 充実 (12 枚追加) — リッチ表示用
- `works/cut-{2..4}.jpg`, `works/color-{1..4}.jpg`, `works/perm-{1..3}.jpg`, `works/treatment-{1..2}.jpg`

### Phase 3: 細部 (favicon)
- `favicon.ico` (作成系)

---

## 💡 AI 画像生成のおすすめプロンプト例

### Hero / Interior (一貫したトーン)
```
A small hair salon interior in a residential area in Tokyo,
vintage wooden chairs, dried flowers by the window,
soft natural light, beige and warm brown color palette,
minimalist, calm atmosphere, jazz cafe vibe, no people,
shot on Sony A7, 35mm lens, shallow depth of field
```

### Stylists (3 名同一スタイル)
```
A natural-looking [40-year-old woman / 30-year-old woman / 28-year-old man]
hair stylist in a small Japanese salon, soft smile,
beige and warm brown color palette, natural lighting,
wearing simple linen apron, holding scissors,
photorealistic, editorial photography style
```

### Gallery (施術後)
```
Japanese female hair model with [natural short bob / soft beige hair color / loose perm],
soft natural light, beige background, calm expression,
editorial photography style, focus on hair texture
```

---

## 🔗 関連ドキュメント

- 設計書: `.claude/plans/sample-salon-design-brief.md`
- ヒアリング: `.claude/plans/sample-salon-hearing.md`
- CLI 自走 Plan: `.claude/plans/night-run-003.md`
- Skill: `../../zuk-zuk-template/.claude/skills/setup-image-workflow.md`
