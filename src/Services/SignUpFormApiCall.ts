// src/Services/userService.ts
import axios from "axios";
import { API_BASE_URL } from "../Utils/ServerConstant.ts";
import { FormInputs } from "../types/formInputsTypes.ts";

export interface IsUniqueEmailResponse {
    isUnique: boolean;
}

// Vérifie si l'email est unique
export const checkUniqueEmail = (email: string): Promise<IsUniqueEmailResponse> => {
    return axios
        .get<IsUniqueEmailResponse>(`${API_BASE_URL}/api/users/isUniqueEmail`, { params: { email } })
        .then(response => response.data);
};

// Crée un nouvel utilisateur
export const createNewUser = (data: FormInputs) => {
    return axios.post(`${API_BASE_URL}/api/users/createUser`, data);
};
