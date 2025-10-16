"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/browser-client";
import { useSession } from "@supabase/auth-helpers-react";
import { Tables } from "@/utils/supabase/database-types";

type CommentWithUser = Tables<"comments"> & {
    users?: { username?: string };
    replies?: CommentWithUser[];
};

interface CommentsSectionProps {
    postId: string;
    postOwnerId?: string;
}

const CommentsSection = ({ postId, postOwnerId }: CommentsSectionProps) => {
    const supabase = createClient();
    const session = useSession();
    const currentUserId = session?.user?.id;
    const currentUsername = session?.user?.user_metadata?.username || "You";

    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [newComment, setNewComment] = useState("");
    const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from("comments")
                .select(
                    "id, content, created_at, updated_at, user_id, post_id, more_comments_id, username, users(username)"
                )
                .eq("post_id", postId)
                .order("created_at", { ascending: true });

            if (error) {
                console.error("Error fetching comments:", error.message);
                return;
            }

            const parents = data.filter((comment) => !comment.more_comments_id);
            const children = data.filter((comment) => comment.more_comments_id);

            const structured = parents.map((p) => ({
                ...p,
                replies: children.filter((ch) => ch.more_comments_id === p.id),
            }));

            setComments(structured);
        };

        fetchComments();
    }, [postId, supabase]);

    const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
        e.preventDefault();
        const content = parentId ? replyText[parentId] : newComment;
        if (!content?.trim()) return;

        if (!currentUserId) {
            alert("You must be logged in to comment.");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase
            .from("comments")
            .insert({
                post_id: postId,
                user_id: currentUserId,
                content,
                more_comments_id: parentId || null,
            })
            .select(
                "id, content, created_at, updated_at, user_id, post_id, username, more_comments_id, users(username)"
            )
            .single();

        setLoading(false);

        if (error) {
            console.error("Error adding comment:", error.message);
            return;
        }

        if (data) {
            if (parentId) {
                setComments((prev) =>
                    prev.map((c) =>
                        c.id === parentId
                            ? { ...c, replies: [...(c.replies || []), data] }
                            : c
                    )
                );
                setReplyText((prev) => ({ ...prev, [parentId]: "" }));
            } else {
                setComments((prev) => [data, ...prev]);
                setNewComment("");
            }
        }
    };

    const handleDelete = async (commentId: string, commentUserId?: string) => {
        if (!currentUserId) return;

        const canDelete =
            commentUserId === currentUserId || currentUserId === postOwnerId;
        if (!canDelete) {
            alert("You don’t have permission to delete this comment.");
            return;
        }

        const { error } = await supabase
            .from("comments")
            .delete()
            .eq("id", commentId);

        if (error) {
            console.error("Error deleting comment:", error.message);
            return;
        }

        setComments((prev) =>
            prev
                .filter((c) => c.id !== commentId)
                .map((c) => ({
                    ...c,
                    replies: c.replies?.filter((r) => r.id !== commentId),
                }))
        );
    };

    const renderComment = (comment: CommentWithUser, indent = 0) => (
        <motion.div
            key={comment.id}
            className={`bg-white p-4 rounded-xl shadow-md flex flex-col gap-3 hover:shadow-lg transition`}
            style={{ marginLeft: indent }}
        >
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-semibold text-lg">
                    {comment.users?.username?.[0]?.toUpperCase() ?? "A"}
                </div>
                <div className="flex flex-col w-full">
                    <p className="text-gray-800">{comment.content}</p>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                        <span className="italic font-semibold text-cyan-600">
                            {comment.users?.username ?? "Anonymous"}
                        </span>
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
                {(comment.user_id === currentUserId || currentUserId === postOwnerId) && (
                    <button onClick={() => handleDelete(comment.id, comment.user_id)} className="text-red-500 hover:text-red-700 cursor-pointer" >
                        Delete
                    </button>
                )}

                <form onSubmit={(e) => handleSubmit(e, comment.id)} className="flex gap-2 w-[70%] md:w-full" >
                    <input type="text" placeholder="Reply..." value={replyText[comment.id] || ""} onChange={(e) => setReplyText((prev) => ({
                        ...prev, [comment.id]: e.target.value,
                    }))} className="border border-gray-300 rounded-lg p-2 w-1/2 md:flex-1 focus:ring-2 focus:ring-green-500" />

                    <button type="submit" disabled={loading || !currentUserId} className="bg-green-600 text-white px-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 cursor-pointer" >
                        Reply
                    </button>
                </form>
            </div>

            {comment.replies?.map((reply) => renderComment(reply, indent + 20))}
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 mb-3 bg-gray-50 p-6 rounded-2xl shadow-md w-full max-w-3xl mx-auto"
        >
            <h3 className="text-2xl font-bold mb-6">Comments 💬</h3>

            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 mb-6">
                <textarea
                    className="border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder={
                        currentUserId
                            ? "Write a comment..."
                            : "You must be logged in to comment"
                    }
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={!currentUserId}
                />
                <button type="submit" disabled={loading || !currentUserId} className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 cursor-pointer" >
                    {loading ? "Posting..." : "Post Comment"}
                </button>
            </form>

            <div className="flex flex-col gap-4">
                {comments.length > 0 ? (
                    comments.map((comment) => renderComment(comment))
                ) : (
                    <p className="text-gray-500">No comments yet. Be the first!</p>
                )}
            </div>
        </motion.div>
    );
};

export default CommentsSection;
