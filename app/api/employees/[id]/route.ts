import { db } from "@/db";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const employeeId = Number(id);

  const result = await db
    .select()
    .from(employees)
    .where(eq(employees.id, employeeId));

  if (result.length === 0) {
    return Response.json({ error: "Employee not found" }, { status: 404 });
  }

  return Response.json(result);
}
