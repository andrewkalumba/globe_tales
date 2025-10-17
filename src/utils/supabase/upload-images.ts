"use server"

import { v4 as uuid } from "uuid"
import { createClient } from "./server-client"

export const uploadImages = async (images: File[]): Promise<string[]> => {
  const supabase = await createClient()

  const uploadedUrls: string[] = []

  for (const image of images) {
    const imageName = image.name.split(".")
    const path = `posts/${imageName[0]}-${uuid()}-${imageName[1]}`

    const { error } = await supabase.storage
      .from("images")
      .upload(path, image, { upsert: true })

    if (error) {
      console.error("Supabase upload error:", error)
      continue
    }

    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(path)

    uploadedUrls.push(publicUrl)
  }

  return uploadedUrls
}
