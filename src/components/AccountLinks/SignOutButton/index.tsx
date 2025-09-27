"use client"
import { LogOut } from "@/actions/log-out"

export const SignOutButton = () => {
    const HandleSignOut = async () => {
        LogOut()
    }

    return (
        <button onClick={HandleSignOut} className="bg-amber-700 rounded-2xl p-4 border-2">Sign out</button>
    )
}