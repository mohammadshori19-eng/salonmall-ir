"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { products, formatPrice } from "../../../lib/catalog";
import { addToCart, readFavorites, toggleFavorite } from "../../../lib/shop-store";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const items = products.filter((product) => favorites.includes(product.id));

  function remove(id: string) {
    setFavorites(toggleFavorite(id));
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
        <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>علاقه‌مندی‌ها</small></div></div>
        <Link href="/cart"><ShoppingCart /></Link>
      </header>

      <section className="favoritesPage">
        <h1>محصولات نشان‌شده</h1>
        {notice && <div className="shopToast">{notice}</div>}

        {items.length ? (
          <div className="listingGrid favoritesGrid">
            {items.map((product) => (
              <article className="product" key={product.id}>
                <button type="button" className="heart heartButton isFavorite" onClick={() => remove(product.id)}>
                  <Heart size={18} fill="currentColor" />
                </button>
                <Link href={"/product/" + product.id}>
                  <div className="productImg"><img src={product.image} alt={product.name} /></div>
                  <small>{product.brand}</small>
                  <h3>{product.name}</h3>
                </Link>
                <b className="price">{formatPrice(product.price)}</b>
                <button type="button" className="cartBtn cartButton" onClick={() => add(product.id)}><ShoppingCart size={17} /></button>
              </article>
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <Heart />
            <h2>هنوز محصولی نشان نکرده‌ای</h2>
            <Link href="/category/clippers">مشاهده محصولات</Link>
          </div>
        )}
      </section>
    </main>
  );
}
