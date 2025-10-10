"use client"
import { useRouter } from "next/navigation"
import { FaBackspace } from "react-icons/fa";

const Button = () => {

    const Router = useRouter()

    const handleClick = () => {
        Router.push('/')
    }
    return (
        <FaBackspace size={40} onClick={handleClick} color="green" />
    )
}
export default Button