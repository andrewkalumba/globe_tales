import z from "zod"

export const postSchemas = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().optional(),
    image: z
        .any()
        .transform((item) => {
            if (typeof FileList !== "undefined" && item instanceof FileList && item.length > 0) {
                return item[0] //transform turns a FileList into a single File (or undefined)
            }
            return undefined
        })
        .optional(),
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
