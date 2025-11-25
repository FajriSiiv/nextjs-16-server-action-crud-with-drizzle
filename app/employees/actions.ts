"use server";

import { db } from "@/db";
import { employees } from "@/db/schema";
import {
  createEmployeeSchema,
  employeeRegisterInterface,
} from "@/schema/employees-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createEmployee(
  prevState: employeeRegisterInterface,
  formData: FormData
) {
  try {
    const parsed = createEmployeeSchema.parse({
      name: formData.get("name") ?? "",
      position: formData.get("position") ?? "",
    });

    await db.insert(employees).values(parsed);

    return {
      success: true,
      message: "Success create data",
      errors: {},
    };
  } catch (err: any) {
    console.log("SERVER ACTION ERROR:", err);

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
    revalidatePath("/employees");
  }
}

export async function updateEmployee(
  prevState: employeeRegisterInterface,
  formData: FormData
) {
  try {
    const id = Number(formData.get("id"));
    const name = formData.get("name")?.toString();
    await db.update(employees).set({ name }).where(eq(employees.id, id));

    return {
      success: true,
      message: "Success updated data",
      errors: {},
    };
  } catch (err: any) {
    console.log("SERVER ACTION ERROR:", err);

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
    revalidatePath("/employees");
  }
}

export async function deleteEmployee(id: number) {
  await db.delete(employees).where(eq(employees.id, id));

  revalidatePath("/employees");

  return {
    success: true,
    message: "Success delete data",
    errors: {},
  };
}
