import AccountLinks from "../AccountLinks"
import Logo from "../Logo"

const Header = () => {
    return (
            <div className="flex justify-between items-center p-4 pb-2 border-b-2">
                <Logo />
                <AccountLinks />
            </div>
   
    )
}
export default Header