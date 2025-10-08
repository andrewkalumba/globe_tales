"use client"
import { EditPost } from "@/actions/edit-post"
import { Tables } from "@/utils/supabase/database-types"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const EditForm = ({ postId, initialValues }: { postId: number, initialValues: Pick<Tables<'posts'>, 'title' | 'content'> }) => {
    //Pick is a typescript function that helps you pick only hte types you want(title, content)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content
        }
    })

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })

    return (
        <form onSubmit={handleSubmit(values => mutate({ postId, userdata: { title: values.title, content: values.content! } }))}>
            <label htmlFor="title">Post Title</label>
            <input type="text" placeholder="Post title" {...register('title')} className="w-full rounded-lg border border-gray-300 px-3 py-2" />

            <label htmlFor="content">posts make peoples' days</label>
            <textarea placeholder="Post content" rows={6} {...register('content')} className="w-full rounded-lg border border-gray-300 px-3 py-2" />

            <button className="bg-gray-600 text-white p-4 rounded-2xl hover:bg-cyan-900">Submit</button>
        </form>
    )
}

export default EditForm