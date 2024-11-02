// src/validation/registrationSchema.ts
import * as yup from 'yup';
import axios from "axios";

type IsUniqueEmailResponse = {
    isUnique: boolean;
};


export const registrationSchema = yup.object({
    firstName: yup.string().required('Le prénom est requis').matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/, 'Le prénom ne doit pas contenir de chiffres'),
    lastName: yup.string().required('Le nom est requis').matches(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/, 'Le nom ne doit pas contenir de chiffres'),
    email: yup.string().matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Email non valide'
    ).required("L'email est requis")
        .test('unique-email', "Cet email est déjà utilisé", async (value) => {
        if (!value) return false;

        try {
            // Si serveur down ici c est la merde 
            const response  = await axios.post<IsUniqueEmailResponse>('http://localhost:3013/api/users/isUniqueEmail', { email: value });
            const isUnique = response.data.isUnique;
            return isUnique; // Assurez-vous que l'API renvoie `{ isUnique: true }` si l'email est unique
        } catch (error) {
            console.error("Erreur lors de la vérification de l'email :", error);
            return false; // Échoue la validation en cas d'erreur réseau
        }
    }),

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
