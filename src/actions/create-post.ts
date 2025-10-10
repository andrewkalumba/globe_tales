"use server"

import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/slugifys"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { PostInput } from "./schemas"
import { uploadImage } from "@/utils/supabase/upload-images"

export const CreatePost = async (userdata: PostInput) => {
    console.log("image parameter:", typeof userdata.images)

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Not authorized")

    const slug = slugify(userdata.title)

    const imageFile = userdata.images?.get("image")
    console.log("Image form: ",typeof imageFile)

    if (!(imageFile instanceof File) && imageFile !== null) {
        throw new Error("Malformed image file")
    }

    const imageUrl = imageFile ? await uploadImage(imageFile) : null

    const { error } = await supabase
        .from("posts")
        .insert([{
            user_id: user.id,
            slug,
            title: userdata.title,
            content: userdata.content,
            images: imageUrl
        }])
        .throwOnError()

    if (error) throw error

    revalidatePath("/")
    redirect(`/${slug}`)
}
