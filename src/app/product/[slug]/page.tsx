import Link from "next/link";
import { ChevronRight, Heart, ShoppingCart, ShieldCheck, Truck, Store, Star } from "lucide-react";

const data:Record<string,{name:string,brand:string,price:string,img:string}> = {
 "professional-clipper":{name:"ماشین اصلاح حرفه‌ای",brand:"اندیس",price:"۴,۸۵۰,۰۰۰",img:"https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606"},
 "professional-dryer":{name:"سشوار حرفه‌ای",brand:"جی‌آرال",price:"۲,۹۸۰,۰۰۰",img:"https://images.prom.ua/5457361709_w1280_h640_5457361709.jpg"},
 "hair-wax":{name:"واکس موی حرفه‌ای",brand:"ساچاوان",price:"۴۹۰,۰۰۰",img:"https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846"},
 "professional-scissors":{name:"قیچی حرفه‌ای",brand:"کی‌فایو",price:"۲,۸۵۰,۰۰۰",img:"https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540"}
};
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const p=data[slug]||data["professional-clipper"];
 return <main className="innerPage">
  <header className="innerHeader"><Link href="/" className="back"><ChevronRight/></Link><div className="brand"><span className="logoS">S</span><div><b>Salon<span>Mall</span></b><small>مرکز خرید تخصصی لوازم آرایشگاهی</small></div></div><Link href="/cart"><ShoppingCart/></Link></header>
  <div className="crumb">خانه / محصولات / <b>{p.name}</b></div>
  <section className="productDetail"><div className="detailImage"><Heart/><img src={p.img} alt={p.name}/></div><div className="detailInfo"><small>{p.brand}</small><h1>{p.name}</h1><div className="rating"><Star size={17}/> ۴.۸ <span>(۱۳۲ نظر)</span></div><p>کالای تخصصی مناسب استفاده حرفه‌ای در سالن و آرایشگاه.</p><div className="detailPrice">{p.price} تومان</div><div className="assurances"><span><ShieldCheck/> ضمانت اصالت</span><span><Truck/> ارسال سریع</span></div></div></section>
  <section className="offers"><h2>فروشندگان این محصول</h2><div className="offer"><Store/><div><b>فروشگاه حرفه‌ای تهران</b><small>ارسال امروز • امتیاز ۴.۹</small></div><strong>{p.price} تومان</strong><Link href="/cart">افزودن به سبد</Link></div><div className="offer"><Store/><div><b>ابزار سالن</b><small>ارسال فردا • امتیاز ۴.۸</small></div><strong>۴,۹۲۰,۰۰۰ تومان</strong><Link href="/cart">افزودن به سبد</Link></div></section>
  <div className="developerCredit light">طراحی و توسعه: محمد شوری <a href="https://mohamadshori.ir">Mohamadshori.ir</a></div>
 </main>
}