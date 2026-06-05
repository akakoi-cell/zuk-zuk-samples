import { defineField, defineType } from "sanity";

// 解決事例 (設計書 6-5)。匿名化した不動産オーナーの課題解決ストーリー。
export const taxWork = defineType({
  name: "taxWork",
  title: "解決事例",
  type: "document",
  fields: [
    defineField({
      name: "tag",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "法人化", value: "法人化" },
          { title: "相続対策", value: "相続対策" },
          { title: "節税", value: "節税" },
          { title: "インボイス", value: "インボイス" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "事例タイトル",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "who",
      title: "お客様属性 (匿名)",
      type: "string",
      description: "例: 個人投資家・40 代",
    }),
    defineField({
      name: "before",
      title: "課題 (Before)",
      type: "string",
      description: "例: 個人・所得税率 43%",
    }),
    defineField({
      name: "after",
      title: "解決 (After)",
      type: "string",
      description: "例: 法人化で実効税率を圧縮",
    }),
    defineField({
      name: "metric",
      title: "成果の数値",
      type: "string",
      description: "例: +180 / −1,300",
    }),
    defineField({
      name: "unit",
      title: "数値の単位",
      type: "string",
      description: "例: 万円／年",
    }),
    defineField({
      name: "coverImage",
      title: "カバー画像",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "詳細本文",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "order",
      title: "表示順 (小さいほど先)",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: "表示順", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "tag" },
  },
});
