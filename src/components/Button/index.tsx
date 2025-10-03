"use client"
import { useRouter } from "next/navigation"
import { FaBackspace } from "react-icons/fa";

const Button = () => {

    const Router = useRouter()

    const handleClick = () => {
        Router.push('/')
    }
    return (
        <>
            {/* <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium transition" onClick={handleClick}>Back</button> */}
            <FaBackspace size={40} onClick={handleClick} />
        </>
    )
}
export default Button