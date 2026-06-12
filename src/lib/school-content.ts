// =============================================================
// 子供英会話教室サンプル #69「Hello Tree」 — データ集約
// 視覚の正典: Figma fileKey IZSnIpCsrV2cjYMIG0CanV / node 8-627
// コピー・文言も Figma を正とする (tax/salon-content.ts と並列構造)。
// 上から: Header / Hero / この教室のこと / 教室の特徴 / 先生たち / コース
//         以降 (料金/アクセス/無料体験/Footer) は Figma に図面が無いため
//         コード側で設計 (figma-repro.md 第5章方針)。
// =============================================================

export const SITE_SCHOOL = {
  name: "Hello Tree",
  reading: "ハローツリー",
  tagline: "北浦和こども英会話教室",
  url: "https://samples.zuk-zuk.com/school",
  description:
    "「Nice Try! が、私たちのあいことば」。さいたま市・北浦和のこども英会話教室 Hello Tree。まちがえても大丈夫な空間で、たくさん失敗して、たくさん話す。1.5歳〜小学6年生まで、成長に寄り添う4つのコース。",
} as const;

// ---- Header ナビ (Figma node 2:2) ----
export const NAV = [
  { label: "教室のこと", href: "#about" },
  { label: "特徴", href: "#features" },
  { label: "先生たち", href: "#teachers" },
  { label: "コース", href: "#courses" },
  { label: "アクセス", href: "#access" },
  { label: "限定コンテンツ", href: "#members" },
] as const;

// ---- Hero (Figma node 4:194) コピーは Figma 実テキスト ----
export const HERO = {
  line1a: "Nice Try!", // キイロ #f3d55e
  line1b: "が", // ミドリ #279f77
  line2a: "私たちの", // ミドリ #279f77
  line2b: "あいことば", // アカ #e66e61
  sub: "北浦和こども英会話教室 ハローツリー", // アオ #329ac4
} as const;

// ---- About「この教室のこと」(Figma node 5:60) 本文は Figma 実テキスト ----
export const ABOUT = {
  watermark: "About us",
  heading: "この教室のこと",
  body: [
    "Hello Tree は、北浦和にある小さなこども英会話教室です。",
    "この教室では“正解”を覚えるだけの英語は教えていません。\n目指すのは、子どもたちが、言いたいことを自分の言葉で言えること。\nそのために大切にしているのは、",
    "「まちがえても、だいじょうぶ」な空間をつくること。",
    "たくさん失敗して、たくさん話す。\nそうやって、ことばの根を張っていくことを目指しています。",
  ],
} as const;

// ---- Features「教室の特徴」(Figma node 7:413) ----
export const FEATURES_HEAD = {
  title: "教室の特徴",
  sub: "失敗を笑い合えるあたたかい空間だから、子どもは安心してどんどん話します。",
};
export const FEATURES = [
  {
    no: "01",
    title: "1クラス3名まで",
    desc: "一人ひとりが話す時間をたっぷり確保。先生の目が全員に届く、ちょうどいい人数です。",
  },
  {
    no: "02",
    title: "ゲームや歌で自然に",
    desc: "体を動かしながら、歌やゲームで英語に夢中になるうちに、自然と口から飛び出します。",
  },
  {
    no: "03",
    title: "おうちでも英語を",
    desc: "代表が手づくりした動画やプリントで、教室の外でも英語にふれる時間がつづきます。",
  },
] as const;

// ---- Teachers「先生たちの紹介」(Figma node 9:782) ----
export const TEACHERS_HEAD = {
  title: "先生たちの紹介",
  sub: "それぞれ個性ゆたかな先生たちが、子どもの“好き”と“話したい”を引き出します。",
};
export const TEACHERS = [
  {
    en: "Emily",
    ja: "エミリー",
    tag: "#ネイティブ級",
    role: "トロント育ち・代表",
    desc: "カナダ・トロント育ちの日加ハーフ。教材も手づくりで、一人ひとりの“話したい”を引き出します。",
    image: "/images/school/teacher-emily.jpg",
    color: "coral", // 名前文字色
  },
  {
    en: "Mike",
    ja: "マイク",
    tag: "#ネイティブ",
    role: "アメリカ出身",
    desc: "陽気で歌が大好きな先生。ゲームと笑いで、自然と英語が口から飛び出す時間に。",
    image: "/images/school/teacher-mike.jpg",
    color: "yellow",
  },
  {
    en: "Aya",
    ja: "アヤ",
    tag: "#バイリンガル",
    role: "千葉県出身",
    desc: "英語が苦手だった経験も。だからこそ、つまずきに寄り添える頼れる存在です。",
    image: "/images/school/teacher-aya.jpg",
    color: "green",
  },
] as const;

