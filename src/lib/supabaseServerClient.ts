import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';


export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              options.secure = true;
              console.log(`[COOKIE SET] ${name} = ${value}`, options);
              cookieStore.set(name, value, options);
            });
          } catch (err) {
            console.warn('[COOKIE ERROR] Could not set cookies in Server Component context.', err);
          }
        },
      },
    }
  );
}