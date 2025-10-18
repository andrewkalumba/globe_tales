import { PostInput } from "@/actions/schemas"
import { motion } from "framer-motion"
import Link from "next/link"

function MainPost({ post }: { post: PostInput }) {
    return (
        <motion.main
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="lg:col-span-3 rounded-3xl overflow-hidden relative shadow-xl max-h-screen" >
            <div className="absolute inset-0"
                style={{
                    backgroundImage: post.images
                        ? `url(${Array.isArray(post.images) ? post.images[0] : post.images})`
                        : "url('/world.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.9)"
                }}
            />

            <div className="relative z-10 p-8 bg-black/50 text-white flex flex-col justify-around h-full rounded-3xl">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-gray-100 text-base leading-relaxed line-clamp-6">
                    {post.content?.slice(0, 400) || "No content yet..."}
                </p>
                <p className="text-sm text-gray-200 flex justify-end gap-1">
                    Posted by:{" "}
                    <span className="font-bold text-green-200">
                        {post.users?.username || "Anonymous"}
                    </span>
                </p>
                <div className="mt-2 text-center">
                    <Link href={`/${post.slug}`} className="inline-block bg-green-600 text-white font-medium px-6 py-2 rounded-full hover:bg-green-700 transition" >
                        Read More →
                    </Link>
                </div>
            </div>
        </motion.main>
    )
}
export default MainPost