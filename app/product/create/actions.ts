"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { generateSlug } from "@/lib/generateSlug";
import { productInterface, productSchema } from "@/schema/products-schema";
import { revalidatePath } from "next/cache";

export async function createProduct(
  prevState: productInterface,
  formData: FormData
) {
  try {
    const parsed: any = productSchema.parse({
      name: formData.get("name") ?? "",
      price: Number(formData.get("price")) ?? "",
      category: formData.get("category") ?? "",
      description: formData.get("description") ?? "",
      slug_product: generateSlug(formData.get("name") ?? ""),
    });

    await db.insert(products).values(parsed);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors ?? {},
      };
    }

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
