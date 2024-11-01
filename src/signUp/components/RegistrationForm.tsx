// src/components/forms/RegistrationF.tsx
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registrationSchema} from "../validation/registrationSchema.ts";
import PasswordInput from "./PasswordInput.tsx";
import FormInput from "./FormInput.tsx";
import {FormInputs} from "../types/formInputsType.ts";


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
                label="Prénom"
                name="firstName"
                type="text"
                register={register}
                error={errors.firstName}
            />

            <FormInput
                label="Nom"
                name="lastName"
                type="text"
                register={register}
                error={errors.lastName}
            />

            <FormInput
                label="Email"
                name="email"
                type="email"
                register={register}
                error={errors.email}
            />
            <FormInput
                label="Age"
                name="age"
                type="text"
                register={register}
                error={errors.age}
            />

            <PasswordInput
                label="Mot de passe"
                name="password"
                register={register}
                error={errors.password}
            />

            <PasswordInput
                label="Confirmer le mot de passe"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
            />

            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default RegistrationForm;
