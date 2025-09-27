import z from "zod"

export const logInSchemas = z.object({
    email: z.email(),
    password: z.string().min(6, "your password must be 6 characters minimum")
})