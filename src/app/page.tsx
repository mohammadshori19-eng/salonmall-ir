import { Camera, Search, ShoppingCart, Store, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

const categories = [
  "ماشین اصلاح", "قیچی و تیغ", "محصولات مو", "مراقبت پوست",
  "ناخن", "پیش‌بند و پوشاک", "تجهیزات سالن", "مصرفی و یکبارمصرف"
];

const products = [
  {name:"ماشین اصلاح حرفه‌ای", brand:"Wahl", price:"۴,۸۵۰,۰۰۰"},
  {name:"سشوار حرفه‌ای", brand:"BaBylissPRO", price:"۳,۹۸۰,۰۰۰"},
  {name:"واکس مو حرفه‌ای", brand:"Professional", price:"۴۹۰,۰۰۰"},
  {name:"قیچی حرفه‌ای", brand:"Jaguar", price:"۲,۸۵۰,۰۰۰"}
];

export default function Home() {
  return (
    <main>
      <header className="top">
        <div className="brand"><span className="mark">S</span><b>Salon<span>Mall</span></b></div>
        <div className="search">
          <Search size={20}/>
          <input aria-label="جستجو" placeholder="جستجوی محصول، برند یا فروشگاه..." />
          <button aria-label="جستجوی تصویری" title="جستجو با عکس"><Camera size={21}/></button>
        </div>
        <div className="actions"><span>ورود / ثبت‌نام</span><ShoppingCart/></div>
      </header>

      <nav className="nav">
        <b>همه دسته‌ها</b><span>ماشین اصلاح</span><span>ابزار و قیچی</span><span>محصولات مو</span>
        <span>تجهیزات سالن</span><span>برندها</span><span className="sale">فروش ویژه</span>
      </nav>

      <section className="hero">
        <div>
          <small>کیفیت حرفه‌ای • انتخاب حرفه‌ای‌تر</small>
          <h1>همه چیز برای<br/>یک سالن حرفه‌ای</h1>
          <p>محصولات و تجهیزات تخصصی، چند فروشنده برای هر کالا و مقایسه شفاف قیمت.</p>
          <button className="primary">مشاهده محصولات</button>
        </div>
        <div className="heroVisual">
          <div className="clipper">✂</div>
          <div className="bottle">PRO</div>
          <div className="chair">SALON</div>
        </div>
      </section>

      <section className="trust">
        <div><BadgeCheck/> اصالت کالا</div><div><ShieldCheck/> پرداخت امن</div>
        <div><Truck/> ارسال فروشندگان</div><div><Store/> فروشندگان معتبر</div>
      </section>

      <section className="section">
        <div className="sectionTitle"><h2>دسته‌بندی محصولات</h2><a>مشاهده همه</a></div>
        <div className="categories">
          {categories.map((x,i)=><div className="category" key={x}><span>{["▣","✂","◉","◇","◌","▤","▥","□"][i]}</span><b>{x}</b></div>)}
        </div>
      </section>

      <section className="promos">
        <div><h3>ماشین‌های اصلاح حرفه‌ای</h3><p>مقایسه قیمت چند فروشنده</p></div>
        <div><h3>خرید عمده سالن‌ها</h3><p>شرایط ویژه برای حرفه‌ای‌ها</p></div>
        <div><h3>فروشنده شوید</h3><p>غرفه خودتان را در SalonMall بسازید</p></div>
      </section>

      <section className="section">
        <div className="sectionTitle"><h2>پیشنهادهای ویژه</h2><a>مشاهده همه</a></div>
        <div className="products">
          {products.map((p,i)=><article className="product" key={p.name}>
            <div className={"productVisual p"+i}>SM</div>
            <small>{p.brand}</small><h3>{p.name}</h3>
            <div className="rating">★ ۴.۸</div><b className="price">{p.price} تومان</b>
            <button>مقایسه فروشندگان</button>
          </article>)}
        </div>
      </section>

      <section className="compare">
        <div><small>یک محصول، چند فروشنده</small><h2>قیمت را مقایسه کن؛ بهترین فروشنده را انتخاب کن</h2>
        <p>SalonMall برای هر کالا یک صفحه مرکزی دارد؛ فروشنده‌ها قیمت، موجودی و شرایط ارسال خودشان را ارائه می‌کنند.</p></div>
        <div className="sellerList">
          <div><b>فروشگاه حرفه‌ای تهران</b><span>۴,۸۵۰,۰۰۰ تومان</span></div>
          <div><b>ابزار سالن</b><span>۴,۹۲۰,۰۰۰ تومان</span></div>
          <div><b>باربر پرو</b><span>۵,۰۵۰,۰۰۰ تومان</span></div>
        </div>
      </section>

      <section className="cameraFeature">
        <Camera size={44}/><div><small>جستجوی تصویری SalonMall</small><h2>عکس بگیر، محصول را پیدا کن</h2>
        <p>از محصول عکس بگیر یا تصویرش را آپلود کن؛ سیستم محصول و نزدیک‌ترین نتایج را پیدا می‌کند و قیمت فروشنده‌ها را نشان می‌دهد.</p></div>
        <button className="primary">جستجو با عکس</button>
      </section>

      <footer><div className="brand"><span className="mark">S</span><b>Salon<span>Mall</span></b></div>
      <p>بازار تخصصی محصولات و تجهیزات آرایشگاهی</p></footer>
    </main>
  );
}
