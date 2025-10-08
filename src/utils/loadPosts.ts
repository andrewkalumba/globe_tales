import { createClient } from "@/utils/supabase/browser-client"
import { getHomePosts } from "@/utils/supabase/queries"

export const fetchPosts = async () => {
    const supabase = createClient()
    const { data, error } = await getHomePosts(supabase)
    if (error) console.error("Error fetching posts:", error.message)
    return data || []
}
