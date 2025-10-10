"use server"
import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import { SignOutButton } from "./SignOutButton"

const AccountLinks = async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {user ? (
        <>
          <Link href="/createform" className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          >
            Create Post
          </Link>

          <div className="hover:scale-[1.02] transition-transform duration-200">
            <SignOutButton />
          </div>
        </>
      ) : (
        <Link
          href="/auth/login"
          className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        >
          Login
        </Link>
      )}
    </div>
  )
}

export default AccountLinks
