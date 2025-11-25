import z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter" }),
  password: z.string().min(3, { message: "Password minimal 3 karakter" }),
});

export type registerUserInterface = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    _form?: string[]; // Error global (misal: DB down)

  };
  message?: string;
  success?: boolean;
};

