import FormInput from "../../../common/components/FormInput.tsx";
import PasswordInput from "../../../common/components/PasswordInput.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {FormInputs} from "../../../types/formInputsTypes.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {signUpSchema} from "../../../Utils/signUpSchema.ts";
import axios from "axios";
import {EmailIcon} from "../../../common/icons/EmailIcon.tsx";
import {NameIcon} from "../../../common/icons/NameIcon.tsx";
import {AgeIcon} from "../../../common/icons/AgeIcon.tsx";
import {PasswordIcon} from "../../../common/icons/PasswordIcon.tsx";
import {useNavigate} from "react-router-dom";
import {checkUniqueEmail, createNewUser} from "../../../Services/SignUpFormApiCall.ts";
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
                setError('email', {message: 'Cet email est déjà utilisé'});
                return;
            }

            await createNewUser(data);
            navigate("/protected/preferences"); // Remplacez "/welcome" par le chemin de la page cible

        } catch (error: unknown) {
            // TODO POUR L INSTANT Y A TOUJOURS UN POST EN ROUGE DANS LA CONSOLE C EST FAIT PAR LE NAVIGATEUR MAIS C EST POSSIBLE DE LE REMOVE
            handleSignUpError(error, setError);
        }
    };

    function handleSignUpError(error: unknown, setError: any) {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") {
                alert("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
            } else if (error.response?.status === 409) {
                setError('email', {message: 'Cet email est déjà utilisé'});
            } else if (error.response?.status === 500) {
                alert("Problème serveur lors de la validation du formulaire. Veuillez réessayer.");
            } else {
                console.error("Erreur inattendue lors de la requête AXIOS:", error);
                alert("Une erreur inattendue est survenue. Veuillez réessayer.");
            }
        } else {
            console.error("Erreur inconnue:", error);
            alert("Une erreur inattendue est survenue. Veuillez réessayer.");
        }
    }



    return (
        <form className="signUpForm" onSubmit={handleSubmit(onSubmit)}>
            <FormInput<FormInputs>
                icon={NameIcon}
                name="firstName"
                type="text"
                placeholder={'Prénom'}
                register={register}
                error={errors.firstName}
            />
            <FormInput<FormInputs>
                icon={NameIcon}
                name="lastName"
                type="text"
                register={register}
                placeholder={'Nom'}
                error={errors.lastName}
            />

            <FormInput<FormInputs>
                icon={EmailIcon}
                name="email"
                type="email"
                register={register}
                placeholder='Adresse email'
                error={errors.email}
            />
            <FormInput<FormInputs>
                icon={AgeIcon}
                name="age"
                type="text"
                placeholder={'Âge'}
                register={register}
                error={errors.age}
            />

            <PasswordInput<FormInputs>
                icon={PasswordIcon}
                name="password"
                register={register}
                placeholder='Mot de passe'
                error={errors.password}
            />

            <PasswordInput<FormInputs>
                icon={PasswordIcon}
                name="confirmPassword"
                placeholder='Mot de passe'
                register={register}
                error={errors.confirmPassword}
            />
            <button className="submitBtn" type="submit">SIGN UP</button>
        </form>
    );
}