// src/utils/axiosWithAuth.ts
import axios from "axios";
import {API_BASE_URL} from "./serverConstant.ts";

// Création d'une instance Axios pour la configuration
const axiosWithAuth = axios.create({
    baseURL: `${API_BASE_URL}/api`,  // Point de départ pour tt les requêtes
});

// Interceptor de requête - pour ajouter le token à chaque requête sortante
axiosWithAuth.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor de réponse - pour rafraîchir le token en cas de 401
axiosWithAuth.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            try {
                // Appel au rafraîchissement du token
                const newAccessToken = await getNewAccessToken();
                localStorage.setItem('accessToken', newAccessToken);
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                // Relancer la requête initiale avec le nouveau token
                return axiosWithAuth(error.config);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// Function to get a new access token using the refresh token
const getNewAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error("No refresh token available in localStorage");
        }

        const response = await axios.post(
            `${API_BASE_URL}/api/auth/refreshToken`,
            {}, // Si le corps de la requête est vide, laissez un objet vide
            {
                headers: {
                    'refreshtoken': refreshToken, // Ajout du refreshToken dans les headers
                },
            }
        );

        const newAccessToken = response.data.accessToken;
        console.log("newAccessToken", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh access token", error);
        throw error;
    }
};


export default axiosWithAuth;
