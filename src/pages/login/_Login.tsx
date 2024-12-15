// src/AAAcomponents/_Login.tsx
import {LoginForm} from "./components/LoginForm.tsx";
import {HeaderLogin} from "./components/HeaderLogin.tsx";


// @ts-ignore
import "./_Login.sass";
import {GoToSignUp} from "./components/GoToSignUp.tsx";

function _Login() {
    return (
        <div className="loginContainer">
            <HeaderLogin/>
            <LoginForm/>
            <GoToSignUp/>
        </div>
    );
}

export default _Login;
