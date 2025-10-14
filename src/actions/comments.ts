import { createClient } from "@/utils/supabase/server-client";
import { Tables } from "@/utils/supabase/database-types";

export type CommentWithUser = Tables<"comments"> & {
    users?: {
        username?: string;
    };
};

export async function addComment(
    postId: string,
    userId: string,
    content: string
): Promise<CommentWithUser> {
    const supabase = await createClient();

    // insert comment
    const { data, error } = await supabase
        .from("comments")
        .insert({ post_id: postId, user_id: userId, content })
        .select("id, content, created_at, updated_at, user_id, post_id, username, more_comments_id, users(username)")
        .single();

    if (error) throw new Error(error.message);
    return data
}
