import Logo from "@/components/Logo";

const AuthLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <>
            <Logo />
            {children}
        </>)
}

export default AuthLayout