import { db } from "@/db";
import { products } from "@/db/schema";
import { like } from "drizzle-orm";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q");

  try {
    const results = search
      ? await db
          .select()
          .from(products)
          .where(like(products.name, `%${search}%`))
      : await db.select().from(products);

    return Response.json(results);
  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, price, category, description, slug_product } = await req.json();

  const results = await db
    .insert(products)
    .values({ name, price, category, description, slug_product })
    .returning();

  return Response.json(results);
}
