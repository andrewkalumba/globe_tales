"use server"

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { signUpSchemas, signUpType } from "./schemas"

export const SignUp = async (userdata: signUpType ) => {
    const parsedData = signUpSchemas.parse(userdata)
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.signUp(parsedData)

    if (user && user.email) {
        const { data, error } = await supabase
            .from('users')
            .insert([{id: user.id, email: user.email, username: parsedData.username}])
    }
    if (error) throw error
    redirect('/')
}