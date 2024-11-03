// src/components/forms/RegistrationF.tsx
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registrationSchema} from "../validation/registrationSchema.ts";
import PasswordInput from "./PasswordInput.tsx";
import FormInput from "./FormInput.tsx";
import {FormInputs} from "../types/formInputsType.ts";
import "../styles/registrationForm.sass";
import axios from "axios";
import MyLogo from "./filmder.tsx";

type IsUniqueEmailResponse = {
    isUnique: boolean;
};

function RegistrationForm() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<FormInputs>({
        resolver: yupResolver(registrationSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try{
            const mailResponse  = await axios.post<IsUniqueEmailResponse>('http://localhost:3013/api/users/isUniqueEmail', { email: data.email });
            const isUnique = mailResponse.data.isUnique;
            if (!isUnique) {
                setError('email', { message: 'Cet email est déjà utilisé' });
                return ;
            }

            const response = await axios.post('http://localhost:3013/api/users/createUser', data);
            console.log(response);

        } catch (error: unknown) {
            // TODO POUR L INSTANT Y A TOUJOURS UN POST EN ROUGE DANS LA CONSOLE C EST FAIT PAR LE NAVIGATEUR MAIS C EST POSSIBLE DE LE REMOVE
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    console.log("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
                } else if (error.response?.status === 401) {
                    setError('email', { message: 'Cet email est déjà utilisé' });
                } else if (error.response?.status === 500) {
                    alert("Problème serveur lors de la validation du formulaire. Veuillez réessayer.");
                } else {
                    console.log("Une erreur inatendu DANS AXIOSest survenue. Veuillez réessayer.");
                }
            } else {
                // Erreur inconnue - n'affiche rien dans la console pour éviter de divulguer des informations
                console.log("Une erreur inatenduuu est survenue.");
            }
        }
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
            <div className='title-container'><MyLogo></MyLogo>
                <h2>SIGN UP</h2>
            </div>

            <FormInput
                name="firstName"
                type="text"
                placeholder={'Prénom'}
                register={register}
                error={errors.firstName}
            />

            <FormInput
                name="lastName"
                type="text"
                register={register}
                placeholder={'Nom de famille'}
                error={errors.lastName}
            />

            <FormInput
                name="email"
                type="email"
                register={register}
                placeholder='Adresse email'
                error={errors.email}
            />
            <FormInput
                name="age"
                type="text"
                placeholder={'Âge'}
                register={register}
                error={errors.age}
            />

            <PasswordInput
                name="password"
                register={register}
                placeholder='Mot de passe'
                error={errors.password}
            />

            <PasswordInput
                name="confirmPassword"
                placeholder='Confirmer le mot de passe'
                register={register}
                error={errors.confirmPassword}
            />
            <button className="inscription" type="submit">SIGN UP</button>
            <div className='signin'><p className='signintxt1'>Already have a account?</p> <a className='signintxt'>sign
                in</a></div>
        </form>
    );
}

export default RegistrationForm;
