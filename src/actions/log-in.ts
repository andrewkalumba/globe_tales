'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { logInSchemas, logInType } from "./schemas"

export const LogIn = async (userdata: logInType) => {
    const parsedData = logInSchemas.parse(userdata)

    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.signInWithPassword(parsedData)

    // if (!user) {
    //     throw new Error("No user found with these credentials")
    // }

    if (error) return { error: error.message }
    redirect("/")
}