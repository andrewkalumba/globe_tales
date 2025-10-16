import { getSinglePost } from "@/utils/supabase/queries"
import EditForm from "./EditForm"

const EditPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug
  const { data, error } = await getSinglePost(slug)

  if (!data) return null

  let images: string[] | undefined
  if (data.images && Array.isArray(data.images)) {
    images = data.images.filter((img): img is string => typeof img === "string")
  }

  return (
    <>
      <EditForm
        postId={data.id}
        initialValues={{
          title: data.title,
          content: data.content ?? "",
          images,
        }}
      />
    </>
  )
}

export default EditPage
