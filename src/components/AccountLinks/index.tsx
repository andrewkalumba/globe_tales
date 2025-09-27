import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import { SignOutButton } from "./SignOutButton"

const AccountLinks = async () => {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return (
        <div>
            {user ?
                <>
                    <Link href="/create" className="button-secondary bg-sky-950">Create post</Link>
                    <SignOutButton />
                </> :

                <Link href="/auth/login" className="button-secondary">Login</Link>}
        </div>
    )
}
export default AccountLinks