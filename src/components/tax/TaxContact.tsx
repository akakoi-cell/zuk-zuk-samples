"use client";

import { useState } from "react";
import { Section, Eyebrow, Icon, Btn } from "./ui";
import { CONTACT_TABS, CONTACT_INFO } from "@/lib/tax-content";

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
    "w-full bg-white/[0.04] border border-white/15 text-white placeholder-navy-100/40 px-4 py-3 text-[14px] focus:border-gold transition-colors outline-none";

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
          <div className="surf overflow-hidden border border-white/15 bg-white/[0.02] p-6 md:p-9">
            {/* tabs */}
            <div className="flex border border-white/15 mb-7">
              {CONTACT_TABS.map((t, i) => (
                <button
                  key={t.key}
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
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-5">
              <div className="col-span-2 sm:col-span-1">
                <Field label="お名前" required>
                  <input className={inputCls} placeholder="未来 太郎" />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Field label="メールアドレス" required>
                  <input className={inputCls} placeholder="you@example.com" />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Field label="電話番号">
                  <input className={inputCls} placeholder="090-0000-0000" />
                </Field>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Field label="保有物件・家賃収入の規模">
                  <select className={`${inputCls} appearance-none`}>
                    <option className="bg-navy-900">選択してください</option>
                    <option className="bg-navy-900">〜1,000 万円／年</option>
                    <option className="bg-navy-900">1,000〜3,000 万円／年</option>
                    <option className="bg-navy-900">3,000〜5,000 万円／年</option>
                    <option className="bg-navy-900">5,000 万円／年 以上</option>
                  </select>
                </Field>
              </div>
              <div className="col-span-2">
                <Field label="ご相談内容" required>
                  <textarea
                    rows={4}
                    className={inputCls}
                    placeholder={`「${CONTACT_TABS[tab].label}」について相談したい内容をご記入ください。`}
                  ></textarea>
                </Field>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <input type="checkbox" id="agree" className="w-4 h-4 accent-gold" />
                <label htmlFor="agree" className="font-zen text-[12px] text-navy-100/70">
                  プライバシーポリシーに同意します
                </label>
              </div>
              <div className="col-span-2">
                <Btn as="button" type="submit" variant="gold" size="lg" className="w-full" icon="send">
                  この内容で無料相談を申し込む
                </Btn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
