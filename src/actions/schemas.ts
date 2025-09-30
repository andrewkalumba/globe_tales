import z from "zod" //helps with validation

export const logInSchemas = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Your password must be at least 6 characters"),
})

export const signUpSchemas = z.object({
    email: z.string().email("Please enter a valid email"),
    username: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(6, "Your password must be at least 6 characters"),
})
