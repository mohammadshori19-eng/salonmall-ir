"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, CreditCard, ShieldCheck } from "lucide-react";
import { formatPrice, getProduct } from "../../lib/catalog";
import { readCart } from "../../lib/shop-store";

export default function PaymentPage() {
  const [lines, setLines] = useState(readCart());

  useEffect(() => {
    setLines(readCart());
  }, []);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + (getProduct(line.id)?.price || 0) * line.qty, 0),
    [lines]
  );

  return (
    <main className="innerPage">
      <header className="innerHeader">
        <Link href="/checkout" className="back"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>پرداخت</small></div></div>
        <span />
      </header>

      <section className="paymentPage">
        <div className="checkoutSteps"><b>۱ سبد خرید</b><b>۲ آدرس و ارسال</b><b className="activeStep">۳ پرداخت</b></div>
        <div className="paymentCard">
          <div className="paymentIcon"><CreditCard /></div>
          <h1>آماده انتقال به درگاه پرداخت</h1>
          <p>جمع سفارش: <b>{formatPrice(total)}</b></p>
          <div className="paymentNotice">
            درگاه بانکی SalonMall هنوز به نسخه آزمایشی متصل نشده است؛ بنابراین در این مرحله هیچ مبلغی دریافت و هیچ سفارش نهایی ثبت نمی‌شود.
          </div>
          <div className="paymentSecure"><ShieldCheck /> اطلاعات خرید شما در مرورگر حفظ شده است.</div>
          <Link className="paymentBack" href="/checkout">بازگشت و ویرایش اطلاعات</Link>
        </div>
      </section>
    </main>
  );
}
