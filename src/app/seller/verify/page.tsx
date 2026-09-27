"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck, Store } from "lucide-react";

const DEMO_CODE = "123456";

type SellerDraft = {
  shop: string;
  name: string;
  phone: string;
  city: string;
};

export default function SellerVerify() {
  const router = useRouter();
  const [seller, setSeller] = useState<SellerDraft | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem("salonmall.seller.registration.v1");
    if (!raw) return;
    try {
      setSeller(JSON.parse(raw));
    } catch {
      setSeller(null);
    }
  }, []);

  function verify(e: FormEvent) {
    e.preventDefault();
    if (!seller) {
      setError("اطلاعات ثبت‌نام پیدا نشد. دوباره فرم فروشنده را تکمیل کنید.");
      return;
    }
    if (code !== DEMO_CODE) {
      setError("کد تأیید صحیح نیست.");
      return;
    }
    window.localStorage.setItem(
      "salonmall.seller.session.v1",
      JSON.stringify({ ...seller, verified: true, verifiedAt: Date.now() })
    );
    router.push("/seller/dashboard");
  }

  return (
    <main className="innerPage authBg">
      <header className="innerHeader">
        <Link href="/seller/register"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>احراز فروشنده</small></div></div>
        <span />
      </header>

      <section className="authCard">
        <div className="authIcon"><Store /></div>
        <h1>تأیید شماره فروشنده</h1>
        {seller ? (
          <form onSubmit={verify}>
            <p>شماره <b dir="ltr">{seller.phone}</b> برای غرفه «{seller.shop}» ثبت شد.</p>
            <div className="demoOtpNotice">نسخه آزمایشی SalonMall — کد تأیید: <b dir="ltr">{DEMO_CODE}</b></div>
            <label>کد تأیید</label>
            <input
              inputMode="numeric"
              placeholder="۶ رقمی"
              value={code}
              onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
            />
            {error && <div className="authError">{error}</div>}
            <button type="submit">تأیید و ورود به پنل فروشنده</button>
          </form>
        ) : (
          <>
            <div className="authError">اطلاعات ثبت‌نام فروشنده پیدا نشد.</div>
            <Link className="sellerLink" href="/seller/register">بازگشت به ثبت‌نام فروشنده</Link>
          </>
        )}

        <small><ShieldCheck /> اطلاعات این نسخه فعلاً فقط روی همین مرورگر ذخیره می‌شود.</small>
      </section>

      <Credit />
    </main>
  );
}

function Credit() {
  return <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>;
}
