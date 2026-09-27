import ProductClient from "./ProductClient";
import { getProduct, products } from "../../../lib/catalog";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug) || products[0];
  return <ProductClient product={product} />;
}
