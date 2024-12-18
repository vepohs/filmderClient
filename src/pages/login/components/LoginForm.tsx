import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../../Utils/loginSchema.ts";
import FormInput from "../../../common/components/FormInput.tsx";
import {SvgEmailIcon} from "../../../common/icons/SvgEmailIcon.tsx";
import PasswordInput from "../../../common/components/PasswordInput.tsx";
import {SvgPasswordIcon} from "../../../common/icons/SvgPasswordIcon.tsx";
import axios from "axios";
import {LoginFormInputs} from "../../../types/auth.ts";
import {useAuth} from "../../../context/AuthContext.tsx";

// @ts-ignore
import "../style/LoginForm.sass";
import {useState} from "react";
import {CustomToastContainer} from "../../../common/components/CustomToastContainer.tsx";
import {handleErrorToast} from "../../../Utils/toastUtils.ts";

export function LoginForm() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const {login} = useAuth()
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setLoading(true);
        try {
            await login(data);
        } catch (error: unknown) {
            const errorMessage = handleLoginError(error);
            setError("password", {message: errorMessage});
            handleErrorToast(errorMessage);
        }finally {
            setLoading(false);
        }
    };

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


    return (
        <div className="login-box">
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    icon={SvgEmailIcon}
                    name="email"
                    type="email"
                    placeholder='Adresse email'
                    register={register}
                    error={errors.email}
                />
                <PasswordInput
                    icon={SvgPasswordIcon}
                    name="password"
                    register={register}
                    placeholder='Mot de passe'
                    error={errors.password}
                />
                <button className="submitBtnSignIn" type="submit" disabled={loading}>
                    Se connecter
                    {loading && <div className="spinnerLogin"></div>}
                </button>
            </form>
            <CustomToastContainer/>
        </div>
    );
}