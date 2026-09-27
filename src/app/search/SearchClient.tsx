"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Heart, Search, ShoppingCart, ChevronRight } from "lucide-react";
import { products, formatPrice } from "../../lib/catalog";
import { addToCart, readFavorites, toggleFavorite } from "../../lib/shop-store";

export default function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery);
  const [favorites, setFavorites] = useState<string[]>(() => typeof window === "undefined" ? [] : readFavorites());
  const [notice, setNotice] = useState("");

  const results = useMemo(() => {
    const q = submitted.trim().toLocaleLowerCase("fa");
    if (!q) return [];
    return products.filter((product) =>
      [product.name, product.brand, ...product.categories].join(" ").toLocaleLowerCase("fa").includes(q)
    );
  }, [submitted]);

  function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(query);
    const url = "/search?q=" + encodeURIComponent(query.trim());
    window.history.replaceState(null, "", url);
  }

  function add(id: string) {
    addToCart(id);
    setNotice("به سبد خرید اضافه شد");
    setTimeout(() => setNotice(""), 1500);
  }

  return (
    <main className="innerPage">
      <header className="innerHeader">
        <Link href="/" className="back"><ChevronRight /></Link>
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>جستجوی محصولات</small></div></div>
        <Link href="/cart"><ShoppingCart /></Link>
      </header>

      <section className="searchPage">
        <h1>جستجوی محصولات</h1>
        <form className="functionalSearch" onSubmit={submit}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="نام محصول یا برند..." autoFocus />
          <button type="submit"><Search size={19} /> جستجو</button>
        </form>

        {notice && <div className="shopToast">{notice}</div>}

        <p className="searchSummary">{submitted ? `نتایج برای «${submitted}» — ${results.length.toLocaleString("fa-IR")} محصول` : "عبارت موردنظر را جستجو کنید."}</p>

        <div className="listingGrid searchGrid">
          {results.map((product) => {
            const favorite = favorites.includes(product.id);
            return (
              <article className="product" key={product.id}>
                <button
                  type="button"
                  className={"heart heartButton " + (favorite ? "isFavorite" : "")}
                  onClick={() => setFavorites(toggleFavorite(product.id))}
                  aria-label="علاقه‌مندی"
                >
                  <Heart size={18} fill={favorite ? "currentColor" : "none"} />
                </button>
                <Link href={"/product/" + product.id}>
                  <div className="productImg"><img src={product.image} alt={product.name} /></div>
                  <small>{product.brand}</small>
                  <h3>{product.name}</h3>
                </Link>
                <b className="price">{formatPrice(product.price)}</b>
                <button type="button" className="cartBtn cartButton" onClick={() => add(product.id)}><ShoppingCart size={17} /></button>
              </article>
            );
          })}
        </div>

        {submitted && !results.length && <div className="emptyState">محصولی با این عبارت پیدا نشد.</div>}
      </section>
    </main>
  );
}
