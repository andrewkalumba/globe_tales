'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { logInSchemas } from "./schemas"
import z from "zod"

export const LogIn = async (userdata: z.infer<typeof logInSchemas>) => {
    const parsedData = logInSchemas.parse(userdata)

    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.signInWithPassword(parsedData)

    if (error) throw error
    redirect("/")
}