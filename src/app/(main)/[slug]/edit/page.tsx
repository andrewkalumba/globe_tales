import { getSinglePost } from "@/utils/supabase/queries"
import EditForm from "./EditForm"

const EditPage = async ({ params }: { params: { slug: string } }) => {
    const slug = await params.slug

    const { data, error } = await getSinglePost(slug)

    return (
        <>
            {data &&
                <EditForm postId={data.id} initialValues={{ title: data.title, content: data.content }} />}
        </>
    )
}

export default EditPage