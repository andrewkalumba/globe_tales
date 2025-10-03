import { getSinglePost } from "@/utils/supabase/queries"
import Button from "@/components/Button"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  const { data, error } = await getSinglePost(slug)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  //console.log("logged in user", user?.id)

  const isAuthor = user?.id === data?.user_id ? true : false

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-medium">Failed to load post.</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-4 py-10">
      {data && (
        <article className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 space-y-8">
          <Button />

          <header className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {data.title}
            </h1>
            {/* <p>Author: {data.user_id}</p>
            <p>Loggedin: {user?.id}</p>  */}
          </header>
          {data.images && (
            <div className="flex justify-center">
              <img src={data.images} alt={data.title} className="w-full max-h-96 object-cover rounded-xl shadow-md" />
            </div>
          )}

          <section>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {data.content}
            </p>

            {isAuthor &&
              <DeleteButton postId={data.id} />
            }

          </section>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Post by <span className="font-semibold uppercase">{data.users.username}</span>
            </p>
            <div>{data.created_at &&
              (new Date(data.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }))}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}

export default SinglePost