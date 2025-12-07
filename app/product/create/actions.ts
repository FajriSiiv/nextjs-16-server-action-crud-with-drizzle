"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { generateSlug } from "@/lib/generateSlug";
import { createSupabaseServerClient } from "@/lib/supabase";
import { productInterface, productSchema } from "@/schema/products-schema";
import { count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const PRODUCT_IMAGE_BUCKET = "product_images";
const MAX_PRODUCTS_LIMIT = 10;

export async function createProduct(
  prevState: productInterface,
  formData: FormData
) {
  const fileToUpload = formData.get("image_file") as File | null;
  const productName = formData.get("name") ?? "";
  const slug = generateSlug(productName as string);

  const inputData = {
    name: productName,
    price: Number(formData.get("price")),
    category: formData.get("category"),
    description: formData.get("description"),
    slug_product: slug,
    image_file: fileToUpload,
  };

  try {
    const productCountResult = await db
      .select({
        count: count(),
      })
      .from(products);

    // Ambil nilai hitungan pertama
    const currentProductCount = productCountResult[0].count;

    if (currentProductCount >= MAX_PRODUCTS_LIMIT) {
      return {
        success: false,
        message: `Gagal membuat produk. Batas maksimum ${MAX_PRODUCTS_LIMIT} produk telah tercapai.`,
        errors: {},
      };
    }

    const parsed = productSchema.safeParse(inputData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Validasi gagal. Periksa kembali input Anda.",
        errors: parsed.error.flatten().fieldErrors ?? {},
      };
    }

    const { image_file, ...productData } = parsed.data;

    if (!image_file) {
      return {
        success: false,
        message: "File gambar tidak ditemukan.",
        errors: {},
      };
    }

    let publicImageUrl: string;
    const supabase = await createSupabaseServerClient();

    const fileName = `${slug}-${Date.now()}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(fileName, image_file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      return {
        success: false,
        message: `Gagal mengunggah gambar: ${uploadError.message}`,
        errors: {},
      };
    }

    const { data: urlData } = supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .getPublicUrl(fileName);

    publicImageUrl = urlData.publicUrl;

    await db.insert(products).values({
      ...productData,
      image_url: publicImageUrl,
    });

    return {
      success: true,
      message: "Produk berhasil dibuat!",
      errors: {},
    };
  } catch (err: any) {
    console.error("Server Error:", err);
    return {
      success: false,
      message: "Terjadi kesalahan server saat menyimpan produk.",
      errors: {},
    };
  } finally {
    revalidatePath("/product");
  }
}
