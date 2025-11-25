import z from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(3, { message: "name minimal 3 karakter" }),
  position: z.string().min(3, { message: "position minimal 3 karakter" }),
});

export type employeeRegisterInterface = {
  errors?: {
    name?: string[];
    position?: string[];
    _form?: string[];
  };
  message?: string;
  success?: boolean;
};
