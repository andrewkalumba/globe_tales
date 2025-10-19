"use server"

import { getSinglePost } from "@/utils/supabase/queries"
import PostContent from "@/components/PostContent"
import { createClient } from "@/utils/supabase/server-client"

const SinglePostPage = async ({ params }: { params: { slug: string } }) => {
  const slug = await params.slug

  const { data, error } = await getSinglePost(slug)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAuthor = user?.id === data?.user_id

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-medium">
          Post not found.
        </p>
      </div>
    )
  }

  return <PostContent post={data} isAuthor={isAuthor} />
}

export default SinglePostPage
