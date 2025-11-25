import { db } from "@/db";
import { products } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId: slug_product } = await context.params;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const result = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.id, Number(id)),
          eq(products.slug_product, slug_product)
        )
      );

    if (result.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
          error: {},
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
