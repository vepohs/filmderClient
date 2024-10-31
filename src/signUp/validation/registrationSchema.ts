// src/validation/registrationSchema.ts
import * as yup from 'yup';

export const registrationSchema = yup.object({
    firstName: yup.string().required('Le prénom est requis'),
    lastName: yup.string().required('Le nom est requis'),
    email: yup.string().email('Email invalide').required("L'email est requis"),
    password: yup.string().min(6, 'Au moins 6 caractères').required('Le mot de passe est requis'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Les mots de passe ne correspondent pas')
        .required('Veuillez confirmer le mot de passe'),
}).required();
