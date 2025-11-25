"use client"
import { Button } from "@/components/ui/button";


type SubmitButtonType = {
  text: string;
  variants?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined
  loading?: boolean;
  onclick: () => void
}

export function SubmitButtonDelete({ text, variants = 'default', className, type, loading, onclick }: SubmitButtonType) {

  return (
    <Button
      type={type}
      disabled={loading}
      variant={variants}
      className={`px-4 py-2 rounded outline-none disabled:opacity-50 text-white ${className}`}
      onClick={onclick}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
}