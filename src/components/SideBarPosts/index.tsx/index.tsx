import { motion } from "framer-motion"
import Link from "next/link"
import { PostInput, PostWithImages } from "@/actions/schemas"

const SidebarPosts = ({ posts }: { posts: PostWithImages[] }) => {
    return (
        <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-gray-700 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Recent Posts
            </h2>

            {posts.length === 0 && (
                <p className="text-gray-400 text-sm italic text-center">
                    No posts yet.
                </p>
            )}

            {posts.map((post) => <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="relative h-48 rounded-xl overflow-hidden group shadow-md transition-all hover:scale-[1.02]"
                style={{
                    backgroundImage: `url(${post.images})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all"></div>

                <div className="relative z-10 flex flex-col justify-between h-full p-4 text-white">
                    <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                        {post.title}
                    </h3>

                    {post.content && (
                        <p className="text-sm text-gray-200 mt-2 line-clamp-2">
                            {post.content}
                        </p>
                    )}

                    <div className="flex items-center justify-end mt-auto gap-2">
                        {post.images && (
                            <img src={post.images} alt={post.title} width={40} height={40} className="rounded-full border border-white/40 object-cover" />
                        )}
                        <p className="text-xs italic font-medium text-green-200">
                            by {post.users?.username || "Anonymous"}
                        </p>
                    </div>
                </div>
            </Link>
            )}
        </motion.aside>
    )
}

export default SidebarPosts
