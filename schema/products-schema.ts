import z from "zod";

export const categoryProducts = ["food", "clothes", "electronic", "jewelry"];

export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 huruf"),
  price: z.number().min(0.01, "Minimal tidak 0 harganya"),
  category: z.enum(categoryProducts),
  description: z.string().min(5, "Deskripsi minamal 5 huruf"),
  slug_product: z.string(),
});

export type productInterface = {
  errors?: {
    name?: string[];
    price?: string[];
    category?: string[];
    description?: string[];
    slug_product?: string[];
    _form?: string[];
  };
  message?: string;
  success?: boolean;
};
