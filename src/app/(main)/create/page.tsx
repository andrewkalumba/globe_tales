"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import z from "zod"
import { postWithImageSchema } from "@/actions/schemas"
import { CreatePost } from "@/actions/create-post"
import ErrorMessage from "@/components/ErrorMessage"
import Button from "@/components/Button"

type FormValues = z.infer<typeof postWithImageSchema>

const Create = () => {
    const [previews, setPreviews] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(postWithImageSchema),
    })

    const { mutate, error, isPending } = useMutation({
        mutationFn: CreatePost,
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || [])
        setFiles(prev => [...prev, ...newFiles])

        const newPreviews = newFiles.map(file => URL.createObjectURL(file))
        setPreviews(prev => [...prev, ...newPreviews])
    }

    const removeImage = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto px-4 m-10"
        >
            <div className="rounded-2xl shadow-xl dark:bg-gray-900/90 backdrop-blur-md border dark:border-gray-700 p-6 sm:p-8">
            <Button />
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Create New Post
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Share your thoughts, projects, or stories
                    </p>
                </div>

                <form
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit(values => {
                        const formData = new FormData()
                        files.forEach(file => formData.append("images", file))

                        mutate({
                            title: values.title,
                            content: values.content,
                            images: files, //change 4
                        })
                    })}
                >
                    <input type="text" placeholder="Post title" {...register("title")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                    <textarea placeholder="Post content" rows={6} {...register("content")} className="w-full rounded-lg border border-gray-300 px-3 py-2" />

                    <input type="file" accept="image/*" multiple id="images" onChange={handleImageChange} className="w-full" />

                    {errors.images && (
                        <ErrorMessage message={errors.images.message!} />
                    )}

                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                            {previews.map((src, i) => (
                                <div key={i} className="relative group">
                                    <img src={src} alt={`Preview ${i}`} className="rounded-lg object-cover w-full h-40" />
                                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition" >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold" >
                        {isPending ? "Creating..." : "Create Post"}
                    </button>

                    {error && (
                        <p className="text-red-500 mt-2">{(error as Error).message}</p>
                    )}
                </form>
            </div>
        </motion.div>
    )
}

export default Create
