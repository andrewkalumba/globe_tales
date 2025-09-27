import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/" className="inline-block">
            <img
                src="/sweden.jpg"
                alt="logo"
                width={50}
                height={50}
                className="rounded-full object-cover"
            />
        </Link>
    )
}

export default Logo
