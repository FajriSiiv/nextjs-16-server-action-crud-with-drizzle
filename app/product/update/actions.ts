"use server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { generateSlug } from "@/lib/generateSlug";
import { createSupabaseServerClient } from "@/lib/supabase";
import { productSchema } from "@/schema/products-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PRODUCT_IMAGE_BUCKET = "product_images";

type UpdateProductState =
  | {
      success: boolean;
      message: string;
      errors: Record<string, string[]>;
    }
  | undefined;

export async function updateProduct(
  prevState: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {
  const productId = Number(formData.get("id"));
  const name: FormDataEntryValue | null = formData.get("name");
  const fileToUpload = formData.get("image_file") as File | null;

  const data = {
    name: name,
    price: Number(formData.get("price")),
    description: formData.get("description"),
    category: formData.get("category"),
    id: productId,
    slug_product: generateSlug(name as string) ?? "",
  };

  const parsed = productSchema.omit({ image_file: true }).safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const productData = parsed.data;
  const supabase = await createSupabaseServerClient();
  let finalImageUrl: string | null | undefined = undefined;

  const oldProductsArray = await db
    .select({
      imageUrl: products.image_url,
    })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  const oldProduct = oldProductsArray[0];

  if (!oldProduct) {
    return;
  }
  const oldImageUrl = oldProduct.imageUrl;

  if (fileToUpload && fileToUpload.size > 0) {
    const fileName = `${productData.slug_product}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(fileName, fileToUpload, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      return {
        success: false,
        message: `Gagal mengunggah gambar baru: ${uploadError.message}`,
        errors: {},
      };
    }

    const { data: urlData } = supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .getPublicUrl(fileName);

    finalImageUrl = urlData.publicUrl;

    if (oldImageUrl) {
      const oldFileName = oldImageUrl.split("/").pop()!;

      const { error: deleteError } = await supabase.storage
        .from(PRODUCT_IMAGE_BUCKET)
        .remove([oldFileName]);

      if (deleteError) {
        console.warn("Gagal menghapus gambar lama di Supabase:", deleteError);
      }
    }
  } else {
    finalImageUrl = oldImageUrl;
  }

  const updatePayload = {
    ...productData,
    ...(finalImageUrl && { image_url: finalImageUrl }),
  };

  try {
    await db
      .update(products)
      .set(updatePayload)
      .where(eq(products.id, productId));

    return {
      success: true,
      message: "Successfully update product",
      errors: {},
    };
  } catch (dbError: any) {
    return {
      success: false,
      message: "Gagal memperbarui data produk di database.",
      errors: {},
    };
  } finally {
    revalidatePath("/product");
  }
}

export async function searchProduct(formData: FormData) {
  const q = (formData.get("query") as string) ?? "";

  if (!q) {
    redirect("/product");
  }
  redirect(`/product?q=${q}`);
}
