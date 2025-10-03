"use server"
import z from "zod"
import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { signUpSchemas } from "./schemas"

export const SignUp = async (userdata:z.infer<typeof signUpSchemas>) => {
    const parsedData = signUpSchemas.parse(userdata)
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.signUp(parsedData)

    if (user && user.email) {
        const { data, error } = await supabase
            .from('users')
            .insert([{email: user.email, username: parsedData.username, id: user.id}])
    }
    if (error) throw error
    redirect('/')
}