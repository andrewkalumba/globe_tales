"use server"
import { v4 as uuid } from "uuid"
import { createClient } from "./server-client"

export const uploadImage = async (image: File) => { //file is inbuilt and has many properties like name
  const supabase = await createClient()

  const imageName = image.name.split(".")
  const path = `posts/${imageName[0]}-${uuid()}.${imageName[1]}`

  const { data, error } = await supabase.storage
    .from("images")
    .upload(path, image, { upsert: true })

  if (error) console.log(error)

  const { data: { publicUrl } } = supabase.storage
    .from("images")
    .getPublicUrl(path)

  console.log("Public url: ", publicUrl)

  return publicUrl
}
