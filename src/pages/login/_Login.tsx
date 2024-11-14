// src/AAAcomponents/_Login.tsx
import {LoginForm} from "./components/LoginForm.tsx";
import {HeaderLogin} from "./components/HeaderLogin.tsx";
import {GoToSignUp} from "./components/GoToSignUp.tsx";

// @ts-ignore
import "./_Login.sass";

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
