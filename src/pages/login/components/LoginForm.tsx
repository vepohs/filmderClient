// src/AAAcomponents/LoginForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import {LoginFormInputs} from "../../../types/formInputsTypes.ts";
import {loginSchema} from "../loginSchema.ts";
import FormInput from "../../../common/components/FormInput.tsx";
import {EmailIcon} from "../../../common/icons/EmailIcon.tsx";
import PasswordInput from "../../../common/components/PasswordInput.tsx";
import {PasswordIcon} from "../../../common/icons/PasswordIcon.tsx";

// @ts-ignore
import "../style/LoginForm.sass";
import {useAuth} from "../../../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";



export function LoginForm() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const navigate = useNavigate();
    const auth = useAuth();


    const tryLogin = async (data: LoginFormInputs) => {
        try {
            const response = await axios.post('http://localhost:3014/api/auth/login', data);
            const token = response.data.accessToken;
            auth?.login(token);
            navigate('/mainApp');
            console.log("yoooo" + auth?.isAuthenticated);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setError('password', { message: 'Email ou mot de passe incorrect' });
                } else if (error.code === "ERR_NETWORK") {
                    console.log("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
                } else if (error.response?.status === 500) {
                    alert("Problème serveur lors de la validation du formulaire. Veuillez réessayer.");
                } else {
                    console.log("Une erreur inattendue est survenue. Veuillez réessayer.");
                }
            } else {
                console.log("Une erreur inattendue est survenue.");
            }
        }
    }


    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        console.log(data)
        await tryLogin(data);
    };

    return (
        <div className="container">
          <div className="login-box">


        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                icon={EmailIcon}
                name="email"
                type="email"
                placeholder='Adresse email'
                register={register}
                error={errors.email}
            />
            <PasswordInput
                icon={PasswordIcon}
                name="password"
                register={register}
                placeholder='Mot de passe'
                error={errors.password}
            />
            <button className="submitBtn" type="submit">Se connecter</button>
        </form>
          </div>
        </div>
    );
}

export default LoginForm;
