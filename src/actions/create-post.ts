"use server"

import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/slugifys"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { PostWithImages } from "./schemas"
import { uploadImages } from "@/utils/supabase/upload-images"


export const CreatePost = async (userdata: PostWithImages) => {
  const supabase = await createClient()
  const { data: { user }, error: userError} = await supabase.auth.getUser()

  if (!user) throw new Error("Not authorized")
    if (userError) return {userError: userError.message}

  const slug = slugify(userdata.title)

  const files = userdata.images || []
  const imageUrls = files.length > 0 ? await uploadImages(files) : []

  const { error: insertError} = await supabase
    .from("posts")
    .insert([
      {
        user_id: user.id,
        slug,
        title: userdata.title,
        content: userdata.content,
        images: imageUrls
      },
    ])

  // if (error) throw new Error(error.message)
    if (insertError) return { insertError: insertError.message }  

  revalidatePath("/")
  redirect(`/${slug}`)
}
