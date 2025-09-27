import { createClient } from "./browser-client"
import { type QueryData } from "@supabase/supabase-js"

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase.from('posts')
        .select('id, title, slug, users("username")')
        .order('created_at', { ascending: false })
}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient()
    return await supabase.from('posts')
        .select('title, content, images, created_at, users("username")')
        .eq('slug', slug)
        .single()
}

export const getSearchedPosts = async (searchTerm: string) => {
    const supabase = createClient()

    return (
        await supabase.from('posts')
            .select('title, slug, id')
            //.textSearch('title', searchTerm) //works same like the second
        .ilike('title', `%${searchTerm}%`)
    )

}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>

//QueryData unwraps Supabase’s query return type to give you the actual shape of the rows.