"use client"
import { LogOut } from "@/actions/log-out"

export const SignOutButton = () => {
    const HandleSignOut = async () => {
        LogOut()
    }

    return (
        <button onClick={HandleSignOut} className="px-8 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#2A324B] to-red-800 hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-red-400 focus:outline-none">Sign out</button>
    )
}