"use client";

import { useState } from "react";
import { Section, Eyebrow, Icon, Btn } from "./ui";
import { CONTACT_TABS, CONTACT_INFO } from "@/lib/tax-content";

// === サンプル誘導モード ===
// このサイトはサンプルのため、 フォーム送信は無効化。
// 実際の問い合わせは zuk-zuk AI STUDIO へ誘導する。
const AI_STUDIO_URL = "https://ai-studio.zuk-zuk.com";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 font-zen text-[12.5px] text-navy-100/80 mb-2">
        {label}
        {required && (
          <span className="text-gold-light text-[10px] border border-gold/40 px-1.5 py-px tracking-wide">必須</span>
        )}
      </span>
      {children}
    </label>
  );
}

export function TaxContact() {
  const [tab, setTab] = useState(0);

  const inputCls =
    "w-full bg-white/[0.04] border border-white/15 text-white placeholder-navy-100/40 px-4 py-3 text-[14px] focus:border-gold transition-colors outline-none disabled:opacity-70";

  return (
    <Section id="contact" dark className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -left-16 top-10 font-mincho text-white/[0.04] text-[300px] leading-none select-none pointer-events-none">
        談
      </div>
      <div className="relative grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5">
          <Eyebrow num="10" dark>
            Contact
          </Eyebrow>
          <h2 className="font-mincho font-medium text-white text-[30px] md:text-[42px] leading-[1.25] mt-5">
            まずは 30 分、
            <br />
            <span className="text-gold-light">無料相談</span>から。
          </h2>
          <p className="jp text-navy-100/75 text-[14.5px] mt-6 max-w-[42ch]">
            ご相談内容を選んで、フォームを送るだけ。2 営業日以内に、担当税理士からご連絡します。 無理な勧誘はいたしません。
          </p>
          <div className="mt-10 space-y-5">
            {CONTACT_INFO.map((c) => (
              <div key={c.k} className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-11 h-11 border border-white/15 text-gold-light shrink-0">
                  <Icon name={c.icon} className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-zen text-[12px] text-navy-100/60">{c.k}</div>
                  <div className="font-mono text-[15px] text-white tnum">
                    {c.v} <span className="text-navy-100/50 text-[11px] ml-1">{c.n}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-7">
          {/* ⚠️ サンプル誘導バナー (最上部、目立つ) */}
          <div className="mb-5 border border-gold/50 bg-gold/[0.08] p-5">
            <p className="font-mincho text-[15px] text-gold-light flex items-start gap-2">
              <span aria-hidden>📌</span>
              <span>このサイトは <strong>zuk-zuk AI STUDIO</strong> のサンプルです</span>
            </p>
            <p className="jp text-[13px] text-navy-100/85 mt-2 leading-relaxed">
              みらい税理士事務所は架空のデモ事務所です。 サイト制作のご相談は、
              <a
                href={AI_STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light underline underline-offset-2 hover:text-gold mx-1"
              >
                zuk-zuk AI STUDIO
              </a>
              までお願いいたします。
            </p>
          </div>

          <div className="surf overflow-hidden border border-white/15 bg-white/[0.02] p-6 md:p-9">
            {/* tabs */}
            <div className="flex border border-white/15 mb-7">
              {CONTACT_TABS.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(i)}
                  className={`flex-1 py-3 px-2 text-center border-b-2 transition-colors ${
                    tab === i
                      ? "border-gold bg-white/[0.06] text-white"
                      : "border-transparent text-navy-100/60 hover:text-white"
                  }`}
                >
                  <div className="font-mincho text-[13px] md:text-[15px]">{t.label}</div>
                </button>
              ))}
            </div>

            {/* フォーム UI (見た目のみ、 送信不可) */}
            <form
              onSubmit={(e) => e.preventDefault()}
              aria-disabled="true"
              className="grid grid-cols-2 gap-5"
            >
              <div className="col-span-2 sm:col-span-1">
                <Field label="お名前" required>
                  <input name="name" disabled className={inputCls} placeholder="未来 太郎" />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Field label="メールアドレス" required>
                  <input name="email" type="email" disabled className={inputCls} placeholder="you@example.com" />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Field label="電話番号">
                  <input name="phone" disabled className={inputCls} placeholder="090-0000-0000" />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Field label="保有物件・家賃収入の規模">
                  <select name="規模" disabled className={`${inputCls} appearance-none`} defaultValue="">
                    <option value="" className="bg-navy-900">
                      選択してください
                    </option>
                  </select>
                </Field>
              </div>
              <div className="col-span-2">
                <Field label="ご相談内容" required>
                  <textarea
                    name="message"
                    rows={4}
                    disabled
                    className={inputCls}
                    placeholder={`「${CONTACT_TABS[tab].label}」について相談したい内容をご記入ください。`}
                  ></textarea>
                </Field>
              </div>

              <div className="col-span-2 flex items-center gap-3 opacity-60">
                <input type="checkbox" id="agree" disabled className="w-4 h-4 accent-gold" />
                <label htmlFor="agree" className="font-zen text-[12px] text-navy-100/70">
                  プライバシーポリシーに同意します
                </label>
              </div>

              <div className="col-span-2">
                <Btn
                  as="button"
                  type="button"
                  variant="gold"
                  size="lg"
                  className="w-full opacity-60 pointer-events-none"
                  icon="send"
                >
                  サンプル表示のため送信できません
                </Btn>
              </div>
            </form>

            {/* AI STUDIO 誘導 CTA (大きく目立つ) */}
            <div className="mt-7 pt-7 border-t border-white/10">
              <p className="font-zen text-[13px] text-navy-100/70 text-center mb-4">
                実際にサイト制作をご相談されたい方は、 こちらへ
              </p>
              <a
                href={`${AI_STUDIO_URL}#contact`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gold text-navy-900 font-mincho text-[16px] py-4 hover:bg-gold-light transition-colors group"
              >
                <span>zuk-zuk AI STUDIO で相談する</span>
                <Icon name="arrowUR" className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
