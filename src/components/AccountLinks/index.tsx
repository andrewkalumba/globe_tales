import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import { SignOutButton } from "./SignOutButton"

const AccountLinks = async () => {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return (
        <div className="flex gap-6">
            {user ?
                <>
                    <Link href="/createform" className="button-secondary bg-gray-900/90 text-center text-sm ">Create post</Link>
                    <SignOutButton />
                </> :

                <Link href="/auth/login" className="button-secondary">Login</Link>}
        </div>
    )
}
export default AccountLinks