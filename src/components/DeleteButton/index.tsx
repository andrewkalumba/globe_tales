"use client"
import { DeletePost } from "@/actions/delete-post"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { toast } from "sonner"

const DeleteButton = ({ postId }: { postId: string }) => {
    const { mutate, error } = useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting a post"),
        onSettled: () => toast.success("Post deleted")
    })
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.20 }}
        >
            <button onClick={() => mutate(postId)} className="bg-red-800 text-amber-50 p-3 m-2.5 rounded-2xl cursor-pointer">Delete Post</button>
        </motion.div>

    )
}
export default DeleteButton