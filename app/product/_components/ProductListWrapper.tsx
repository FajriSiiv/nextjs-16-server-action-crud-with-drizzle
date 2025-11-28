import ProductList from "./ProductList";

async function getProducts(query: string | undefined) {
  const urlHttp = process.env.NEXT_PUBLIC_SITE_URL;
  const url = query
    ? `${urlHttp}/api/product?q=${query}`
    : `${urlHttp}/api/product`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // console.log("FETCH ERROR:", await res.text());
    return [];
  }

  return res.json();
}

export default async function ProductListWrapper({ query }: { query: string | undefined }) {
  const products = await getProducts(query);

  return <ProductList products={products} />;
}
