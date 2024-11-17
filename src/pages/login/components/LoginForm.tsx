// src/AAAcomponents/LoginForm.tsx
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
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
import {GoToSignUp} from "./GoToSignUp.tsx";

export function LoginForm() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const auth = useAuth();

    const tryLogin = (data: LoginFormInputs) => {
        try {
            auth?.login(data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setError('password', {message: 'Email ou mot de passe incorrect'});
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
        tryLogin(data);
    };

    return (
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
                    <button className="submitBtnSignIn" type="submit">Se connecter</button>
                </form>
                <GoToSignUp/>
            </div>
    );
}

export default LoginForm;
