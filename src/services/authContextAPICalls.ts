// src/api/authApi.ts
import axiosWithAuth from "../utils/axiosWithAuth.ts";
import axios from "axios";
import {API_BASE_URL} from "../utils/serverConstant.ts";
import {LoginFormInputs} from "../types/auth.ts";

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

export const APIverifyAccessToken = () =>
    axiosWithAuth.get("users/protected/verifyAccessToken");


