export type CartLine = { id: string; qty: number };

const CART_KEY = "salonmall.cart.v1";
const FAVORITES_KEY = "salonmall.favorites.v1";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  return safeParse<CartLine[]>(window.localStorage.getItem(CART_KEY), []);
}

export function writeCart(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("salonmall:cart"));
}

export function addToCart(id: string, qty = 1) {
  const lines = readCart();
  const existing = lines.find((line) => line.id === id);
  if (existing) existing.qty += qty;
  else lines.push({ id, qty });
  writeCart(lines);
}

export function cartCount() {
  return readCart().reduce((sum, line) => sum + line.qty, 0);
}

export function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  return safeParse<string[]>(window.localStorage.getItem(FAVORITES_KEY), []);
}

export function writeFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("salonmall:favorites"));
}

export function toggleFavorite(id: string) {
  const ids = readFavorites();
  const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
  writeFavorites(next);
  return next;
}
