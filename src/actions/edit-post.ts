"use server"

import { createClient } from "@/utils/supabase/server-client"
import { uploadImages } from "@/utils/supabase/upload-images"
import { PostWithImages } from "./schemas"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { success } from "zod"

interface EditPosts {
    postId: string
    userdata: PostWithImages
}

export const EditPost = async ({ postId, userdata }: EditPosts) => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Not authorized")

    let imageUrls: string[] = []

    if (userdata.images && userdata.images.length > 0) {
        imageUrls = await uploadImages(userdata.images)
    }

    const updateData: Record<string, unknown> = {
        title: userdata.title,
        content: userdata.content,
    }

    if (imageUrls.length > 0) {
        updateData.images = imageUrls
    }

    const { error } = await supabase
        .from("posts")
        .update(updateData)
        .eq("id", postId)
        .throwOnError()

    if (error) throw new Error(error)

    revalidatePath("/")
    return { success: true }

}
