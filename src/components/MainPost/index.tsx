"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Tables } from "@/utils/supabase/database-types"

type PostRow = Tables<"posts">
type UserRow = Tables<"users">

interface MainPostProps {
    post: PostRow & { users?: UserRow }
}

const MainPost = ({ post }: MainPostProps) => {
    let images: string[] | undefined = undefined
    if (post.images) {
        if (Array.isArray(post.images)) {
            images = post.images.filter((img): img is string => typeof img === "string")
        } else if (typeof post.images === "string") {
            images = [post.images]
        }
    }

    const firstImage = images?.[0]

    return (
        <motion.main
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="lg:col-span-3 rounded-3xl overflow-hidden relative shadow-xl max-h-screen"
        >
            {firstImage && (
                <div className="block md:hidden w-full h-64 rounded-2xl shadow-lg z-40"
                    style={{
                        backgroundImage: `url(${firstImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            )}
            {images && images.length > 0 && (
                <div className="hidden sm:grid  gap-4">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="hidden md:block w-full h-90 shadow-lg z-20"
                            style={{
                                backgroundImage: `url(${img})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        />
                    ))}
                </div>
            )}

            <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-gray-700">
                <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                <p className="text-gray-100 text-base leading-relaxed line-clamp-6 mt-2">
                    {post.content?.slice(0, 400) || "No content yet..."}
                </p>
                <p className="text-sm text-gray-200 flex justify-end gap-1 mt-2">
                    Posted by:{" "}
                    <span className="font-bold text-green-200 italic">
                        {post.users?.username || "Anonymous"}
                    </span>
                </p>
                <div className="mt-4 text-center">
                    <Link href={`/${post.slug}`} className="inline-block bg-green-600 text-white font-medium px-6 py-2 rounded-full hover:bg-green-700 transition z-20"  >
                        Read More →
                    </Link>
                </div>
            </div>
        </motion.main>
    )
}

export default MainPost
