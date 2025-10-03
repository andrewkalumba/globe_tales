import { v4 as uuid } from "uuid"
import { createClient } from "./server-client"

export const uploadImage = async (image: File) => {
  const supabase = await createClient()

//   const ext = image.name.split(".")
//   const path = `posts/${uuid()}.${ext}`

  const imageName = image.name.split(".")
  const path = `${imageName[0]}-${uuid()}.${imageName[1]}`

  const { error } = await supabase.storage
    .from("images")
    .upload(path, image, { upsert: true })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from("images")
    .getPublicUrl(path)

  return publicUrl
}
