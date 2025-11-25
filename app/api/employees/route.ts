import { db } from "@/db";
import { employees } from "@/db/schema";
import { asc, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(new URL(req.url).searchParams);
  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 5);
  const offset = (page - 1) * limit;

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(employees);
  const total = totalResult[0].count;

  // Ambil data paginated
  const data = await db
    .select()
    .from(employees)
    .orderBy(asc(employees.name))
    .limit(limit)
    .offset(offset);

  return Response.json({ data, total, page, limit });
}

// export async function POST(req: Request) {
//   const { name, position } = await req.json();
//   console.log(name, position);
//   try {
//     const results = await db.insert(employees).values({ name, position });
//     console.log(results);

//     return Response.json({
//       success: true,
//       message: "Created successfully",
//     });
//   } catch (err) {
//     console.error("API ERROR:", err);
//     return Response.json(
//       { success: false, message: err.message },
//       { status: 400 }
//     );
//   }
// }
