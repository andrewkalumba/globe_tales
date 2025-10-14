"use client"

import Button from "@/components/Button"
import DeleteButton from "@/components/DeleteButton"
import { motion } from "framer-motion"
import EditButton from "../EditButton"
import CommentsSection from "../Comments"

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
            className="flex flex-col justify-center md:px-6 md:py-6 bg-gray-50 min-h-screen"
        >
            <article className="flex flex-col gap-8 max-w-5xl w-full mx-auto bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg md:rounded-2xl p-2 md:p-10 md:mt-10 transition-all">

                <header className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">

                    <div className="flex justify-between items-center gap-2 md:gap-8">
                        <div className="flex items-center gap-3 w-12 h-12 rounded-full bg-cyan-600 justify-center text-white font-semibold text-lg shadow-sm">
                            {post.users.username?.[0].toUpperCase()}
                        </div>
                        <h1 className="text-base md:text-2xl font-extrabold text-gray-800 leading-tight">
                            {post.title.toUpperCase()}
                        </h1>
                    </div>

                    <Button />
                </header>

                <div className="flex flex-col md:flex-row gap-10">
                    {post.images && (
                        <motion.div
                            className="w-full md:w-1/2 overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        >
                            <img src={post.images} alt={post.title} className="w-full h-full object-cover rounded-xl" />
                        </motion.div>
                    )}

                    <motion.section
                        className="w-full md:w-1/2 text-gray-700 text-sm md:text-base bg-gray-100 hover:bg-gray-300 rounded-2xl leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileFocus={{ scale: 1.2 }}
                    >
                        <p>{post.content}</p>
                    </motion.section>
                </div>

                {isAuthor && (
                    <div className="flex justify-end items-center gap-4" >
                        <EditButton slug={post.slug} />
                        <DeleteButton postId={post.id} />
                    </div>
                )}

                <motion.div
                    className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-6 border-t border-gray-200 dark:border-gray-800 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <span>
                        Posted by{" "}
                        <span className="font-semibold text-cyan-600">
                            {post.users.username}
                        </span>
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
            <div className="w-full max-w-5xl mx-auto mt-8 px-4 md:px-0">
                <CommentsSection postId={post.id} postOwnerId={post.user_id} />
            </div>
        </motion.div>
    )
}

export default PostContent