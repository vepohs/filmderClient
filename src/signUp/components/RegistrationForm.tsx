// src/components/forms/RegistrationF.tsx
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registrationSchema} from "../validation/registrationSchema.ts";
import PasswordInput from "./PasswordInput.tsx";
import FormInput from "./FormInput.tsx";
import {FormInputs} from "../types/formInputsType.ts";
import "../styles/registrationForm.sass";

function RegistrationForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>({
        resolver: yupResolver(registrationSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log('Données du formulaire :', data);
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Inscription</h2>

            <FormInput
                name="firstName"
                type="text"
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
                register={register}
                error={errors.confirmPassword}
            />

            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default RegistrationForm;
