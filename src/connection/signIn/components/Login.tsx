// src/components/Login.tsx

// @ts-ignore

import { LoginForm } from "./LoginForm.tsx";
import { HeaderLogin } from "./HeaderLogin.tsx";
import { GoToSignUp } from "./GoToSignUp.tsx";
import"../styles/LoginIndex.sass";

function Login() {
    return (
        <div className="container">
            <HeaderLogin />
            <LoginForm />
            <GoToSignUp />
            </div>
    );
}

export default Login;
