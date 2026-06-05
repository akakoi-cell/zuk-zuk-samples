"use client";

import { useState } from "react";
import Script from "next/script";
import { Section, Eyebrow, Icon, Btn } from "./ui";
import { CONTACT_TABS, CONTACT_INFO } from "@/lib/tax-content";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const hasWeb3Forms = Boolean(WEB3FORMS_KEY);

type Status = "idle" | "submitting" | "success" | "error";

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
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const inputCls =
    "w-full bg-white/[0.04] border border-white/15 text-white placeholder-navy-100/40 px-4 py-3 text-[14px] focus:border-gold transition-colors outline-none";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasWeb3Forms) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    // honeypot: bot が入力したら送信中断
    if (formData.get("botcheck")) return;

    setStatus("submitting");
    setErrorMessage("");
    formData.append("access_key", WEB3FORMS_KEY!);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
        // Phase K: Slack 通知を fire-and-forget で並列呼び出し (route 未実装でも握りつぶす)
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind: CONTACT_TABS[tab].label,
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
          }),
        }).catch(() => {});
      } else {
        setStatus("error");
        setErrorMessage(data.message || "送信に失敗しました。お手数ですがお電話ください。");
      }
    } catch {
      setStatus("error");
      setErrorMessage("ネットワークエラーが発生しました。時間をおいて再度お試しください。");
    }
  };

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

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-12 px-4">
                <span className="inline-flex items-center justify-center w-14 h-14 border border-gold/50 text-gold-light mb-6">
                  <Icon name="check" className="w-7 h-7" />
                </span>
                <h3 className="font-mincho text-[22px] text-white">送信ありがとうございました</h3>
                <p className="jp text-navy-100/75 text-[14px] mt-4 max-w-[36ch]">
                  2 営業日以内に、担当税理士からご連絡いたします。お急ぎの場合はお電話でもお気軽にどうぞ。
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="font-mono text-[12px] text-gold-light mt-8 hover:text-gold transition-colors"
                >
                  別の相談を送る →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                {/* honeypot — 人間には不可視 */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                {/* メール件名・種別 (Web3Forms へ送る隠しフィールド) */}
                <input
                  type="hidden"
                  name="subject"
                  value={`【みらい税理士事務所】お問い合わせ（${CONTACT_TABS[tab].label}）`}
                />
                <input type="hidden" name="from_name" value="みらい税理士事務所サイト" />
                <input type="hidden" name="相談種別" value={CONTACT_TABS[tab].label} />

                <div className="col-span-2 sm:col-span-1">
                  <Field label="お名前" required>
                    <input name="name" required className={inputCls} placeholder="未来 太郎" />
                  </Field>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Field label="メールアドレス" required>
                    <input name="email" type="email" required className={inputCls} placeholder="you@example.com" />
                  </Field>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Field label="電話番号">
                    <input name="phone" className={inputCls} placeholder="090-0000-0000" />
                  </Field>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Field label="保有物件・家賃収入の規模">
                    <select name="規模" className={`${inputCls} appearance-none`} defaultValue="">
                      <option value="" className="bg-navy-900">
                        選択してください
                      </option>
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
                      name="message"
                      rows={4}
                      required
                      className={inputCls}
                      placeholder={`「${CONTACT_TABS[tab].label}」について相談したい内容をご記入ください。`}
                    ></textarea>
                  </Field>
                </div>

                {/* hCaptcha (Method A: Web3Forms proxy)。env がある時のみ表示 */}
                {hasWeb3Forms && (
                  <div className="col-span-2">
                    <div className="h-captcha" data-captcha="true"></div>
                  </div>
                )}

                <div className="col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="agree" required className="w-4 h-4 accent-gold" />
                  <label htmlFor="agree" className="font-zen text-[12px] text-navy-100/70">
                    <a href="/tax/legal/privacy" className="underline hover:text-white">
                      プライバシーポリシー
                    </a>
                    に同意します
                  </label>
                </div>

                {!hasWeb3Forms && (
                  <div className="col-span-2 border border-gold/30 bg-gold/[0.06] px-4 py-3">
                    <p className="font-zen text-[12.5px] text-gold-light leading-relaxed">
                      ⚙️ 送信機能は準備中です（Web3Forms 未設定）。公開時に有効化されます。
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <p className="col-span-2 font-zen text-[13px] text-red-300">{errorMessage}</p>
                )}

                <div className="col-span-2">
                  <Btn
                    as="button"
                    type="submit"
                    variant="gold"
                    size="lg"
                    className={`w-full ${!hasWeb3Forms || status === "submitting" ? "opacity-60 pointer-events-none" : ""}`}
                    icon="send"
                  >
                    {status === "submitting" ? "送信中…" : "この内容で無料相談を申し込む"}
                  </Btn>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Web3Forms hCaptcha proxy スクリプト (Method A) */}
      {hasWeb3Forms && <Script src="https://web3forms.com/client/script.js" strategy="afterInteractive" />}
    </Section>
  );
}
