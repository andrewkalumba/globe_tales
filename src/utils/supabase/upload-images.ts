"use server"

import { v4 as uuid } from "uuid"
import { createClient } from "./server-client"

/**
 * Uploads multiple images to Supabase Storage and returns their public URLs.
 * @param images - Array of image files to upload
 * @returns Array of public URLs
 */
export const uploadImages = async (images: File[]): Promise<string[]> => {
  const supabase = await createClient()

  const uploadedUrls: string[] = []

  for (const image of images) {
    const ext = image.name.split(".").pop()
    const path = `posts/${uuid()}.${ext}`

    const { error } = await supabase.storage
      .from("images")
      .upload(path, image, { upsert: true })

    if (error) {
      console.error("Supabase upload error:", error)
      continue
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(path)

    uploadedUrls.push(publicUrl)
  }

  return uploadedUrls
}
