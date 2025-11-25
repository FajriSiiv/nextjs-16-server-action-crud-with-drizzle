"use client"
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";


type SubmitButtonType = {
  text: string;
  variants?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined
  loading?: boolean;
}

export function SubmitButtonLoading({ text, variants = 'default', className, type, loading }: SubmitButtonType) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={type}
      disabled={loading || pending}
      variant={variants}
      className={`px-4 py-2 rounded outline-none disabled:opacity-50 text-white ${className}`}
    >
      {loading || pending ? "Loading..." : text}
    </Button>
  );
}