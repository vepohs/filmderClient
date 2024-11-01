// src/validation/registrationSchema.ts
import * as yup from 'yup';

export const registrationSchema = yup.object({
    firstName: yup.string().required('Le prénom est requis').matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/, 'Le prénom ne doit pas contenir de chiffres'),
    lastName: yup.string().required('Le nom est requis').matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/, 'Le nom ne doit pas contenir de chiffres'),
    email: yup.string().matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Veuillez entrer un email valide au format example@domaine.com'
    ).required("L'email est requis"),
    password: yup.string().min(8, 'Au moins 8 caractères \n et un chiffre').matches(/\d/, "Au moins 8 caractères \n et un chiffre").required('Le mot de passe est requis'),
    age: yup
        .number()
        .typeError("L'âge doit être un nombre") // To handle non-numeric input
        .max(100, "L'âge maximal est de 100 ans")
        .integer("l'âge doit etre un entier")
        .required("L'âge est requis"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Les mots de passe ne correspondent pas')
        .required('Veuillez confirmer le mot de passe'),

}).required();
