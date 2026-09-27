import Link from "next/link";
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
} from "lucide-react";
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
  {
    off: "-۲۰٪",
    image: "https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606",
    name: "ماشین اصلاح حرفه‌ای",
    href: "/product/professional-clipper",
  },
  {
    off: "-۱۵٪",
    image: "https://images.prom.ua/5457361709_w1280_h640_5457361709.jpg",
    name: "سشوار حرفه‌ای سالن",
    href: "/product/professional-dryer",
  },
  {
    off: "-۱۲٪",
    image: "https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846",
    name: "محصول مراقبت مو",
    href: "/product/hair-wax",
  },
  {
    off: "-۱۸٪",
    image: "https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540",
    name: "قیچی حرفه‌ای",
    href: "/product/professional-scissors",
  },
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
  return (
    <main className="sm-home">
      <section className="sm-hero">
        <header className="sm-top">
          <div className="sm-bar">
            <Link href="/cart" className="sm-cart" aria-label="سبد خرید">
              <ShoppingCart /><span>۲</span>
            </Link>
            <Brand />
            <button className="sm-menu" aria-label="منو"><Menu /></button>
          </div>

          <div className="sm-search">
            <Link href="/visual-search" className="sm-cam" aria-label="جستجو با تصویر"><Camera /></Link>
            <span>جستجوی محصول، برند یا دسته‌بندی ...</span>
            <Link href="/category/clippers" className="sm-go" aria-label="جستجو"><Search /></Link>
          </div>
        </header>

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
          {offers.map((item) => (
            <article className="sm-card" key={item.href}>
              <span className="sm-off">{item.off}</span>
              <button className="sm-heart" aria-label="افزودن به علاقه‌مندی"><Heart /></button>
              <Link href={item.href}>
                <div className="sm-pic"><img src={item.image} alt={item.name} /></div>
                <h3>{item.name}</h3>
              </Link>
            </article>
          ))}
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
