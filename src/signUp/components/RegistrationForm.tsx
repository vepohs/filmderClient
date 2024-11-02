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


function RegistrationForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>({
        resolver: yupResolver(registrationSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        console.log("click kaaris")
        const data4 = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            age: data.age, // Assurez-vous de fournir un nombre ici
            password: data.password,
            confirmPassword: data.confirmPassword,

        };

        const response = await axios.post('http://localhost:3013/api/users/createUser', data4);

        console.log('Réponse du serveur :', response.data);
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
