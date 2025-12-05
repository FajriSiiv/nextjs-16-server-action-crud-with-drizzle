import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// TANDAI FUNGSI INI SEBAGAI ASYNC
export async function createSupabaseServerClient() {
  // TUNGGU (AWAIT) HASIL DARI COOKIES()
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },

        // setAll(cookiesToSet) {
        //   cookiesToSet.forEach(({ name, value, options }) => {
        //     cookieStore.set({ name, value, ...options });
        //   });
        // },
      },
    }
  );
}

export function createSupabaseActionClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 🎯 Solusi: Panggil cookies() HANYA di dalam fungsi get/set/remove
        get(name: string) {
          // cookies() dipanggil saat get() dieksekusi (di dalam Server Action/Route Handler)
          return cookies().get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // cookies() dipanggil saat set() dieksekusi
          cookies().set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // cookies() dipanggil saat remove() dieksekusi
          cookies().set({ name, value: "", ...options });
        },
      },
    }
  );
}
