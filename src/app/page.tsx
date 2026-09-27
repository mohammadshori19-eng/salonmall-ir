"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgePercent,
  Camera,
  Grid2X2,
  Headphones,
  Heart,
  Home as HomeIcon,
  Menu,
  Percent,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { products } from "../lib/catalog";
import { cartCount, readFavorites, toggleFavorite } from "../lib/shop-store";
import "./home.css";

const categories = [
  ["https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606", "ماشین اصلاح", "clippers"],
  ["https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540", "قیچی و ابزار", "scissors-tools"],
  ["https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=500&q=85", "محصولات مو", "hair-products"],
  ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=85", "محصولات پوستی", "skin-care"],
  ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=85", "تجهیزات سالن", "salon-equipment"],
  ["https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=500&q=85", "مبلمان و دکور", "furniture-decor"],
  ["https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=500&q=85", "رنگ و دکلره", "hair-color-bleach"],
  ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=85", "عطر و ادکلن", "fragrance"],
] as const;

const offers = [
  { off: "-۲۰٪", id: "professional-clipper" },
  { off: "-۱۵٪", id: "professional-dryer" },
  { off: "-۱۲٪", id: "hair-wax" },
  { off: "-۱۸٪", id: "professional-scissors" },
] as const;

function Brand() {
  return (
    <Link href="/" className="sm-brand" aria-label="SalonMall">
      <i>S</i>
      <span>Salon<em>Mall</em><small>مرکز تخصصی لوازم آرایشگاهی</small></span>
    </Link>
  );
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [count, setCount] = useState(0);

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

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push("/search?q=" + encodeURIComponent(q));
  }

  return (
    <main className="sm-home">
      <section className="sm-hero">
        <header className="sm-top">
          <div className="sm-bar">
            <Link href="/cart" className="sm-cart" aria-label="سبد خرید">
              <ShoppingCart />{count > 0 && <span>{count}</span>}
            </Link>
            <Brand />
            <button type="button" className="sm-menu" aria-label="منو" onClick={() => setMenuOpen(true)}><Menu /></button>
          </div>

          <form className="sm-search" onSubmit={submitSearch}>
            <Link href="/visual-search" className="sm-cam" aria-label="جستجو با تصویر"><Camera /></Link>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی محصول، برند یا دسته‌بندی ..."
              aria-label="جستجوی محصولات"
            />
            <button type="submit" className="sm-go" aria-label="جستجو"><Search /></button>
          </form>
        </header>

        {menuOpen && (
          <>
            <button className="sm-drawerBackdrop" aria-label="بستن منو" onClick={() => setMenuOpen(false)} />
            <aside className="sm-drawer" aria-label="منوی سایت">
              <button className="sm-drawerClose" type="button" onClick={() => setMenuOpen(false)}><X /></button>
              <Brand />
              <nav>
                <Link href="/" onClick={() => setMenuOpen(false)}>خانه</Link>
                <Link href="/category/clippers" onClick={() => setMenuOpen(false)}>دسته‌بندی محصولات</Link>
                <Link href="/category/sale" onClick={() => setMenuOpen(false)}>پیشنهادهای ویژه</Link>
                <Link href="/account/favorites" onClick={() => setMenuOpen(false)}>علاقه‌مندی‌ها</Link>
                <Link href="/cart" onClick={() => setMenuOpen(false)}>سبد خرید</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)}>ورود / پنل کاربری</Link>
                <Link href="/seller/register" onClick={() => setMenuOpen(false)}>فروشنده شوید</Link>
              </nav>
            </aside>
          </>
        )}

        <div className="sm-hero-copy">
          <div className="sm-kicker">کیفیت حرفه‌ای، انتخاب حرفه‌ای‌تر</div>
          <h1>همه چیز برای<br />یک سالن حرفه‌ای</h1>
          <p>از ماشین اصلاح و قیچی حرفه‌ای تا محصولات مراقبتی و تجهیزات کامل سالن؛ در یک بازار تخصصی.</p>
          <Link className="sm-cta" href="/category/clippers">مشاهده محصولات <b>←</b></Link>
          <div className="sm-dots"><i /><i /><i /></div>
        </div>

        <div className="sm-collage" aria-hidden="true">
          <img className="sm-clipper" src="https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606" alt="" />
          <img className="sm-bottle" src="https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846" alt="" />
          <img className="sm-jar" src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=450&q=85" alt="" />
        </div>
      </section>

      <section className="sm-trust" aria-label="مزایای خرید">
        <div><Truck /><span><strong>ارسال سریع</strong><small>به سراسر ایران</small></span></div>
        <div><ShieldCheck /><span><strong>پرداخت امن</strong><small>درگاه معتبر</small></span></div>
        <div><BadgePercent /><span><strong>تضمین قیمت</strong><small>مقایسه، انتخاب بهتر</small></span></div>
        <div><Headphones /><span><strong>پشتیبانی تخصصی</strong><small>قبل و بعد از خرید</small></span></div>
      </section>

      <section className="sm-categories" aria-label="دسته‌بندی محصولات">
        {categories.map(([image, name, slug]) => (
          <Link href={"/category/" + slug} className="sm-cat" key={slug}>
            <span><img src={image} alt={name} /></span>
            <b>{name}</b>
          </Link>
        ))}
      </section>

      <section className="sm-promos">
        <Link href="/category/salon-equipment" className="sm-promo sm-promo-chair">
          <div><h2>تجهیزات کامل سالن</h2><p>با کیفیت و ماندگار</p><span>مشاهده تجهیزات</span></div>
        </Link>
        <Link href="/category/hair-products" className="sm-promo sm-promo-hair">
          <div><h2>محصولات مراقبت مو</h2><p>از برندهای معتبر جهانی</p><span>مشاهده محصولات</span></div>
        </Link>
      </section>

      <section className="sm-special">
        <div className="sm-title">
          <h2>پیشنهادهای ویژه</h2>
          <Link href="/category/sale">← مشاهده همه</Link>
        </div>
        <div className="sm-products">
          {offers.map((item) => {
            const product = products.find((p) => p.id === item.id)!;
            const active = favorites.includes(product.id);
            return (
              <article className="sm-card" key={product.id}>
                <span className="sm-off">{item.off}</span>
                <button
                  type="button"
                  className={"sm-heart " + (active ? "isFavorite" : "")}
                  aria-label="افزودن به علاقه‌مندی"
                  onClick={() => setFavorites(toggleFavorite(product.id))}
                >
                  <Heart fill={active ? "currentColor" : "none"} />
                </button>
                <Link href={"/product/" + product.id}>
                  <div className="sm-pic"><img src={product.image} alt={product.name} /></div>
                  <h3>{product.name}</h3>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sm-seller">
        <h2>فروشنده حرفه‌ای هستید؟</h2>
        <p>غرفه خودتان را در بازار تخصصی SalonMall بسازید.</p>
        <Link href="/seller/register">شروع فروش</Link>
      </section>

      <footer className="sm-credit">
        طراحی و توسعه: محمد شوری | <a href="https://mohamadshori.ir">Mohamadshori.ir</a>
      </footer>

      <nav className="sm-bottom" aria-label="منوی اصلی">
        <Link className="active" href="/"><HomeIcon /><span>خانه</span></Link>
        <Link href="/category/sale"><Percent /><span>پیشنهادها</span></Link>
        <Link href="/category/clippers"><Grid2X2 /><span>دسته‌بندی‌ها</span></Link>
        <Link href="/account/favorites"><Heart /><span>علاقه‌مندی</span></Link>
        <Link href="/login"><UserRound /><span>پنل کاربری</span></Link>
      </nav>
    </main>
  );
}
