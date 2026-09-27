"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Store, CheckCircle2 } from "lucide-react";

export default function SellerRegister() {
  const router = useRouter();
  const [form, setForm] = useState({ shop: "", name: "", phone: "", city: "" });
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.shop.trim() || !form.name.trim() || !form.city.trim()) {
      setError("لطفاً نام فروشگاه، نام مسئول و شهر را کامل کنید.");
      return;
    }
    if (!/^09\d{9}$/.test(form.phone)) {
      setError("شماره موبایل باید ۱۱ رقم و با 09 شروع شود.");
      return;
    }
    if (!accepted) {
      setError("برای ادامه باید قوانین فروشندگان را بپذیرید.");
      return;
    }

    window.localStorage.setItem(
      "salonmall.seller.registration.v1",
      JSON.stringify({ ...form, accepted: true, createdAt: Date.now() })
    );
    router.push("/seller/verify");
  }

  return (
    <main className="innerPage">
      <header className="innerHeader">
        <Link href="/"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>مرکز فروشندگان</small></div></div>
        <span />
      </header>

      <section className="sellerOnboard">
        <div className="sellerIntro">
          <Store size={46} />
          <small>فروش در سالن‌مال</small>
          <h1>غرفه حرفه‌ای خودت را بساز</h1>
          <p>محصولاتت را روی کاتالوگ مرکزی سالن‌مال عرضه کن؛ بدون ساخت صفحات تکراری و با امکان مقایسه شفاف قیمت.</p>
          <div className="sellerChecks">
            <span><CheckCircle2 /> ثبت و مدیریت کالا</span>
            <span><CheckCircle2 /> دریافت سفارش</span>
            <span><CheckCircle2 /> گزارش فروش</span>
            <span><CheckCircle2 /> تسویه و صورتحساب</span>
          </div>
        </div>

        <form className="sellerForm" onSubmit={submit}>
          <h2>ثبت‌نام فروشنده</h2>

          <label>نام فروشگاه / غرفه</label>
          <input value={form.shop} onChange={(e) => update("shop", e.target.value)} placeholder="مثلاً ابزار حرفه‌ای تهران" />

          <label>نام و نام خانوادگی</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="نام مسئول فروشگاه" />

          <label>شماره موبایل</label>
          <input
            inputMode="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="09xxxxxxxxx"
          />

          <label>شهر</label>
          <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="تهران" />

          <label className="check">
            <input type="checkbox" checked={accepted} onChange={(e) => { setAccepted(e.target.checked); setError(""); }} />
            قوانین فروشندگان سالن‌مال را می‌پذیرم
          </label>

          {error && <div className="authError">{error}</div>}
          <button type="submit">ادامه و احراز اطلاعات</button>
        </form>
      </section>

      <Credit />
    </main>
  );
}

function Credit() {
  return <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>;
}
