import axios from "axios";
import {FormInputs} from "../types/forms.ts";
import {API_BASE_URL} from "../utils/serverConstantss.ts";

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
