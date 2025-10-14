"use server"

import { postSchemas } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugifys";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { uploadImage } from "@/utils/supabase/upload-images";

export const EditPost = async ({ postId, userdata }: { postId: string, userdata: z.infer<typeof postSchemas> }) => {
    console.log("image param,", userdata.images, "type", typeof userdata.images)

    const parsedData = postSchemas.parse(userdata)

    const imageFile = userdata.images?.get("image")

    let imageUrl;
    if ((typeof imageFile !== "string") && imageFile !== undefined) {
        if (!(imageFile instanceof File) && imageFile !== null) {
            throw new Error("Malformed image file")
        }
        imageUrl = await uploadImage(imageFile!)
    } else {
        imageUrl = imageFile
    }

    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    const { data: post, error: postError } = await supabase.from('posts').select('*').eq('id', postId).single()

    if (!user || user.id !== post?.user_id) throw new Error("Not Authorized")

    const { data: updatedPost } = await supabase
        .from('posts')
        .update({ ...parsedData, images: imageUrl, slug: slugify(parsedData.title) })
        .eq('id', postId)
        .select('slug')
        .single()
        .throwOnError()

    if (error) throw error

    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)
}

