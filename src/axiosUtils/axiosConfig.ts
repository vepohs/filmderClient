// src/utils/axiosConfig.ts
import axios from "axios";

// Création d'une instance Axios pour la configuration
const axiosWithAuth = axios.create({
    baseURL: "http://localhost:3014/api",  // Point de départ pour tt les requêtes
    withCredentials: true  // Inclure les cookies, si nécessaire (pour le refresh token)
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
                // Appel au rafraîchissement du token (définir une fonction `refreshAccessToken` ici ou ailleurs)
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
        console.log("JE DEMANDE UN NEW ACCESS TOKEN");
        const response = await axios.post(
            'http://localhost:3014/api/auth/refreshToken',
            {},
            {withCredentials: true}  // Indique à Axios d’envoyer les cookies
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
