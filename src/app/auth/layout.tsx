import Logo from "@/components/Logo";

const AuthLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="bg-gradient-to-r from-[#FFFEFF] via-[#cdcdc3] to-black">
            <Logo />
            {children}
        </div>)
}

export default AuthLayout