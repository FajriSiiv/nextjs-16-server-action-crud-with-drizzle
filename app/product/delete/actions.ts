"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/product");

  return {
    success: true,
    message: "Success delete data",
    errors: {},
  };
}
