import axios from "axios";
import {FormInputs} from "../types/forms.ts";
import {API_BASE_URL} from "../utils/serverConstant.ts";

export interface IsUniqueEmailResponse {
    isUnique: boolean;
}

export const APICheckUniqueEmail = (email: string): Promise<IsUniqueEmailResponse> => {
    return axios
        .get<IsUniqueEmailResponse>(`${API_BASE_URL}/api/users/isUniqueEmail`, { params: { email } })
        .then(response => response.data);
};

export const APICreateNewUser = (data: FormInputs) => {
    return axios.post(`${API_BASE_URL}/api/users/createUser`, data);
};
