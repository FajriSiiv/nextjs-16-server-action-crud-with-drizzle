import { db } from "@/db";
import { products } from "@/db/schema";

export async function GET() {
  const results = await db.select().from(products);

  return Response.json(results);
}

export async function POST(req: Request) {
  const { name, price, category, description, slug_product } = await req.json();

  const results = await db
    .insert(products)
    .values({ name, price, category, description, slug_product })
    .returning();

  return Response.json(results);
}
