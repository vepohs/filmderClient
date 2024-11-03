import "../styles/SignUpGlobalStyle.sass";

import {SignUpForm} from "./SignUpForm.tsx";
import {HeaderSignUp} from "./HeaderSignUp.tsx";
import {GoToSignIn} from "./GoToSignIn.tsx";


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
