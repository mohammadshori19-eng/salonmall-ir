export type CatalogProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  sold: number;
  newness: number;
  fast: boolean;
  categories: string[];
};

export const products: CatalogProduct[] = [
  {
    id: "professional-clipper",
    name: "ماشین اصلاح حرفه‌ای",
    brand: "اندیس",
    price: 4850000,
    image: "https://hairwaysdirect.com/cdn/shop/files/Master.png?v=1719314606",
    rating: 4.9,
    sold: 328,
    newness: 4,
    fast: true,
    categories: ["clippers", "sale"],
  },
  {
    id: "professional-dryer",
    name: "سشوار حرفه‌ای سالن",
    brand: "جی‌آرال",
    price: 2980000,
    image: "https://images.prom.ua/5457361709_w1280_h640_5457361709.jpg",
    rating: 4.8,
    sold: 241,
    newness: 3,
    fast: true,
    categories: ["hair-products", "salon-equipment", "sale"],
  },
  {
    id: "professional-scissors",
    name: "قیچی حرفه‌ای",
    brand: "کی‌فایو",
    price: 2850000,
    image: "https://k5-international.eu/cdn/shop/products/TijerasSuperCutSarrated_2.jpg?v=1600243540",
    rating: 4.8,
    sold: 189,
    newness: 2,
    fast: false,
    categories: ["scissors-tools", "sale"],
  },
  {
    id: "hair-wax",
    name: "واکس موی حرفه‌ای",
    brand: "ساچاوان",
    price: 490000,
    image: "https://wedoskin.ca/cdn/shop/files/SACHAJUANHairWax75ml.png?v=1740083846",
    rating: 4.7,
    sold: 414,
    newness: 5,
    fast: true,
    categories: ["hair-products", "sale"],
  },
];

export const categoryNames: Record<string, string> = {
  clippers: "ماشین اصلاح",
  "scissors-tools": "قیچی و ابزار",
  "hair-products": "محصولات مو",
  "skin-care": "محصولات پوستی",
  "salon-equipment": "تجهیزات سالن",
  "furniture-decor": "مبلمان و دکور",
  "hair-color-bleach": "رنگ و دکلره",
  fragrance: "عطر و ادکلن",
  sale: "فروش ویژه",
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}
