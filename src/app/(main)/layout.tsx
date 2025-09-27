import Header from "@/components/Header";

const Layout = ({ children, }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header />
            {children}
        </>)
}

export default Layout