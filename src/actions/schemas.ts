import z from "zod"

export const userSchema = z.object({
    id: z.string().optional(),
    username: z.string().min(2, "Username must be at least 2 characters").optional(),
    email: z.string().email("Invalid email").optional(),
})

export const postSchemas = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().optional(),
    images: z.instanceof(FormData).optional().nullable(),
    slug: z.string().optional(),
    users: userSchema.optional(),

})

export const postWithImageSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    images: z.any()
        .transform(
            (value) => {
                return value as FileList
            },

        ).optional(),
    slug: z.string().optional(),
    created_at: z.date().optional(),
    users: userSchema.optional(),

})


export const logInSchemas = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Your password must be at least 6 characters"),
})

export const signUpSchemas = z.object({
    email: z.string().email("Please enter a valid email"),
    username: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(6, "Your password must be at least 6 characters"),
})

export type logInType = z.infer<typeof logInSchemas>
export type signUpType = z.infer<typeof signUpSchemas>
export type PostInput = z.infer<typeof postSchemas>
export type PostWithImages = z.infer<typeof postWithImageSchema>