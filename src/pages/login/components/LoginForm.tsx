// src/AAAcomponents/LoginForm.tsx
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginFormInputs} from "../../../types/formInputsTypes.ts";
import {loginSchema} from "../../../Utils/loginSchema.ts";
import FormInput from "../../../common/components/FormInput.tsx";
import {EmailIcon} from "../../../common/icons/EmailIcon.tsx";
import PasswordInput from "../../../common/components/PasswordInput.tsx";
import {PasswordIcon} from "../../../common/icons/PasswordIcon.tsx";
import {useAuth} from "../../../context/AuthContext.tsx";

// @ts-ignore
import "../style/LoginForm.sass";
import axios from "axios";


export function LoginForm() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const {login} = useAuth()

     const handleLoginError = (error: unknown): string => {
        if (axios.isAxiosError(error)) {
            switch (error.response?.status) {
                case 401:
                    return "Email ou mot de passe incorrect";
                case 500:
                    return "Erreur serveur. Veuillez réessayer.";
                default:
                    return "Une erreur inattendue est survenue.";
            }
        }
        return "Erreur inconnue.";
    };

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            await login(data);

        } catch (error: unknown) {
            const errorMessage = handleLoginError(error);
            setError("password", {message: errorMessage});
        }
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
        </div>
    );
}