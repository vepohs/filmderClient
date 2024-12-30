import FormInput from "../../../common/components/FormInput.tsx";
import PasswordInput from "../../../common/components/PasswordInput.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {signUpSchema} from "../../../utils/signUpSchema.ts";
import axios from "axios";
import {SvgEmailIcon} from "../../../common/icons/SvgEmailIcon.tsx";
import {SvgNameIcon} from "../../../common/icons/SvgNameIcon.tsx";
import {SvgAgeIcon} from "../../../common/icons/SvgAgeIcon.tsx";
import {SvgPasswordIcon} from "../../../common/icons/SvgPasswordIcon.tsx";
import {useNavigate} from "react-router-dom";
import {FormInputs} from "../../../types/forms.ts";
import {checkUniqueEmail, createNewUser} from "../../../services/signUpFormApiCall.ts";
import {toast} from "react-toastify";
import {handleErrorToast, handleSuccessToast} from "../../../utils/toastUtils.ts";
import {CustomToastContainer} from "../../../common/components/CustomToastContainer.tsx";

// @ts-ignore
import "../style/SignUpForm.sass";




export function SignUpForm() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<FormInputs>({
        resolver: yupResolver(signUpSchema),
        mode: 'onBlur',
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const { isUnique } = await checkUniqueEmail(data.email);
            if (!isUnique) {
                handleErrorToast("Cet email est déjà utilisé");
                setError('email', {message: 'Cet email est déjà utilisé'});
                return;
            }
            await createNewUser(data);
            handleSuccessToast("Inscription réussie. Redirection vers la page de connexion...");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error: unknown) {
            handleSignUpError(error);
        }
    };

    function handleSignUpError(error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") {
                toast.error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
            } else if (error.response?.status === 409) {
                // On sait jamais que un méchant envoie un mail deja utilisé ou quoi
                toast.error("Cet email est déjà utilisé");
                setError('email', {message: 'Cet email est déjà utilisé'});
            } else if (error.response?.status === 500) {
                toast.error("Problème serveur lors de la validation du formulaire. Veuillez réessayer.");
            } else {
                toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
            }
        } else {
            toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
        }
    }

    return (
        <>
        <form className="signUpForm" onSubmit={handleSubmit(onSubmit)}>
            <FormInput<FormInputs>
                icon={SvgNameIcon}
                name="firstName"
                type="text"
                placeholder={'Prénom'}
                register={register}
                error={errors.firstName}
            />
            <FormInput<FormInputs>
                icon={SvgNameIcon}
                name="lastName"
                type="text"
                register={register}
                placeholder={'Nom'}
                error={errors.lastName}
            />

            <FormInput<FormInputs>
                icon={SvgEmailIcon}
                name="email"
                type="email"
                register={register}
                placeholder='Adresse email'
                error={errors.email}
            />
            <FormInput<FormInputs>
                icon={SvgAgeIcon}
                name="age"
                type="text"
                placeholder={'Âge'}
                register={register}
                error={errors.age}
            />

            <PasswordInput<FormInputs>
                icon={SvgPasswordIcon}
                name="password"
                register={register}
                placeholder='Mot de passe'
                error={errors.password}
            />

            <PasswordInput<FormInputs>
                icon={SvgPasswordIcon}
                name="confirmPassword"
                placeholder='Mot de passe'
                register={register}
                error={errors.confirmPassword}
            />
            <button id = "submitBtn" className="submitBtn" type="submit">Inscription</button>
        </form>
        <CustomToastContainer/>
        </>
    );
}