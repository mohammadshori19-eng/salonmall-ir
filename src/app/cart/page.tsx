"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Minus, Plus, Trash2, ShieldCheck } from "lucide-react";
import { formatPrice, getProduct } from "../../lib/catalog";
import { CartLine, readCart, writeCart } from "../../lib/shop-store";

export default function Cart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readCart());
    setReady(true);
  }, []);

  function updateQty(id: string, delta: number) {
    const next = lines
      .map((line) => line.id === id ? { ...line, qty: Math.max(0, line.qty + delta) } : line)
      .filter((line) => line.qty > 0);
    setLines(next);
    writeCart(next);
  }

  function remove(id: string) {
    const next = lines.filter((line) => line.id !== id);
    setLines(next);
    writeCart(next);
  }

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + (getProduct(line.id)?.price || 0) * line.qty, 0),
    [lines]
  );

  return (
    <main className="innerPage">
      <header className="innerHeader">
        <Link href="/" className="back"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>سبد خرید</small></div></div>
        <span />
      </header>

      <div className="cartPage">
        <h1>سبد خرید شما</h1>

        {ready && lines.length === 0 ? (
          <section className="emptyCart">
            <h2>سبد خرید خالی است</h2>
            <p>محصول موردنظرت را از فروشگاه انتخاب کن.</p>
            <Link href="/category/clippers">مشاهده محصولات</Link>
          </section>
        ) : (
          <div className="cartLayout">
            <section className="cartItems">
              {lines.map((line) => {
                const product = getProduct(line.id);
                if (!product) return null;
                return (
                  <article className="cartItem" key={line.id}>
                    <div className="miniProduct miniProductImage"><img src={product.image} alt={product.name} /></div>
                    <div>
                      <b>{product.name}</b>
                      <small>فروشنده: فروشگاه حرفه‌ای تهران</small>
                      <div className="qty">
                        <button type="button" onClick={() => updateQty(line.id, 1)} aria-label="افزایش تعداد"><Plus /></button>
                        <span>{line.qty.toLocaleString("fa-IR")}</span>
                        <button type="button" onClick={() => updateQty(line.id, -1)} aria-label="کاهش تعداد"><Minus /></button>
                      </div>
                    </div>
                    <strong>{formatPrice(product.price * line.qty)}</strong>
                    <button className="trashButton" type="button" onClick={() => remove(line.id)} aria-label="حذف محصول"><Trash2 /></button>
                  </article>
                );
              })}
            </section>

            <aside className="checkout">
              <h2>خلاصه سفارش</h2>
              <p><span>جمع کالاها</span><b>{formatPrice(total)}</b></p>
              <p><span>هزینه ارسال</span><b>در مرحله بعد</b></p>
              <hr />
              <p className="total"><span>مبلغ قابل پرداخت</span><b>{formatPrice(total)}</b></p>
              <Link className="checkoutGo" href="/checkout">ادامه فرایند خرید</Link>
              <small><ShieldCheck /> پرداخت امن SalonMall</small>
            </aside>
          </div>
        )}
      </div>

      <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>
    </main>
  );
}
