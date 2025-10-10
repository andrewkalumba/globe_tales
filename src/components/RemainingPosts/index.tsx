'use client'

import { useState, useEffect } from "react"
import { fetchPosts } from "@/utils/loadPosts"
import { PostWithImages } from "@/actions/schemas"

const MorePosts = ({ posts }: { posts: PostWithImages [] }) => {

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
            <h1 className="text-3xl sm:text-2xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Older Posts
            </h1>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                        style={{
                            backgroundImage: post.images
                                ? `url(${post.images})`
                                : "url('/default-image.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}>
                        {post.images && (
                            <img src={post.images} alt={post.title} width={40} height={40} className="rounded-full" />
                        )}
                        <div className="p-5 flex flex-col flex-1">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                                {post.title}
                            </h2>
                           
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-sm text-gray-400 dark:text-gray-500">
                                    {new Date(post.created_at!).toLocaleDateString()}
                                </span>
                                <a href={`/${post.slug}`} className="text-green-600 dark:text-green-400 font-medium hover:underline" >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MorePosts
