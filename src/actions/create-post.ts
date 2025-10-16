"use server"

import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/slugifys"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { PostWithImages } from "./schemas"
import { uploadImages } from "@/utils/supabase/upload-images"

/**
 * Creates a new post with multiple optional images.
 */
export const CreatePost = async (userdata: PostWithImages): Promise<void> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authorized")

  const slug = slugify(userdata.title)

  const files = userdata.images || []
  const imageUrls = files.length > 0 ? await uploadImages(files) : []

  const { error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: user.id,
        slug,
        title: userdata.title,
        content: userdata.content,
        images: imageUrls, // jsonb[] or text[]
      },
    ])

  if (error) throw new Error(error.message)

  revalidatePath("/")
  redirect(`/${slug}`)
}
