import { SignUp } from "@/actions/sign-up"

const SignUpForm = () => {
    return (
        <>
            <form action={SignUp} className="p-4 flex flex-col mx-auto gap-4 items-center-safe">
                <h2 className="uppercase">Sign Up</h2>
                <fieldset className="flex gap-3">
                    <label htmlFor="email"> Enter your email</label>
                    <input type="text" id="email" name="email" placeholder="Enter your email" />
                </fieldset>

                <fieldset className="flex gap-3">
                    <label htmlFor="username"> Enter your name</label>
                    <input type="name" id="name" name="name" placeholder="name" />
                </fieldset>

                <fieldset className="flex gap-3">
                    <label htmlFor="password"> Enter your password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </fieldset>
                <button className="button-primary w-1/4 ">Sign up</button>
            </form>
        </>
    )
}
export default SignUpForm