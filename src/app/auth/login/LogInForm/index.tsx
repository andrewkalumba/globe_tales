"use client"

import { LogIn } from "@/actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchemas } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading } from "react-icons/ai"
import { useState } from "react"
import { motion } from "motion/react"

const LogInForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClick = () => {
        setShowPassword(!showPassword)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(logInSchemas),
    })

    const { mutate, isPending, error, data } = useMutation({
        mutationFn: LogIn,
    })

    return (
        <form onSubmit={handleSubmit((values) => mutate(values))} className="w-full max-w-md mx-auto flex flex-col gap-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-xl">
            <h2 className="uppercase text-lg font-bold text-center text-gray-800">
                Login
            </h2>
            <fieldset className="flex flex-col gap-1 w-full">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Enter your email
                </label>
                <input type="text" id="email" {...register("email")} placeholder="sweden@gmail.com" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </fieldset>

            <fieldset className="flex flex-col gap-1 w-full relative">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Enter your password
                </label>
                <div className="relative w-full">
                    <input type={showPassword ? "text" : "password"} id="password" {...register("password")} placeholder="••••••••"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400" />

                    <motion.button
                        type="button"
                        onClick={handleClick}
                        className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-400"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        {showPassword ? (
                            <AiOutlineEyeInvisible size={20} />
                        ) : (
                            <AiOutlineEye size={20} />
                        )}
                    </motion.button>
                </div>

                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </fieldset>

            <button type="submit" disabled={isPending} className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-70">
                {isPending ? (
                    <AiOutlineLoading className="animate-spin text-yellow-300 text-xl" />
                ) : (
                    "Log in"
                )}
            </button>

            {/* {error && (
                <p className="text-center text-sm text-red-600 mt-2">
                    {error.message}
                </p>
            )} */}

            {data?.error && <ErrorMessage message={data.error} />}
        </form>
    )
}

export default LogInForm
