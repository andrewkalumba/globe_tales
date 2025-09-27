import { div } from "motion/react-client"

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="text-orange-700">{message}</div>
    )
}
export default ErrorMessage