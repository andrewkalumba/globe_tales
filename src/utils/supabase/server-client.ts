import { createServerClient } from "@supabase/ssr";
import { Database } from "./database-types";
import { cookies } from "next/headers";

export const createClient = async () => {
    const cookiesStores = await cookies();
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookiesStores.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookiesStores.set(name, value, options);
                        })
                    } catch { }
                }
            }
        }
    )
}