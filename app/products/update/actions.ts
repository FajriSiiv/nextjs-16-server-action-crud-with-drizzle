"use server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { generateSlug } from "@/lib/generateSlug";
import { productSchema } from "@/schema/products-schema";
import { eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(
  prevState:
    | {
        success: boolean;
        message: string;
        errors: string[];
      }
    | undefined,
  formData: FormData
) {
  try {
    const name: FormDataEntryValue | null = formData.get("name");

    const data = {
      name: name,
      price: Number(formData.get("price")),
      description: formData.get("description"),
      category: formData.get("category"),
      id: Number(formData.get("id")),
      slug_product: generateSlug(name) ?? "",
    };

    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    await db.update(products).set(parsed.data).where(eq(products.id, data.id));

    return {
      success: true,
      message: "Successfully update product",
      errors: [],
    };
  } catch (err: any) {
    if (err.errors || err.issues || err.flatten) {
      return {
        success: false,
        message: "Validation failed",
        errors: err.flatten().fieldErrors ?? [],
      };
    }

    return {
      success: false,
      message: "Unknown error",
      errors: [],
    };
  } finally {
    revalidatePath("/products");
  }
}

export async function searchProduct(formData: FormData) {
  const q = (formData.get("query") as string) ?? "";

  if (!q) {
    redirect("/products");
  }

  redirect(`/products?q=${q}`);
}
