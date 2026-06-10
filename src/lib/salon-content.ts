// salon-content.ts — 美容室サンプル #68「& moi」のコンテンツ定数
// Claude Design (claude-design-salon/index.html + styles.css) のハードコード
// データをここに集約。 Gallery は Sanity (salonWork) 連動だが、 env 未設定時は
// GALLERY_FALLBACK がフォールバックとして描画される。
// 設計書: .claude/plans/sample-salon-design-brief.md (Claude Design 採用版)

// ============================================================
// サイト基本情報
// ============================================================
export const SITE_SALON = {
  name: "& moi",
  nameEn: "and moi",
  reading: "アンドモイ",
  tagline: "と私の、ささやかな約束。",
  location: "Kanagawa ・ Musashi-Kosugi",
  description:
    "家でもない、職場でもない、もう一つの居場所。神奈川県川崎市武蔵小杉の住宅街にひっそりとある、完全予約制の小さな美容室「& moi」。ヴィンテージの椅子と窓辺のドライフラワー、音量を絞ったジャズの中で、髪を整えるその時間に心まで少しだけ整うように。",
  url:
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://samples.zuk-zuk.com") + "/salon",
  established: "2018",
} as const;

// ============================================================
// ナビゲーション (Header)
// ============================================================
export type SalonNavItem = { id: string; label: string; num: string };

export const SALON_NAV: SalonNavItem[] = [
  { id: "about", label: "About", num: "01" },
  { id: "stylists", label: "Stylist", num: "02" },
  { id: "menu", label: "Menu", num: "03" },
  { id: "gallery", label: "Gallery", num: "04" },
  { id: "voice", label: "Voice", num: "05" },
  { id: "access", label: "Access", num: "06" },
  { id: "faq", label: "FAQ", num: "07" },
];

// ============================================================
// 01. Hero
// ============================================================
// Hero コピー (1 要素 = 1 行、 <br/> 区切りでレンダリング)。改行位置の調整は行単位で行う。
export const HERO_COPY = [
  "武蔵小杉の住宅街、その角にある",
  "ヴィンテージに包まれた、小さな美容室。",
  "特別な日じゃなくていい",
  "自分を少しだけ、大切にしたい日に。",
];

// ============================================================
// 02. About (インテリア 4 枚正方形グリッド)
// ============================================================
export const ABOUT = {
  num: "01",
  en: "About",
  // 見出し: 「もう一つの居場所」 だけ em 強調 (emHtml で <em> をマーク)
  headBefore: "家でもない、職場でもない、",
  headEm: "もう一つの居場所",
  headAfter: "を。",
  captionLeft: "Interior ── 4 seats / 12 chairs",
  captionRight: "Photo 4 / 4",
  images: [
    { src: "/images/salon/interior-1.jpg", ph: "店内 ／ 待合のソファ" },
    { src: "/images/salon/interior-2.jpg", ph: "窓辺 ／ ドライフラワー" },
    { src: "/images/salon/interior-3.jpg", ph: "セット面 ／ アンティーク鏡" },
    { src: "/images/salon/interior-4.jpg", ph: "ディテール ／ 古書と照明" },
  ],
} as const;

// ============================================================
// 03. Stylists (スタッフ 3 名)
// ============================================================
export const STYLISTS = [
  {
    role: "Owner / Stylist",
    enName: "Aoi",
    jaName: "葵",
    image: "/images/salon/staff-1.jpg",
    profile:
      "骨格と髪質を見極めた「ほどける」カットが得意。肩肘張らない時間づくりを何より大切にしています。",
    tags: ["Cut", "Short", "Design Color"],
  },
  {
    role: "Stylist",
    enName: "Rin",
    jaName: "凛",
    image: "/images/salon/staff-2.jpg",
    profile:
      "透明感のあるカラーと、伸びても崩れない設計が信条。なりたい色を一緒に探す時間を大事にします。",
    tags: ["Color", "Highlight", "Gray Care"],
  },
  {
    role: "Stylist / Spa",
    enName: "Nao",
    jaName: "奈緒",
    image: "/images/salon/staff-3.jpg",
    profile:
      "ヘッドスパとトリートメントの担当。頭皮から整える心地よさで、眠ってしまうお客様も。",
    tags: ["Head Spa", "Treatment", "Care"],
  },
] as const;

// ============================================================
// 04. Menu
// ============================================================
export type MenuItem = { name: string; note?: string; price: string; tilde?: boolean };
export type MenuCategory = { en: string; ja: string; items: MenuItem[] };

