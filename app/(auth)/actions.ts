"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}
