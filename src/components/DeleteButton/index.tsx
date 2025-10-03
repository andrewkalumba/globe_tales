"use client"
import { DeletePost } from "@/actions/delete-post"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({ postId }: { postId: number }) => {
    const { mutate, error } = useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting a post"),
        onSettled:() => toast.success("Post deleted")
    })
    return (
        <button onClick={() => mutate(postId)} className="bg-red-800 text-amber-50 p-3 m-2.5 rounded-2xl hover:bg-amber-100 hover:text-black cursor-pointer">Delete Post</button>
    )
}
export default DeleteButton