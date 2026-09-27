import { Camera, Search, ShoppingCart, Menu, User, Heart, Home, Grid2X2, Package, ShieldCheck, Truck, Headphones, BadgeCheck, Store } from "lucide-react";

const categories = [
  ["▰","ماشین اصلاح"],["✂","قیچی و ابزار"],["▥","محصولات مو"],["◉","محصولات پوستی"],
  ["●","رنگ و دکلره"],["▣","تجهیزات سالن"],["▤","یکبار مصرف"],["▦","مبلمان و دکور"],["▧","تجهیزات جانبی"],["٪","فروش ویژه"]
];
const products = [
  ["https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606","اندیس","ماشین اصلاح حرفه‌ای","۴,۸۵۰,۰۰۰","۲۰٪"],
  ["https://images.prom.ua/5457361709_w1280_h640_5457361709.jpg","جی‌آرال","سشوار حرفه‌ای","۲,۹۸۰,۰۰۰","۱۵٪"],
  ["https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846","ساچاوان","واکس موی حرفه‌ای","۴۹۰,۰۰۰","۱۰٪"],
  ["https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540","کی‌فایو","قیچی حرفه‌ای","۲,۸۵۰,۰۰۰","۱۸٪"]
];

export default function Home(){
 return <main>
  <div className="utility"><span>ورود / ثبت‌نام</span><div><span>فروشنده حرفه‌ای هستید؟</span><span>پیگیری سفارش</span><span>فروشنده شوید</span></div></div>
  <header className="mainHeader">
    <button className="mobileMenu"><Menu/></button>
    <div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>مرکز خرید تخصصی لوازم آرایشگاهی</small></div></div>
    <div className="search"><Search size={20}/><input placeholder="جستجوی محصول، برند یا دسته‌بندی ..."/><button><Camera size={20}/></button></div>
    <div className="headerLinks"><b>دسته‌بندی‌ها</b><ShoppingCart/><span className="cartCount">۲</span></div>
  </header>
  <nav className="nav"><Menu size={18}/><b>همه دسته‌ها</b><span>ماشین اصلاح</span><span>ابزار و قیچی</span><span>محصولات مو</span><span>محصولات پوستی</span><span>رنگ و دکلره</span><span>تجهیزات سالن</span><span>مبلمان و دکور</span><span>یکبار مصرف</span><span className="hot">فروش ویژه</span></nav>

  <section className="hero">
    <div className="heroCopy"><small>کیفیت. اطمینان. حرفه‌ای‌تر</small><h1>همه چیز برای<br/>یک سالن حرفه‌ای</h1><p>از ماشین اصلاح و قیچی حرفه‌ای تا محصولات مراقبتی و تجهیزات کامل سالن؛ در یک بازار تخصصی.</p><button>مشاهده محصولات ←</button></div>
    <div className="heroProducts">
      <div className="clipperShape"><i></i><b>WAHL</b></div><div className="combShape">|||||||||||</div><div className="bottleShape tall">PRO</div><div className="scissorShape">✂</div><div className="jarShape">MATTE<br/>PASTE</div><div className="sprayShape">NISH<br/>MAN</div>
    </div>
    <div className="heroBenefits"><div><BadgeCheck/> اصالت کالا<small>از برندهای معتبر</small></div><div><ShieldCheck/> تضمین قیمت<small>مقایسه با انتخاب بهتر</small></div><div><ShieldCheck/> پرداخت امن<small>درگاه مطمئن</small></div><div><Truck/> ارسال سریع<small>به سراسر ایران</small></div><div><Headphones/> پشتیبانی تخصصی<small>قبل و بعد از خرید</small></div></div>
  </section>

  <section className="categoryStrip">{categories.map(([icon,name])=><div key={name}><span>{icon}</span><b>{name}</b></div>)}</section>

  <section className="promoGrid"><article className="promo p1"><div><h3>ماشین‌های اصلاح</h3><p>دقیق، قدرتمند، حرفه‌ای</p><button>مشاهده برندها</button></div><strong>ماشین اصلاح</strong></article><article className="promo p2"><div><h3>محصولات مراقبت مو</h3><p>از برندهای معتبر جهانی</p><button>مشاهده محصولات</button></div><strong>مراقبت مو</strong></article><article className="promo p3"><div><h3>تجهیزات کامل سالن</h3><p>با کیفیت و ماندگار</p><button>مشاهده تجهیزات</button></div><strong>تجهیزات سالن</strong></article></section>

  <section className="productsSection"><div className="sectionHead"><h2>پیشنهادهای ویژه</h2><a>مشاهده همه</a></div><div className="productGrid">{products.map(([visual,brand,name,price,off])=><article className="product" key={name}><div className="discount">-{off}</div><Heart className="heart" size={18}/><div className="productImg"><img src={visual} alt={name}/></div><small>{brand}</small><h3>{name}</h3><div className="stars">★★★★★ <span>۴.۸</span></div><b className="price">{price} تومان</b><button className="cartBtn"><ShoppingCart size={17}/></button></article>)}</div></section>

  <section className="brands"><h3>برندهای محبوب</h3><div><b>وال</b><b>بابیلیس پرو</b><b>شوارتسکف</b><b>لورآل</b><b>نیش‌من</b><b>جگوار</b><b>اندیس</b></div></section>
  <section className="sellerBanner"><div><small>فروشنده حرفه‌ای هستید؟</small><h2>فروشگاه خودت را در SalonMall بساز</h2><p>محصولاتت را روی کاتالوگ مرکزی عرضه کن، سفارش بگیر و فروش را مدیریت کن.</p><button>ثبت‌نام فروشنده</button></div><div className="sellerArt">فروشنده<br/>حرفه‌ای</div></section>
  <section className="cameraFeature"><Camera size={40}/><div><small>جستجوی تصویری</small><h2>عکس بگیر، محصول را پیدا کن</h2><p>SalonMall تصویر را با کاتالوگ مقایسه می‌کند و همان محصول یا نزدیک‌ترین گزینه‌ها را با فروشندگان مختلف نشان می‌دهد.</p></div><button>جستجو با عکس</button></section>

  <footer><div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>بازار تخصصی صنعت آرایش و زیبایی</small></div></div><div className="developerCredit">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div></footer>
  <div className="mobileBottom"><div><Home/><small>خانه</small></div><div><Grid2X2/><small>دسته‌بندی</small></div><div><Heart/><small>علاقه‌مندی</small></div><div><Package/><small>سفارش‌ها</small></div><div><User/><small>پروفایل</small></div></div>
 </main>
}