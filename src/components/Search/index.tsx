"use client"
import { getSearchedPosts } from "@/utils/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { SetStateAction, useState } from "react"
import { CiSearch } from "react-icons/ci"

const Search = () => {
    const [userInput, setUserInput] = useState<string>("")

    const { data } = useQuery({
        queryKey: ["search-results", userInput],
        queryFn: async () => {
            const { data, error } = await getSearchedPosts(userInput)
            if (error) throw new Error()
            return data
        },
        enabled: userInput && userInput.length > 0 ? true : false,
    })

    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setUserInput(e.target.value)
    }

    return (
        <div className="relative w-full max-w-lg mx-auto flex justify-center pb-4">

            <div className="flex gap-6 p-3 items-center w-[70%] md:w-1/2 bg-gray-900/90 rounded-2xl justify-center ">
                <input onChange={handleChange} name="search" placeholder="Search posts.." value={userInput} className="w-1/2 text-lg text-amber-50 bg-transparent outline-none placeholder:text-white" />
                <CiSearch size={24} className="text-amber-50" />
            </div>

            {data && data.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl max-h-72 overflow-y-auto z-50 ">
                    {data.map(({ title, slug, id }) => (
                        <Link key={id} href={`/${slug}`} onClick={() => setUserInput("")} className="block px-4 py-3 hover:bg-neutral-800 rounded-xl transition-colors">
                            <span className="text-blue-100 font-medium">{title}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search
