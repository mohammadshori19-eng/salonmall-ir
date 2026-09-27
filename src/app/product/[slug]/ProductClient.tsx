"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Heart, ShoppingCart, ShieldCheck, Truck, Store, Star } from "lucide-react";
import { CatalogProduct, formatPrice } from "../../../lib/catalog";
import { addToCart, cartCount, readFavorites, toggleFavorite } from "../../../lib/shop-store";

export default function ProductClient({ product }: { product: CatalogProduct }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [notice, setNotice] = useState("");

  const refresh = () => {
    setFavorites(readFavorites());
    setCount(cartCount());
  };

  useEffect(() => {
    refresh();
    window.addEventListener("salonmall:cart", refresh);
    window.addEventListener("salonmall:favorites", refresh);
    return () => {
      window.removeEventListener("salonmall:cart", refresh);
      window.removeEventListener("salonmall:favorites", refresh);
    };
  }, []);

  const favorite = favorites.includes(product.id);

  function add() {
    addToCart(product.id);
    setNotice("به سبد خرید اضافه شد");
    setTimeout(() => setNotice(""), 1600);
  }

  return (
    <main className="innerPage">
      <header className="innerHeader">
        <Link href="/" className="back"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>مرکز خرید تخصصی لوازم آرایشگاهی</small></div></div>
        <Link href="/cart" className="innerCart" aria-label="سبد خرید"><ShoppingCart />{count > 0 && <span>{count}</span>}</Link>
      </header>

      <div className="crumb">خانه / محصولات / <b>{product.name}</b></div>

      {notice && <div className="shopToast">{notice}</div>}

      <section className="productDetail">
        <div className="detailImage">
          <button
            type="button"
            className={"detailHeart " + (favorite ? "isFavorite" : "")}
            onClick={() => setFavorites(toggleFavorite(product.id))}
            aria-label="علاقه‌مندی"
          >
            <Heart fill={favorite ? "currentColor" : "none"} />
          </button>
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detailInfo">
          <small>{product.brand}</small>
          <h1>{product.name}</h1>
          <div className="rating"><Star size={17} /> {product.rating.toLocaleString("fa-IR")} <span>({product.sold.toLocaleString("fa-IR")} خرید)</span></div>
          <p>کالای تخصصی مناسب استفاده حرفه‌ای در سالن و آرایشگاه.</p>
          <div className="detailPrice">{formatPrice(product.price)}</div>
          <div className="assurances">
            <span><ShieldCheck /> ضمانت اصالت</span>
            <span><Truck /> {product.fast ? "ارسال سریع" : "ارسال استاندارد"}</span>
          </div>
          <button type="button" className="primaryBuyButton" onClick={add}><ShoppingCart size={18} /> افزودن به سبد خرید</button>
        </div>
      </section>

      <section className="offers">
        <h2>فروشندگان این محصول</h2>
        <div className="offer">
          <Store />
          <div><b>فروشگاه حرفه‌ای تهران</b><small>{product.fast ? "ارسال امروز" : "ارسال فردا"} • امتیاز ۴.۹</small></div>
          <strong>{formatPrice(product.price)}</strong>
          <button type="button" onClick={add}>افزودن به سبد</button>
        </div>
        <div className="offer">
          <Store />
          <div><b>ابزار سالن</b><small>ارسال فردا • امتیاز ۴.۸</small></div>
          <strong>{formatPrice(product.price + 70000)}</strong>
          <button type="button" onClick={add}>افزودن به سبد</button>
        </div>
      </section>

      <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>
    </main>
  );
}
