"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Phone, ShieldCheck } from "lucide-react";

const DEMO_CODE = "123456";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [error, setError] = useState("");

  const validPhone = /^09\d{9}$/.test(phone);

  function requestCode(e: FormEvent) {
    e.preventDefault();
    if (!validPhone) {
      setError("شماره موبایل باید ۱۱ رقم و با 09 شروع شود.");
      return;
    }
    setError("");
    setStep("code");
  }

  function verifyCode(e: FormEvent) {
    e.preventDefault();
    if (code !== DEMO_CODE) {
      setError("کد تأیید صحیح نیست.");
      return;
    }
    window.localStorage.setItem("salonmall.user.v1", JSON.stringify({ phone, verified: true, verifiedAt: Date.now() }));
    router.push("/account/orders");
  }

  return (
    <main className="innerPage authBg">
      <header className="innerHeader">
        <Link href="/"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>ورود به حساب کاربری</small></div></div>
        <span />
      </header>

      <section className="authCard">
        <div className="authIcon"><Phone /></div>
        <h1>ورود یا ثبت‌نام</h1>

        {step === "phone" ? (
          <form onSubmit={requestCode}>
            <p>شماره موبایل خود را وارد کنید.</p>
            <label>شماره موبایل</label>
            <input
              inputMode="tel"
              placeholder="09xxxxxxxxx"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 11)); setError(""); }}
            />
            {error && <div className="authError">{error}</div>}
            <button type="submit">دریافت کد تأیید</button>
          </form>
        ) : (
          <form onSubmit={verifyCode}>
            <p>کد تأیید برای شماره <b dir="ltr">{phone}</b> آماده است.</p>
            <div className="demoOtpNotice">نسخه آزمایشی SalonMall — کد ورود: <b dir="ltr">{DEMO_CODE}</b></div>
            <label>کد تأیید</label>
            <input
              inputMode="numeric"
              placeholder="۶ رقمی"
              value={code}
              onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
            />
            {error && <div className="authError">{error}</div>}
            <button type="submit">تأیید و ورود</button>
            <button className="textButton" type="button" onClick={() => { setStep("phone"); setCode(""); setError(""); }}>تغییر شماره موبایل</button>
          </form>
        )}

        <small><ShieldCheck /> ورود امن با رمز یکبارمصرف</small>
        <hr />
        <Link className="sellerLink" href="/seller/register">فروشنده هستید؟ ثبت‌نام فروشنده</Link>
      </section>

      <Credit />
    </main>
  );
}

function Credit() {
  return <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>;
}
