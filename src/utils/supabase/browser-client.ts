import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database-types";

export const createClient = () => {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPEBASE_URL!,
        process.env.NEXT_PUBLIC_SUPEBASE_PUBLISHABLE_KEY!
    )
}