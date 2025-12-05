"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { generateSlug } from "@/lib/generateSlug";
// import { createSupabaseServerClient } from "@/lib/supabase";
import { productInterface, productSchema } from "@/schema/products-schema";
import { revalidatePath } from "next/cache";

export async function createProduct(
  prevState: productInterface,
  formData: FormData
) {
  try {
    const image_url = formData.get("image_url") as string | null;

    const parsed: any = productSchema.safeParse({
      name: formData.get("name") ?? "",
      price: Number(formData.get("price")) ?? "",
      category: formData.get("category") ?? "",
      description: formData.get("description") ?? "",
      slug_product: generateSlug(formData.get("name") ?? ""),
      image_url: image_url || undefined,
    });

    // let imageUrl: string | null = null;
    // const PRODUCT_IMAGE_BUCKET = "product_images";
    // const supabase = await createSupabaseServerClient();

    // if (image_url instanceof File && image_url.size > 0) {
    //   // Buat nama file unik (misalnya, timestamp + nama asli)
    //   const filename = `${Date.now()}-${slug_product}-${image_url.name.replace(
    //     /\s/g,
    //     "_"
    //   )}`;

    //   // Unggah File Object langsung ke Supabase Storage
    //   const { data: uploadData, error: uploadError } = await supabase.storage
    //     .from(PRODUCT_IMAGE_BUCKET)
    //     .upload(filename, image_url, {
    //       cacheControl: "3600",
    //       upsert: false,
    //       contentType: image_url.type,
    //     });

    //   if (uploadError) {
    //     console.error("Kesalahan Upload Supabase:", uploadError);
    //     // Penting: Jika upload gagal, hentikan operasi DB
    //     return Response.json(
    //       { message: "Gagal mengunggah gambar." },
    //       { status: 500 }
    //     );
    //   }

    //   // 3. Dapatkan URL Publik
    //   // Konstruksi URL harus disesuaikan dengan template Supabase Anda
    //   imageUrl = `${process.env
    //     .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${
    //     uploadData.path
    //   }`;
    // }

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors ?? {},
      };
    }

    await db.insert(products).values(parsed);

    return {
      success: true,
      message: "Success create product",
      errors: {},
    };
  } catch (err: any) {
    if (err.errors || err.issues || err.flatten) {
      return {
        success: false,
        message: "Validation failed",
        errors: err.flatten().fieldErrors ?? {},
      };
    }

    return {
      success: false,
      message: "Unknown error",
      errors: {},
    };
  } finally {
    revalidatePath("/product");
  }
}
