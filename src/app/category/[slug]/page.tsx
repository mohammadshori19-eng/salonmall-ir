import Link from "next/link";
import { ChevronRight, SlidersHorizontal, ShoppingCart, Heart } from "lucide-react";

const items=[
 ["https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606","اندیس","ماشین اصلاح حرفه‌ای","۴,۸۵۰,۰۰۰","professional-clipper"],
 ["https://images.prom.ua/5457361709_w1280_h640_5457361709.jpg","جی‌آرال","سشوار حرفه‌ای","۲,۹۸۰,۰۰۰","professional-dryer"],
 ["https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540","کی‌فایو","قیچی حرفه‌ای","۲,۸۵۰,۰۰۰","professional-scissors"],
 ["https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846","ساچاوان","واکس موی حرفه‌ای","۴۹۰,۰۰۰","hair-wax"]
];
const names:Record<string,string>={clippers:"ماشین اصلاح",tools:"قیچی و ابزار",hair:"محصولات مو",skin:"محصولات پوستی",color:"رنگ و دکلره",equipment:"تجهیزات سالن",disposable:"یکبار مصرف",furniture:"مبلمان و دکور",accessories:"تجهیزات جانبی",sale:"فروش ویژه"};

export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const title=names[slug]||"محصولات";
 return <main className="innerPage">
  <header className="innerHeader"><Link href="/" className="back"><ChevronRight/></Link><div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>مرکز خرید تخصصی لوازم آرایشگاهی</small></div></div><Link href="/cart"><ShoppingCart/></Link></header>
  <div className="crumb">خانه / دسته‌بندی / <b>{title}</b></div>
  <div className="listingHead"><div><h1>{title}</h1><small>محصولات حرفه‌ای از فروشندگان معتبر</small></div><button><SlidersHorizontal size={18}/> فیلتر</button></div>
  <div className="filterChips"><span>پرفروش‌ترین</span><span>جدیدترین</span><span>ارزان‌ترین</span><span>ارسال سریع</span></div>
  <section className="listingGrid">{items.map(([img,brand,name,price,id])=><article className="product" key={id}><Heart className="heart" size={18}/><Link href={"/product/"+id}><div className="productImg"><img src={img} alt={name}/></div><small>{brand}</small><h3>{name}</h3></Link><div className="stars">★★★★★ <span>۴.۸</span></div><b className="price">{price} تومان</b><Link className="cartBtn" href="/cart"><ShoppingCart size={17}/></Link></article>)}</section>
  <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>
 </main>
}