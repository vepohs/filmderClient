// @ts-ignore
import "./SignUp.sass";

import {SignUpForm} from "./components/SignUpForm.tsx";
import {HeaderSignUp} from "./components/HeaderSignUp.tsx";
import {GoToSignIn} from "./components/GoToSignIn.tsx";


function SignUp() {

    return (
        <div className="signUpGlobalStyle">
            <HeaderSignUp/>
            <SignUpForm/>
            <GoToSignIn/>
        </div>
    );
}

export default SignUp;
