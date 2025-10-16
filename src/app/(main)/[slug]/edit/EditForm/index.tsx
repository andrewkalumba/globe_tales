"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { postWithImageSchema, PostWithImages } from "@/actions/schemas"
import { EditPost } from "@/actions/edit-post"
import ErrorMessage from "@/components/ErrorMessage"

interface EditFormProps {
  postId: string
  initialValues: {
    title: string
    content?: string
    images?: string[] // URLs of existing images
  }
}

const EditForm: React.FC<EditFormProps> = ({ postId, initialValues }) => {
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const { register, handleSubmit } = useForm<PostWithImages>({
    resolver: zodResolver(postWithImageSchema),
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || "",
    },
  })

  const { mutate, error, isPending } = useMutation({
    mutationFn: EditPost,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setNewFiles((prev) => [...prev, ...files])
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))])
  }

  const removeFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutate({
          postId,
          userdata: {
            title: values.title,
            content: values.content!,
            images: newFiles.length > 0 ? newFiles : undefined, // only send new images
          },
        })
      })}
      className="flex flex-col gap-6 max-w-2xl mx-auto bg-white/80 border border-gray-200 p-8 rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-semibold">Edit Post ✏️</h2>

      <label className="text-sm font-medium">Title</label>
      <input
        type="text"
        placeholder="Post title"
        {...register("title")}
        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <label className="text-sm font-medium">Content</label>
      <textarea
        placeholder="Post content..."
        rows={6}
        {...register("content")}
        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Existing images */}
      {initialValues.images?.length! > 0 && (
        <div className="mt-2">
          <span className="text-sm font-medium">Current Images</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
            {initialValues.images!.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Existing image ${i}`}
                className="rounded-lg w-full h-32 object-cover border"
              />
            ))}
          </div>
        </div>
      )}

      {/* New image uploads */}
      <label className="text-sm font-medium mt-3">Upload New Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {previews.map((src, i) => (
            <div key={i} className="relative group">
              <img
                src={src}
                alt={`Preview ${i}`}
                className="rounded-lg w-full h-32 object-cover border"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition"
      >
        {isPending ? "Updating..." : "Update Post ✨"}
      </button>

      {error && <ErrorMessage message={(error as Error).message} />}
    </form>
  )
}

export default EditForm
