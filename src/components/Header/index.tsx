import AccountLinks from "../AccountLinks"
import Logo from "../Logo"

const Header = () => {
    return (
        <div className="flex justify-between items-center p-4 pb-2 border-b-2 bg-gradient-to-r from-[#FFFEFF] via-[#cdcdc3] to-black">
            <Logo />
            <AccountLinks />
        </div>

    )
}
export default Header