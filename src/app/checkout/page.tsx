"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, MapPin, Truck, ShieldCheck } from "lucide-react";
import { formatPrice, getProduct } from "../../lib/catalog";
import { readCart } from "../../lib/shop-store";

export default function Checkout() {
  const router = useRouter();
  const [lines, setLines] = useState(readCart());
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    postal: "",
  });

  useEffect(() => {
    setLines(readCart());
  }, []);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + (getProduct(line.id)?.price || 0) * line.qty, 0),
    [lines]
  );

  function update(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  }

  function continueToPayment(e: FormEvent) {
    e.preventDefault();
    if (!lines.length) {
      setError("سبد خرید شما خالی است.");
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim() || !form.postal.trim()) {
      setError("لطفاً تمام اطلاعات آدرس و تماس را کامل کنید.");
      return;
    }
    window.localStorage.setItem("salonmall.checkout.v1", JSON.stringify(form));
    router.push("/payment");
  }

  return (
    <main className="innerPage">
      <header className="innerHeader">
        <Link href="/cart"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>تکمیل خرید</small></div></div>
        <span />
      </header>

      <form className="checkoutPage" onSubmit={continueToPayment}>
        <div className="checkoutSteps"><b>۱ سبد خرید</b><b className="activeStep">۲ آدرس و ارسال</b><b>۳ پرداخت</b></div>
        <div className="checkoutLayout">
          <div>
            <section className="checkoutBox">
              <h2><MapPin /> آدرس تحویل</h2>
              <label>نام و نام خانوادگی</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} />
              <label>شماره تماس</label>
              <input inputMode="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <label>استان و شهر</label>
              <input value={form.city} onChange={(e) => update("city", e.target.value)} />
              <label>آدرس کامل</label>
              <textarea rows={3} value={form.address} onChange={(e) => update("address", e.target.value)} />
              <label>کد پستی</label>
              <input inputMode="numeric" value={form.postal} onChange={(e) => update("postal", e.target.value)} />
            </section>

            <section className="checkoutBox">
              <h2><Truck /> روش ارسال</h2>
              <label className="shippingChoice">
                <input type="radio" defaultChecked name="shipping" />
                <span><b>ارسال استاندارد</b><small>هزینه پس از محاسبه فروشنده نمایش داده می‌شود</small></span>
              </label>
            </section>
          </div>

          <aside className="checkout sticky">
            <h2>خلاصه پرداخت</h2>
            <p><span>جمع کالاها</span><b>{formatPrice(total)}</b></p>
            <p><span>ارسال</span><b>محاسبه در ادامه</b></p>
            <hr />
            <p className="total"><span>جمع سفارش</span><b>{formatPrice(total)}</b></p>
            {error && <div className="checkoutError">{error}</div>}
            <button type="submit">ادامه به پرداخت</button>
            <small><ShieldCheck /> پرداخت امن و ثبت سفارش</small>
          </aside>
        </div>
      </form>

      <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>
    </main>
  );
}