export const MENU: MenuCategory[] = [
  {
    en: "CUT",
    ja: "カット",
    items: [
      { name: "カット", note: "シャンプー・ブロー込み", price: "6,000", tilde: true },
      { name: "前髪カット", price: "1,200" },
      { name: "学生カット", note: "学生証ご提示", price: "4,800", tilde: true },
    ],
  },
  {
    en: "COLOR",
    ja: "カラー",
    items: [
      { name: "フルカラー", note: "カット別", price: "7,500", tilde: true },
      { name: "ハイライト", price: "9,800", tilde: true },
      { name: "白髪ぼかし", price: "6,800", tilde: true },
    ],
  },
  {
    en: "TREATMENT",
    ja: "トリートメント",
    items: [
      { name: "システムトリートメント", price: "3,500", tilde: true },
      { name: "髪質改善トリートメント", price: "8,000", tilde: true },
      { name: "クイックケア", price: "1,800" },
    ],
  },
  {
    en: "SPA",
    ja: "ヘッドスパ",
    items: [
      { name: "リラックスヘッドスパ", note: "20分", price: "3,000" },
      { name: "炭酸スパ", note: "40分", price: "5,000" },
      { name: "スキャルプ集中ケア", note: "60分", price: "7,000" },
    ],
  },
];

export const MENU_NOTE =
  "表示はすべて税込価格です。ロング料金（鎖骨より下）は別途 ¥1,100 を頂戴します。メニューの組み合わせはご相談ください。";

// ============================================================
// 05. Gallery (Sanity 未設定時の fallback)
// ============================================================
export type GalleryItem = { ph: string; image?: string };

export const GALLERY_FALLBACK: GalleryItem[] = [
  { ph: "ショート" },
  { ph: "ボブ" },
  { ph: "ハイライト" },
  { ph: "ミディアム" },
  { ph: "インナーカラー" },
  { ph: "ロング" },
  { ph: "グレイカラー" },
  { ph: "パーマ" },
  { ph: "前髪デザイン" },
  { ph: "アレンジ" },
];

// ============================================================
// 06. Voice (お客様の声) — Claude Design 採用版 (2x2 / 星評価)
// ============================================================
export const VOICES = [
  {
    quote:
      "子育ての合間に、ここだけは「自分のための時間」。雑誌をめくりながらのスパで、いつの間にか眠ってしまいました。次の予定がない日に行くのがおすすめです。",
    initial: "Y.K",
    age: 38,
    occupation: "会社員",
    rating: 5,
  },
  {
    quote:
      "派手すぎず、でもちゃんと垢抜ける。「こうしたい」が言葉にならなくても、丁寧に汲み取ってくれます。インテリアも好みで、毎回少し長居してしまう。",
    initial: "S.A",
    age: 33,
    occupation: "デザイナー",
    rating: 5,
  },
  {
    quote:
      "白髪が気になり始めた年代ですが、「ぼかす」提案をしてもらえて、染めている感じがしないのが嬉しい。家から歩いて通えるのも続けられる理由です。",
    initial: "M.T",
    age: 45,
    occupation: "自営業",
    rating: 5,
  },
  {
    quote:
      "美容院が少し苦手でしたが、ここは静かで、無理に話しかけられないのが心地いい。仕事帰りに寄れる時間で開いているのも助かっています。",
    initial: "R.N",
    age: 41,
    occupation: "看護師",
    rating: 4,
  },
] as const;

// ============================================================
// 07. Access (Google Map iframe 強調)
// ============================================================
export const ACCESS = {
  num: "06",
  postal: "〒211-0063",
  address: "神奈川県川崎市中原区小杉町 0-00-0\nコーポ小杉 1F",
  hours: "10:00 – 19:00",
  hoursNote: "最終受付 カット 18:00 ／ カラー・スパ 17:30",
  closed: "毎週火曜・第2水曜",
  closedNote: "祝日は営業しております",
  station: "東急東横線・JR南武線「武蔵小杉」駅 徒歩 9分",
  stationNote: "専用駐車場 1台 ／ 近隣にコインパーキングあり",
  tel: "044-000-0000",
  photoPh: "外観 ／ 住宅街の角 ・ 小さな看板と植栽 ・ 縦長",
  exterior: "/images/salon/exterior.jpg",
  // 武蔵小杉駅周辺 (架空住所のため駅中心 zoom)。 後で実 embed URL に差し替え可。
  mapEmbedUrl:
    "https://www.google.com/maps?q=%E6%AD%A6%E8%94%B5%E5%B0%8F%E6%9D%89%E9%A7%85&output=embed&z=16",
  mapLink: "https://www.google.com/maps/search/?api=1&query=武蔵小杉駅",
} as const;

