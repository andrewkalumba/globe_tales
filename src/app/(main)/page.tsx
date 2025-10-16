'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fetchPosts } from "@/utils/loadPosts"
import MainPost from "@/components/MainPost"
import SidebarPosts from "@/components/SideBarPosts/index.tsx"
import Search from "@/components/Search"
import MorePosts from "@/components/RemainingPosts"

export default function Home() {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const data = await fetchPosts()
            setPosts(data)
            setLoading(false)
        }
        load()
    }, [])

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-400">
                Loading posts...
            </div>
        )

    if (!posts.length)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-400">
                No posts found.
            </div>
        )
    const sortedPosts = posts.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    const latest = sortedPosts[0]
    const side = sortedPosts.slice(1, 7)
    const half = Math.ceil(side.length / 2)
    const left = side.slice(0, half)
    const right = side.slice(half)
    const remaining = sortedPosts.slice(7)

    return (
        <div className="min-h-screen flex flex-col items-center px-4 md:px-8 py-10">
            <motion.section
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
                    Globe <span className="text-green-600">Tales</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
                    Real voices. Real places. One planet — through the eyes of explorers and storytellers.
                </p>
            </motion.section>
            <Search />

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-7 gap-6">
                <SidebarPosts posts={left} />
                <MainPost post={latest} />
                <SidebarPosts posts={right} />
            </div>
            <div><MorePosts posts={remaining} /></div>

            <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
              
            </footer>
        </div>
    )
}




