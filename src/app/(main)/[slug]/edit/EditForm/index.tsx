"use client"
import { EditPost } from "@/actions/edit-post"
import { postWithImageSchema } from "@/actions/schemas"
import { Tables } from "@/utils/supabase/database-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const EditForm = ({ postId, initialValues }: { postId: string, initialValues: Pick<Tables<'posts'>, 'title' | 'content' | 'images'> }) => {

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(postWithImageSchema),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            images: initialValues.images
        }
    })

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })

    return (
        <form onSubmit={handleSubmit(values => {
            let imageForm = undefined;

            if (values.images?.length && typeof values.images !== "string") {
                imageForm = new FormData()
                console.log("values image", typeof values.images)
                imageForm.append('image', values.images[0])
            }
            mutate({ postId, userdata: { title: values.title, content: values.content!, images: imageForm } })
        })}
            className="flex flex-col gap-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md md:rounded-2xl p-8 md:mt-10" >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Edit Post ✏️</h2>

            <label htmlFor="title" className="text-sm font-medium text-gray-700">Post Title</label>
            <input
                type="text"
                placeholder="Post title"
                {...register('title')}
                className="w-full rounded-xl hover:bg-gray-100 border border-gray-300 px-4 py-5 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />

            <label htmlFor="content" className="text-sm font-medium text-gray-700">Post Content</label>
            <textarea
                placeholder="Every day posts..."
                rows={11}
                {...register('content')}
                className="w-full rounded-xl hover:bg-gray-100 border border-gray-300 px-4 py-2 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />

            {initialValues.images && (
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Current Image</span>
                    <img
                        className="w-full max-h-[40%] object-cover rounded-xl shadow-sm border border-gray-200"
                        src={initialValues.images}
                        alt={initialValues.title}
                    />
                </div>
            )}

            <label htmlFor="images" className="text-sm font-medium text-gray-700">Upload New Image</label>
            <input
                type="file"
                accept="image/*"
                id="image"
                {...register("images")}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 transition-all"
            />

            <button className="mt-4 bg-cyan-600 text-white font-semibold py-3 rounded-2xl hover:bg-cyan-700 transition-all shadow-md hover:shadow-lg" >
                Update Post ✨
            </button>

            {error && <p className="text-red-600 text-sm mt-2 text-center">Something went wrong: {error.message}</p>}
        </form>
    )
}

export default EditForm
