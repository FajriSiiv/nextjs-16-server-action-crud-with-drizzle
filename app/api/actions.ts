"use server";
import {
  registerSchema,
  registerUserInterface,
} from "@/schema/register-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUserForm(
  prevState: registerUserInterface,
  formData: FormData
) {
  const rawData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Gagal validasi input",
    };
  }

  const { username, password } = validated.data;

  try {
    console.log(`Updating User ${username} to new name: ${username}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    revalidatePath(`/users`);

    return {
      success: true,
      message: "Berhasil update nama!",
    };
  } catch (error) {
    return {
      message: "Terjadi kesalahan server",
    };
  } finally {
    const newName = encodeURIComponent(validated.data.username);
    redirect(`/?updated_name=${newName}&success=true`);
  }
}
