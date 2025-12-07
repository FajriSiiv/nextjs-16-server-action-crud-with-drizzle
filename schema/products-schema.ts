import z from "zod";

export const categoryProducts = ["food", "clothes", "electronic", "jewelry"];
const MAX_FILE_SIZE = 500000; //0.5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 huruf"),
  price: z.number().min(0.01, "Minimal tidak 0 harganya"),
  category: z.enum(categoryProducts),
  description: z.string().min(5, "Deskripsi minamal 5 huruf"),
  slug_product: z.string(),
  image_file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Minimal harus ada satu gambar.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Hanya format JPG, JPEG, PNG, dan WEBP yang diizinkan."
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Semua gambar harus berukuran maksimal 0.5MB."
    )
    .optional(),
  image_url: z.string().optional(),
});

export type productInterface = {
  errors?: {
    name?: string[];
    price?: string[];
    category?: string[];
    description?: string[];
    slug_product?: string[];
    image_url?: string[];
    _form?: string[];
  };
  message?: string;
  success?: boolean;
};
