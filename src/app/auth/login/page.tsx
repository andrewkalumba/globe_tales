"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import LogInForm from "./LogInForm"

const LogInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md bg-[url('/sweden.jpg')] bg-center bg-cover rounded-xl shadow-lg p-8 space-y-6">

                <h1 className="text-2xl font-bold text-gray-900 text-center uppercase">tourism sweden 🇸🇪</h1>
                <p className="text-sm text-gray-800 text-center">
                    Please log in to continue
                </p>

                <div className="w-full">
                    <LogInForm />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="">🇸🇪</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="text-center text-sm text-gray-800">
                    Don’t have an account?{" "}
                    <Link href="/auth/signup" className="text-green-600 font-medium hover:underline hover:text-green-800 transition-colors">
                        Sign up
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default LogInPage
