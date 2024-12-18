    // src/AAAcomponents/login.tsx
import {LoginForm} from "./components/LoginForm.tsx";
import {HeaderLogin} from "./components/HeaderLogin.tsx";
import {GoToSignUp} from "./components/GoToSignUp.tsx";


// @ts-ignore
import "./Login.sass";

function Login() {
    return (
        <div className="loginContainer">
            <HeaderLogin/>
            <LoginForm/>
            <GoToSignUp/>
        </div>
    );
}

export default Login;
