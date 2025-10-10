import { motion } from "framer-motion"
import Link from "next/link"

const EditButton = ({ slug }: { slug: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.20 }}
        >
            <Link className="bg-green-700 text-amber-50 p-3 m-2.5 rounded-2xl cursor-pointer capitalize" href={`/${slug}/edit`}>edit post</Link>
        </motion.div>
    )

}

export default EditButton