import CategoryClient from "./CategoryClient";
import { categoryNames } from "../../../lib/catalog";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryClient slug={slug} title={categoryNames[slug] || "محصولات"} />;
}
