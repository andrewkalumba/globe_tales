import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/" className="inline-block">
            <img
                src="/logo.jpg"
                alt="logo"
                width={90}
                height={90}
                className="rounded-full object-cover"
            />
        </Link>
    )
}

export default Logo
