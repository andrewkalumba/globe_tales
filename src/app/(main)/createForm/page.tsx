"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "@/actions/create-post"
import { useState } from "react"
import { motion } from "framer-motion"
import z from "zod"
import { postWithImageSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"

type FormValues = z.infer<typeof postWithImageSchema>

const Create = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(postWithImageSchema), //zod for validation
    })

    // const [preview, setPreview] = useState<string | null>(null)

    const { mutate, error, isPending } = useMutation({
        mutationFn: CreatePost,
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto px-4 pt-[70px]" >
            <div className="rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Create New Post
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Share your thoughts, projects, or stories
                    </p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit(values => {
                    let imageForm = new FormData()

                    if (values.images?.length) imageForm.append('image', values.images[0])

                    console.log(imageForm)
                    mutate({
                        title: values.title,
                        content: values.content,
                        images: imageForm,
                    })
                })} >

                    <input
                        type="text"
                        placeholder="Post title"
                        {...register("title")}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    <textarea
                        placeholder="Post content"
                        rows={6}
                        {...register("content")}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    <input type="file" accept="image/*" id="image" {...register("images")} />

                    {errors.images && <ErrorMessage message={errors.images?.message!} />}

                    {/* {preview && (
                        <img src={preview} alt="Preview" className="rounded-lg mt-3" />
                    )} */}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                    >
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
