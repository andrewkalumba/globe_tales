"use client"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { postSchemas } from "@/actions/schemas"
import { CreatePost } from "@/actions/create-post"
import { createClient } from "@/utils/supabase/browser-client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type FormValues = z.infer<typeof postSchemas>

const Create = () => {
    const { register, handleSubmit, watch } = useForm<FormValues>({
        resolver: zodResolver(postSchemas),
    })

    const [preview, setPreview] = useState<string | null>(null)

    const { mutate, error, isPending } = useMutation({
        mutationFn: CreatePost,
    })

    const onSubmit = handleSubmit(async (values) => {
        let imageUrl: string | null = null

        if (values.image) {
            const supabase = createClient()
            const file = values.image
            const ext = file.name.split(".").pop()
            const path = `posts/${crypto.randomUUID()}.${ext}`

            const { error: uploadError } = await supabase.storage
                .from("images")
                .upload(path, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage.from("images").getPublicUrl(path)
            imageUrl = data.publicUrl
        }

        mutate({
            title: values.title,
            content: values.content,
            images: imageUrl,
            slug: "",
            user_id: "",
        })
    })

    useEffect(() => {
        const fileList = watch("image")
        if (fileList instanceof FileList && fileList.length > 0 && !preview) {
            const file = fileList[0]
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        } [watch("image")]
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

                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <motion.fieldset
                        className="flex flex-col gap-2 w-full"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }} >
                        <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register("title")}
                            placeholder="My awesome post"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100" />
                    </motion.fieldset>

                    <motion.fieldset
                        className="flex flex-col gap-2 w-full"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }} >
                        <label htmlFor="content" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Post Content
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            placeholder="Write your story..."
                            rows={6}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 resize-none dark:bg-gray-800 dark:text-gray-100" />
                    </motion.fieldset>

                    <motion.fieldset
                        className="flex flex-col gap-2 w-full"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }} >
                        <label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register("image")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-green-50 file:text-green-700
                         hover:file:bg-green-100 cursor-pointer" />

                        {preview && (
                            <motion.img
                                src={preview}
                                alt="Preview"
                                className="mt-3 w-full h-60 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }} />
                        )}
                    </motion.fieldset>

                    <motion.button
                        type="submit"
                        disabled={isPending}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-lg bg-green-600 text-white text-sm sm:text-base font-semibold hover:bg-green-700 transition disabled:opacity-70" >
                        {isPending ? "Creating..." : "Create Post"}
                    </motion.button>

                    {error && (
                        <motion.p
                            className="text-sm text-red-500 mt-2 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }} >
                            {(error as Error).message}
                        </motion.p>
                    )}
                </form>
            </div>
        </motion.div>
    )
}

export default Create
