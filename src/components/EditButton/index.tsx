import Link from "next/link"

const EditButton = ({ slug }: { slug: string }) => {
    return (
        <Link className="button-secondary uppercase p-4 rounded-2xl" href={`/${slug}/edit`}>edit </Link>
    )
}

export default EditButton