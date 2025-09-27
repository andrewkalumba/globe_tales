"use server"

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"

export const SignUp = async (FormData: FormData) => {
    const userdata = {
        email: FormData.get("email") as string,
        username: FormData.get("username") as string,
        password: FormData.get("password") as string,
    }
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.signUp(userdata)

    if (user && user.email) {
        const { data, error } = await supabase
            .from('users')
            .insert([{ id: user.id, email: user.email, username: userdata.username }])
    }
    if (error) throw error
    redirect('/')

    console.log(user)
}