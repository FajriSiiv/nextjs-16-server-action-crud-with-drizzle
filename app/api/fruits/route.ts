import { db } from "@/db";
import { fruits } from "@/db/schema";
import { NextRequest } from "next/server";

export async function GET() {
  const result = await db.select().from(fruits);
  return Response.json(result);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const result = await db.insert(fruits).values({ name }).returning();

  return Response.json(result);
}
