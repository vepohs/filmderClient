// src/validation/loginSchema.ts

import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string()
        .email('Email non valide')
        .required("L'email est requis"),
    password: yup.string()
        .required('Le mot de passe est requis'),
}).required();
