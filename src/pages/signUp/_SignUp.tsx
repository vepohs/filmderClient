// @ts-ignore
import "./_SignUp.sass";

import {SignUpForm} from "./components/SignUpForm.tsx";
import {HeaderSignUp} from "./components/HeaderSignUp.tsx";
import {GoToSignIn} from "./components/GoToSignIn.tsx";


function _SignUp() {
    return (
        <div className="signUpGlobalStyle">
            <HeaderSignUp/>
            <SignUpForm/>
            <GoToSignIn/>
        </div>
    );
}

export default _SignUp;
