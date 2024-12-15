// src/api/authApi.ts
import axiosWithAuth from "../Utils/axiosWithAuth.ts";
import axios from "axios";
import { LoginFormInputs } from "../types/formInputsTypes.ts";
import { API_BASE_URL } from "../Utils/ServerConstant.ts";

// Effectue le login et récupère les tokens
export const APIlogin = (credentials: LoginFormInputs) =>
    axios.post(`${API_BASE_URL}/api/auth/login`, credentials);

// Rafraîchit le token
// On le met dans le header car c'est convention dans le header on envoie infos relatives à l authentification

export const APILogout = (refreshToken: string) =>
    axiosWithAuth.post(
        `${API_BASE_URL}/api/auth/logout`,
        {}, // Corps de la requête vide
        {
            headers: {
                'refreshtoken': refreshToken,
            },
        }
    );

//TODO voir si je peux pas faire un .then avec response.x

export const APIverifyAccessToken = () =>
    axiosWithAuth.get("users/protected/verifyAccessToken");


