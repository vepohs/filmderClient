// src/AAAcomponents/Login.tsx
import { LoginForm } from "./LoginForm.tsx";
import { HeaderLogin } from "./HeaderLogin.tsx";
import { GoToSignUp } from "./GoToSignUp.tsx";

// @ts-ignore
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