// ---- Courses「成長に合わせた、4つのコース」(Figma node 8:557) ----
export const COURSES_HEAD = {
  title: "成長に合わせた、4つのコース",
  sub: "1.5歳の親子レッスンから小学6年生まで。年齢と発達に寄り添ったカリキュラムをご用意しています。",
};
export const COURSES = [
  {
    en: "CLASS",
    name: "親子クラス",
    age: "1.5〜3歳",
    color: "coral",
    desc: "ママ・パパといっしょに、歌と遊びで英語の音にたっぷり触れる時間。はじめての「英語、たのしい！」を。",
    tags: ["40分/週1", "親子参加"],
  },
  {
    en: "CLASS",
    name: "幼児クラス",
    age: "3〜6歳",
    color: "yellow",
    desc: "フォニックスと会話の基礎づくり。たくさん口に出して、自分の気持ちを英語で伝える楽しさを育てます。",
    tags: ["50分/週1", "フォニックス"],
  },
  {
    en: "CLASS",
    name: "小学生・低学年",
    age: "1〜3年生",
    color: "green",
    desc: "読み・書きもスタート。会話を中心に、自分のことを英語で発表できる「話す力」をぐんぐん伸ばします。",
    tags: ["60分/週1", "読み書き"],
  },
  {
    en: "CLASS",
    name: "小学生・高学年",
    age: "4〜6年生",
    color: "blue",
    desc: "ディスカッションやプレゼンに挑戦。中学英語の先取りも視野に、「使える英語」へステップアップ。",
    tags: ["60分/週1", "中学先取り"],
  },
] as const;

// =============================================================
// 以降は Figma に図面なし → コード設計 (design-brief 準拠 + Figma トークン)
// =============================================================

// ---- Pricing「料金プラン」(月謝制=サブスク) ----
export const PRICING = {
  title: "料金プラン",
  sub: "月謝制で、はじめやすく。",
  joinFee: "¥11,000",
  material: "年 ¥6,000 程度",
  plans: [
    {
      name: "週1 プラン",
      price: "¥8,800",
      unit: "/ 月（税込）",
      desc: "まずは英語に慣れたいお子さまに。全コース対応。",
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
    "ごきょうだい割: 2人目以降 月謝 10% OFF",
    "月謝は Stripe による自動引き落とし（サブスク決済）",
    "入会金は体験当日のご入会で半額キャンペーンあり",
  ],
} as const;

// ---- Access「教室について」----
export const ACCESS = {
  title: "教室について",
  address: "埼玉県さいたま市浦和区北浦和 X-X-X 1F",
  station: "JR京浜東北線「北浦和駅」西口 徒歩6分",
  hours: "火〜金 14:00-19:00 / 土 9:30-13:00",
  closed: "日曜・月曜",
  tel: "048-123-4567",
  parking: "近隣にコインパーキングあり / ベビーカー・自転車OK",
  // 北浦和駅周辺 (架空住所のため駅中心表示)
  mapEmbedUrl:
    "https://www.google.com/maps?q=%E5%8C%97%E6%B5%A6%E5%92%8C%E9%A7%85&output=embed",
} as const;

// ---- FAQ ----
export const FAQ = [
  {
    q: "英語がまったくはじめてでも大丈夫?",
    a: "もちろん大丈夫です。Hello Tree は「まちがえても、だいじょうぶ」が合言葉。はじめてのお子さまがほとんどなので、安心してご参加ください。",
  },
  {
    q: "体験レッスンは本当に無料ですか? しつこい勧誘は?",
    a: "体験は無料です。しつこい勧誘は一切いたしません。教室の雰囲気を見て、お子さまに合うかどうかをゆっくりお考えください。",
  },
  {
    q: "月謝の支払い方法は?（サブスク決済について）",
    a: "月謝は Stripe によるカード/口座の自動引き落とし（サブスク決済）です。毎月の振込や手渡しの手間がなく、保護者の方の負担を減らします。",
  },
  {
    q: "レッスンを休んだら振替できますか?",
    a: "週2プランは振替に対応しています。週1プランも、事前のご連絡で可能な範囲で調整いたします。",
  },
  {
    q: "送り迎えは必要ですか? 親の付き添いは?",
    a: "親子クラスは保護者の同伴が必要です。幼児・小学生クラスは送り迎えのみで大丈夫。教室で楽しくお預かりします。",
  },
  {
    q: "ごきょうだいで通うと割引はありますか?",
    a: "はい。2人目以降は月謝が10% OFFになる「ごきょうだい割」をご用意しています。",
  },
] as const;

export const AISTUDIO_URL = "https://ai-studio.zuk-zuk.com/";
