// src/AAAcomponents/LoginForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import {LoginFormInputs} from "../../signUp/types/formInputsType.ts";
import {loginSchema} from "../../signUp/validation/signInSchema.ts";
import FormInput from "../../../AAAcomponents/common/FormInput.tsx";
import {EmailIcon} from "../../../AAAcomponents/assets/EmailIcon.tsx";
import PasswordInput from "../../../AAAcomponents/common/PasswordInput.tsx";
import {PasswordIcon} from "../../../AAAcomponents/assets/PasswordIcon.tsx";

// @ts-ignore
import "../styles/LoginForm.sass";


export function LoginForm() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const response = await axios.post('http://localhost:3014/api/auth/login', data);
            console.log(response);
            // Gérer la connexion réussie (redirection, stockage du token, etc.)
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
