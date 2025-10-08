"use client"
import { LogOut } from "@/actions/log-out"

export const SignOutButton = () => {
    const HandleSignOut = async () => {
        LogOut()
    }

    return (
        <button onClick={HandleSignOut} className=" bg-gray-900/90 rounded-2xl p-4 border-2 text-white">Sign out</button>
    )
}