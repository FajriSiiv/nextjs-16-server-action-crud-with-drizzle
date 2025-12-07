export type ProductsType = {
  name: string;
  price: number;
  category: "cloth" | "food" | "jewelry" | "electronic";
  description: string;
  id: number;
  slug_product: string;
  createdAt: Date;
  image_url: string;
};
