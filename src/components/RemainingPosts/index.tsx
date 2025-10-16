'use client'

import { useState, useEffect } from "react"
import { fetchPosts } from "@/utils/loadPosts"
import { PostWithImages } from "@/actions/schemas"
import Link from "next/link"

const MorePosts = ({ posts }: { posts: PostWithImages[] }) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const data = await fetchPosts()
            data.slice(7)
            setLoading(false)
        }
        load()
    }, [])

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-400 text-lg">
                Loading posts...
            </div>
        )

    if (!posts)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-400 text-lg">
                No more posts.
            </div>
        )

    return (
        <div className="min-h-screen flex flex-col items-center md:mt-6">
            <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 dark:text-white m-6 text-center">
                Older Posts
            </h1>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
                {posts.map((post, index) => (
                    <div key={index} className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                        style={{
                            backgroundImage: post.images
                                ? `url(${post.images})`
                                : "url('/default-image.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}>
                        <div className="p-3 flex flex-col flex-1">
                            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">
                                {post.title}
                            </h2>

                            <div className="mt-2.5 flex-col md:row flex justify-between items-center ">
                                <span className="text-sm text-white mb-3">
                                    {new Date(post.created_at!).toLocaleDateString()}
                                </span>
                                <Link href={`/${post.slug}`} className="text-sm inline-block bg-green-600 text-white font-medium px-3 py-2 rounded-2xl hover:bg-green-700 transition capitalize" >
                                    read more 
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MorePosts
