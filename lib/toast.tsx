"use client";

import { toast } from "sonner";

export function showToast(
  message: string,
  type: "success" | "error" = "success"
) {
  toast(
    <span className={type === "success" ? "text-green-600" : "text-red-600"}>
      {message}
    </span>,
    {
      duration: 5000,
    }
  );
}
