import FormInput from "./FormInput.tsx";
import PasswordInput from "./PasswordInput.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {FormInputs} from "../types/formInputsType.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {registrationSchema} from "../validation/registrationSchema.ts";
import axios from "axios";
// @ts-ignore
import "../styles/SignUpForm.sass";
import {EmailIcon} from "./icons/EmailIcon.tsx";
import {NameIcon} from "./icons/NameIcon.tsx";
import {AgeIcon} from "./icons/AgeIcon.tsx";
import {PasswordIcon} from "./icons/PasswordIcon.tsx";

type IsUniqueEmailResponse = {
    isUnique: boolean;
};

export function SignUpForm() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<FormInputs>({
        resolver: yupResolver(registrationSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const mailResponse = await axios.post<IsUniqueEmailResponse>('http://localhost:3013/api/users/isUniqueEmail', {email: data.email});
            const isUnique = mailResponse.data.isUnique;
            if (!isUnique) {
                setError('email', {message: 'Cet email est déjà utilisé'});
                return;
            }

            const response = await axios.post('http://localhost:3013/api/users/createUser', data);
            console.log(response);

        } catch (error: unknown) {
            // TODO POUR L INSTANT Y A TOUJOURS UN POST EN ROUGE DANS LA CONSOLE C EST FAIT PAR LE NAVIGATEUR MAIS C EST POSSIBLE DE LE REMOVE
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    console.log("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
                } else if (error.response?.status === 409) {
                    setError('email', {message: 'Cet email est déjà utilisé'});
                } else if (error.response?.status === 500) {
                    alert("Problème serveur lors de la validation du formulaire. Veuillez réessayer.");
                } else {
                    console.log("Une erreur inatendu DANS AXIOSest survenue. Veuillez réessayer.");
                }
            } else {
                console.log("Une erreur inatenduuu est survenue.");
            }
        }
    };
    return (
        <form className="signUpForm" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                icon={NameIcon}
                name="firstName"
                type="text"
                placeholder={'Prénom'}
                register={register}
                error={errors.firstName}
            />
            <FormInput
                icon={NameIcon}
                name="lastName"
                type="text"
                register={register}
                placeholder={'Nom'}
                error={errors.lastName}
            />

            <FormInput
                icon={EmailIcon}
                name="email"
                type="email"
                register={register}
                placeholder='Adresse email'
                error={errors.email}
            />
            <FormInput
                icon={AgeIcon}
                name="age"
                type="text"
                placeholder={'Âge'}
                register={register}
                error={errors.age}
            />

            <PasswordInput
                icon={PasswordIcon}
                name="password"
                register={register}
                placeholder='Mot de passe'
                error={errors.password}
            />

            <PasswordInput
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