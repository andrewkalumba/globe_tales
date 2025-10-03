"use client"

import Button from "@/components/Button"
import DeleteButton from "@/components/DeleteButton"
import { motion } from "framer-motion"

interface PostContentProps {
    post: any
    isAuthor: boolean
}

const PostContent = ({ post, isAuthor }: PostContentProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen"
        >
            <article className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-6 sm:p-12 space-y-8">
                <div className="flex justify-start mb-4">
                    <Button />
                </div>

                <header className="text-center sm:text-left space-y-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <motion.div
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }} >

                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {post.users.username?.[0].toUpperCase()}
                        </div>

                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                                {post.title.toUpperCase()}
                            </h1>
                        </div>
                    </motion.div>
                </header>

                {post.images && (
                    <motion.div
                        className="overflow-hidden rounded-2xl shadow-lg"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5 }}>
                        <img src={post.images} alt={post.title} className="w-full max-h-[500px] object-cover rounded-2xl" />
                    </motion.div>
                )}

                <motion.section
                    className="prose dark:prose-invert max-w-full text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>

                    <p className="text-lg sm:text-xl leading-relaxed whitespace-pre-line">
                        {post.content}
                    </p>

                    {isAuthor && (
                        <motion.div
                            className="mt-6 flex justify-end"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }} >
                            <DeleteButton postId={post.id} />
                        </motion.div>
                    )}
                </motion.section>

                <motion.div
                    className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm sm:text-base mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }} >
                    <span>
                        Posted by <span className="font-semibold">{post.users.username}</span>
                    </span>
                    {post.created_at && (
                        <span>
                            {new Date(post.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    )}
                </motion.div>
            </article>
        </motion.div>
    )
}

export default PostContent
