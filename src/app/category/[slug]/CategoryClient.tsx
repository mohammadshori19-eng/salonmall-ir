"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Heart, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { products, formatPrice } from "../../../lib/catalog";
import { addToCart, cartCount, readFavorites, toggleFavorite } from "../../../lib/shop-store";

type SortMode = "popular" | "newest" | "price" | "fast";

export default function CategoryClient({ title, slug }: { title: string; slug: string }) {
  const [sort, setSort] = useState<SortMode>("popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [fastOnly, setFastOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000000);
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

  const visible = useMemo(() => {
    let list = products.filter((product) =>
      product.categories.includes(slug) || ["skin-care", "furniture-decor", "hair-color-bleach", "fragrance"].includes(slug)
    );
    if (!list.length) list = products;
    list = list.filter((product) => product.price <= maxPrice);
    if (fastOnly || sort === "fast") list = list.filter((product) => product.fast);
    const copy = [...list];
    if (sort === "newest") copy.sort((a, b) => b.newness - a.newness);
    if (sort === "price") copy.sort((a, b) => a.price - b.price);
    if (sort === "popular") copy.sort((a, b) => b.sold - a.sold);
    return copy;
  }, [slug, sort, fastOnly, maxPrice]);

  function add(id: string) {
    addToCart(id);
    setNotice("به سبد خرید اضافه شد");
    setTimeout(() => setNotice(""), 1600);
  }

  function favorite(id: string) {
    setFavorites(toggleFavorite(id));
  }

  return (
    <main className="innerPage">
      <header className="innerHeader">
        <Link href="/" className="back"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>مرکز خرید تخصصی لوازم آرایشگاهی</small></div></div>
        <Link href="/cart" className="innerCart" aria-label="سبد خرید"><ShoppingCart />{count > 0 && <span>{count}</span>}</Link>
      </header>

      <div className="crumb">خانه / دسته‌بندی / <b>{title}</b></div>

      <div className="listingHead">
        <div><h1>{title}</h1><small>محصولات حرفه‌ای از فروشندگان معتبر</small></div>
        <button type="button" onClick={() => setFilterOpen((v) => !v)} className={filterOpen ? "activeFilter" : ""}>
          <SlidersHorizontal size={18} /> فیلتر
        </button>
      </div>

      {filterOpen && (
        <section className="filterPanel">
          <label>
            <span>حداکثر قیمت: {formatPrice(maxPrice)}</span>
            <input
              type="range"
              min="500000"
              max="5000000"
              step="250000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </label>
          <label className="filterCheck">
            <input type="checkbox" checked={fastOnly} onChange={(e) => setFastOnly(e.target.checked)} />
            فقط ارسال سریع
          </label>
          <button type="button" onClick={() => { setMaxPrice(5000000); setFastOnly(false); }}>پاک کردن فیلترها</button>
        </section>
      )}

      <div className="filterChips" role="tablist" aria-label="مرتب‌سازی محصولات">
        <button type="button" className={sort === "popular" ? "active" : ""} onClick={() => setSort("popular")}>پرفروش‌ترین</button>
        <button type="button" className={sort === "newest" ? "active" : ""} onClick={() => setSort("newest")}>جدیدترین</button>
        <button type="button" className={sort === "price" ? "active" : ""} onClick={() => setSort("price")}>ارزان‌ترین</button>
        <button type="button" className={sort === "fast" ? "active" : ""} onClick={() => setSort("fast")}>ارسال سریع</button>
      </div>

      {notice && <div className="shopToast">{notice}</div>}

      <section className="listingGrid">
        {visible.map((product) => (
          <article className="product" key={product.id}>
            <button
              type="button"
              className={"heart heartButton " + (favorites.includes(product.id) ? "isFavorite" : "")}
              aria-label="علاقه‌مندی"
              onClick={() => favorite(product.id)}
            >
              <Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
            </button>
            <Link href={"/product/" + product.id}>
              <div className="productImg"><img src={product.image} alt={product.name} /></div>
              <small>{product.brand}</small>
              <h3>{product.name}</h3>
            </Link>
            <div className="stars">★★★★★ <span>{product.rating.toLocaleString("fa-IR")}</span></div>
            <b className="price">{formatPrice(product.price)}</b>
            <button type="button" className="cartBtn cartButton" onClick={() => add(product.id)} aria-label="افزودن به سبد">
              <ShoppingCart size={17} />
            </button>
          </article>
        ))}
      </section>

      {!visible.length && <div className="emptyState">محصولی با این فیلتر پیدا نشد.</div>}

      <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>
    </main>
  );
}
