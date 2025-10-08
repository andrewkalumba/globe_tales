"use server"
import z from "zod";
import { postSchemas } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugifys";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const EditPost = async ({ postId, userdata }: { postId: number, userdata: z.infer<typeof postSchemas> }) => {
    const parsedData = postSchemas.parse(userdata)

    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    const { data: post, error: postError } = await supabase.from('posts').select('*').eq('id', postId).single()

    if (!user || user.id !== post?.user_id) throw new Error("Not Authorized")

    const { data: updatedPost } = await supabase
        .from('posts')
        .update({ ...parsedData, slug: slugify(parsedData.title) })
        .eq('id', postId)
        .select('slug')
        .single()
        .throwOnError()

    if (error) throw error

    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)
}

