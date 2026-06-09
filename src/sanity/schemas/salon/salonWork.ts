import { defineField, defineType } from "sanity";

// 施術事例 (Salon、設計書 Section 5)。施術後の写真ギャラリー用。
export const salonWork = defineType({
  name: "salonWork",
  title: "施術事例 (Salon)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "Cut", value: "cut" },
          { title: "Color", value: "color" },
          { title: "Perm", value: "perm" },
          { title: "Treatment", value: "treatment" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "施術後の写真",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: { hotspot: true },
    }),
    defineField({
      name: "stylistName",
      title: "担当スタイリスト名",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "表示順 (小さいほど上)",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: "表示順", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "category" },
  },
});
