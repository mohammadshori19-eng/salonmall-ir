import Link from "next/link";
import "./home.css";

const categories = [
  ["https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606","ماشین اصلاح","clippers"],
  ["https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540","قیچی و ابزار","scissors-tools"],
  ["https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846","محصولات مو","hair-products"],
  ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=80","محصولات پوستی","skin-care"],
  ["https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=400&q=80","تجهیزات سالن","salon-equipment"],
  ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80","مبلمان و دکور","furniture-decor"],
  ["https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=400&q=80","رنگ و دکلره","hair-color-bleach"],
  ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80","عطر و ادکلن","fragrance"],
];

export default function Home(){
  return <main className="sm-home">
    <section className="sm-hero">
      <div className="sm-top">
        <div className="sm-bar">
          <Link href="/cart" className="sm-cart">🛒<span>۲</span></Link>
          <div className="sm-brand"><i>S</i>Salon<em>Mall</em><small>مرکز تخصصی لوازم آرایشگاهی</small></div>
          <button className="sm-menu" aria-label="منو">☰</button>
        </div>
        <div className="sm-search">
          <Link href="/category/clippers" className="sm-go">⌕</Link>
          <span>جستجوی محصول، برند یا دسته‌بندی ...</span>
          <Link href="/visual-search" className="sm-cam">📷</Link>
        </div>
      </div>

      <div className="sm-hero-copy">
        <div className="sm-kicker">کیفیت حرفه‌ای، انتخاب حرفه‌ای‌تر</div>
        <h1>همه چیز برای<br/>یک سالن حرفه‌ای</h1>
        <p>از ماشین اصلاح و قیچی حرفه‌ای تا محصولات مراقبتی و تجهیزات کامل سالن؛ در یک بازار تخصصی.</p>
        <Link className="sm-cta" href="/category/clippers">مشاهده محصولات ←</Link>
        <div className="sm-dots"><i></i><i></i><i></i></div>
      </div>

      <div className="sm-collage">
        <img className="sm-pc1" src="https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606" alt="ماشین اصلاح"/>
        <img className="sm-pc2" src="https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846" alt="محصول مو"/>
        <img className="sm-pc3" src="https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=400&q=85" alt="محصول آرایشگاهی"/>
        <div className="sm-scissors">✂️</div>
      </div>
    </section>

    <section className="sm-trust">
      <div><b>🚚</b><strong>ارسال سریع</strong><small>به سراسر ایران</small></div>
      <div><b>♢</b><strong>پرداخت امن</strong><small>درگاه معتبر</small></div>
      <div><b>٪</b><strong>تضمین قیمت</strong><small>مقایسه انتخاب بهتر</small></div>
      <div><b>♧</b><strong>پشتیبانی تخصصی</strong><small>قبل و بعد از خرید</small></div>
    </section>

    <section className="sm-section">
      <div className="sm-title"><h2>دسته‌بندی محصولات</h2><Link href="/category/clippers">مشاهده همه ←</Link></div>
      <div className="sm-cats">{categories.map(([img,name,slug])=>
        <Link href={"/category/"+slug} className="sm-cat" key={slug}>
          <span><img src={img} alt={name}/></span><b>{name}</b>
        </Link>)}
      </div>
    </section>

    <section className="sm-promos">
      <Link href="/category/salon-equipment" className="sm-promo sm-promo1"><div><h3>تجهیزات کامل سالن</h3><p>با کیفیت و ماندگار</p><span>مشاهده تجهیزات</span></div></Link>
      <Link href="/category/hair-products" className="sm-promo sm-promo2"><div><h3>محصولات مراقبت مو</h3><p>از برندهای معتبر جهانی</p><span>مشاهده محصولات</span></div></Link>
    </section>

    <section className="sm-section sm-special">
      <div className="sm-title"><h2>پیشنهادهای ویژه</h2><Link href="/category/sale">مشاهده همه ←</Link></div>
      <div className="sm-products">
        <article className="sm-card"><span className="sm-heart">♡</span><span className="sm-off">-۲۰٪</span><Link href="/product/professional-clipper"><div className="sm-pic"><img src="https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606" alt="ماشین اصلاح"/></div><h3>ماشین اصلاح حرفه‌ای Wahl</h3></Link><small>از چند فروشنده</small><div className="sm-rating">★★★★★ ۴.۸</div><del>۶,۲۰۰,۰۰۰</del><strong>۴,۹۶۰,۰۰۰ تومان</strong></article>
        <article className="sm-card"><span className="sm-heart">♡</span><span className="sm-off">-۱۵٪</span><Link href="/product/professional-dryer"><div className="sm-pic"><img src="https://images.prom.ua/5457361709_w1280_h640_5457361709.jpg" alt="سشوار"/></div><h3>سشوار حرفه‌ای سالن</h3></Link><small>از چند فروشنده</small><div className="sm-rating">★★★★★ ۴.۷</div><del>۳,۵۰۰,۰۰۰</del><strong>۲,۹۷۵,۰۰۰ تومان</strong></article>
        <article className="sm-card"><span className="sm-heart">♡</span><span className="sm-off">-۱۲٪</span><Link href="/product/hair-wax"><div className="sm-pic"><img src="https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846" alt="محصول مو"/></div><h3>محصول حالت‌دهنده حرفه‌ای</h3></Link><small>از چند فروشنده</small><div className="sm-rating">★★★★★ ۴.۷</div><del>۷۹۰,۰۰۰</del><strong>۶۹۵,۰۰۰ تومان</strong></article>
        <article className="sm-card"><span className="sm-heart">♡</span><span className="sm-off">-۱۸٪</span><Link href="/product/professional-scissors"><div className="sm-pic"><img src="https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540" alt="قیچی"/></div><h3>قیچی حرفه‌ای آرایشگری</h3></Link><small>از چند فروشنده</small><div className="sm-rating">★★★★★ ۴.۹</div><del>۳,۴۵۰,۰۰۰</del><strong>۲,۸۲۹,۰۰۰ تومان</strong></article>
      </div>
    </section>

    <section className="sm-seller"><h3>فروشنده حرفه‌ای هستید؟</h3><p>غرفه خودتان را بسازید، محصولات را ثبت کنید و سفارش‌ها را از یک پنل مدیریت کنید.</p><Link className="sm-cta" href="/seller/register">شروع فروش در SalonMall</Link></section>
    <footer className="sm-credit">طراحی و توسعه: محمد شوری | <a href="https://mohamadshori.ir">Mohamadshori.ir</a></footer>

    <nav className="sm-bottom">
      <Link className="active" href="/"><i>⌂</i><span>خانه</span></Link>
      <Link href="/category/sale"><i>٪</i><span>پیشنهادها</span></Link>
      <Link href="/category/clippers"><i>▦</i><span>دسته‌بندی‌ها</span></Link>
      <Link href="/account/favorites"><i>♡</i><span>علاقه‌مندی</span></Link>
      <Link href="/login"><i>♙</i><span>پنل کاربری</span></Link>
    </nav>
  </main>
}