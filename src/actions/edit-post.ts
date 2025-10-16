"use server"

import { createClient } from "@/utils/supabase/server-client"
import { uploadImages } from "@/utils/supabase/upload-images"
import { PostWithImages } from "./schemas"

interface EditPostArgs {
  postId: string
  userdata: PostWithImages
}

/**
 * Updates an existing post. Optionally uploads and replaces images.
 */
export const EditPost = async ({
  postId,
  userdata,
}: EditPostArgs): Promise<void> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
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
}
