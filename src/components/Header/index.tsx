import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import Search from "../Search"

const Header = () => {
    return (
            <div className="flex justify-between items-center p-4 pb-2 border-b-2">
                <Logo />
                 <Search />
                <AccountLinks />
            </div>
   
    )
}
export default Header