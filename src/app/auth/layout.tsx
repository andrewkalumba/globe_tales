import Logo from "@/components/Logo";

const AuthLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="bg-white">
            <Logo />
            {children}
        </div>)
}

export default AuthLayout