// ============================================================
// 08. FAQ
// ============================================================
export const SALON_FAQS = [
  {
    q: "予約は必要ですか？当日でも大丈夫ですか？",
    a: "基本的にご予約優先です。当日でも空きがあればご案内できますので、お電話または予約フォームよりお問い合わせください。少人数で営業しているため、お待たせしないよう事前予約をおすすめしています。",
  },
  {
    q: "キャンセルや日時の変更はできますか？",
    a: "前日までにご連絡いただければ、キャンセル・変更とも料金はかかりません。当日のキャンセルや無断キャンセルが続いた場合は、次回のご予約をご遠慮いただくことがございます。",
  },
  {
    q: "駐車場はありますか？",
    a: "店舗前に専用駐車場を1台ご用意しています。ご利用の際は予約時にお申し付けください。満車の場合は近隣のコインパーキングをご案内いたします。",
  },
  {
    q: "子どもを連れて行っても大丈夫ですか？",
    a: "はい、お子さま連れも歓迎しています。ベビーカーのままお入りいただけます。落ち着いた空間づくりのため、混み合う時間帯は事前にご相談いただけるとスムーズです。",
  },
  {
    q: "はじめてですが、似合う髪型がわかりません。",
    a: "カウンセリングのお時間をしっかりいただきます。お手持ちの写真や雰囲気のイメージをお持ちいただければ、骨格や髪質に合わせて一緒にご提案します。言葉にならない「なりたい」も、丁寧に汲み取ります。",
  },
  {
    q: "支払い方法は何が使えますか？",
    a: "現金のほか、各種クレジットカード・QRコード決済（PayPay 等）・交通系電子マネーをご利用いただけます。",
  },
  {
    q: "どのくらいの頻度で通うのがおすすめですか？",
    a: "スタイルにもよりますが、カットは1.5〜2ヶ月、カラーは1ヶ月〜1.5ヶ月が目安です。次回のおすすめ時期は、施術後にお伝えしています。",
  },
  {
    q: "ひとりでゆっくり過ごしたいのですが。",
    a: "もちろんです。会話を最小限にしてゆっくりお過ごしいただくことも、施術中に眠っていただくことも歓迎しています。ご希望があれば予約時やカウンセリングでお気軽にお伝えください。",
  },
];

// ============================================================
// 08-2. LINE バナー (強調機能 #2)
// ============================================================
export const LINE_BANNER = {
  title: "LINE でお気軽にご連絡を",
  body: "ご予約・お問い合わせ・スタイル相談まで、LINE でお気軽にどうぞ。",
} as const;

// ============================================================
// 09. Contact (サンプル誘導モード)
// ============================================================
export const CONTACT = {
  num: "08",
  intro:
    "ご希望の日時とメニューを選んで、フォームを送るだけ。少人数で営業しているため、ご予約のご連絡をおすすめしています。",
  menuOptions: [
    "カット",
    "カット + カラー",
    "カット + トリートメント",
    "ヘッドスパ",
    "その他・ご相談",
  ],
} as const;

// AI STUDIO 誘導 (サンプル誘導モード共通)
export const AI_STUDIO_URL = "https://ai-studio.zuk-zuk.com";

// ============================================================
// Footer
// ============================================================
export const FOOTER_COLS = [
  {
    h: "Menu",
    links: [
      { label: "About", href: "#about" },
      { label: "Stylist", href: "#stylists" },
      { label: "Menu", href: "#menu" },
      { label: "Gallery", href: "#gallery" },
    ],
  },
  {
    h: "Info",
    links: [
      { label: "Voice", href: "#voice" },
      { label: "Access", href: "#access" },
      { label: "FAQ", href: "#faq" },
      { label: "Reservation", href: "#contact" },
    ],
  },
] as const;

export const FOOTER_LEGAL = [
  { label: "プライバシーポリシー", href: "/salon/legal/privacy" },
  { label: "利用規約", href: "/salon/legal/terms" },
  { label: "特定商取引法に基づく表記", href: "/salon/legal/tokushoho" },
] as const;
