import { db } from "@/db";
import { products } from "@/db/schema";
import { ilike } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q");
  try {
    const results = search
      ? await db
          .select()
          .from(products)
          .where(ilike(products.name, `%${search}%`))
      : await db.select().from(products);

    return Response.json(results);
  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
