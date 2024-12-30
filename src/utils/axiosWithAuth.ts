import axios from "axios";
import {API_BASE_URL} from "./serverConstantss.ts";


const axiosWithAuth = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

axiosWithAuth.interceptors.request.use(
    async config => {
        let token = localStorage.getItem('accessToken');

        if (token) {
            const { exp } = decodeJwt(token);
            const nowInSeconds = Math.floor(Date.now() / 1000);
            const timeLeft = exp - nowInSeconds;
            console.log(timeLeft)
            if (timeLeft < 60) {
                console.log("Access token is about to expire, refreshing it...");
                const newAccessToken = await getNewAccessToken();
                localStorage.setItem('accessToken', newAccessToken);
                token = newAccessToken;
            }
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

function decodeJwt (token : string) {
    // Découpage du token en fonction du séparateur '.'
    // Un JWT (JSON Web Token) est composé de trois parties séparées par un point :
    // 1. Header (avant le premier '.')
    // 2. Payload (entre le premier et le deuxième '.')
    // 3. Signature (après le deuxième '.')
    // Le token.split('.')[1] récupère la deuxième partie du JWT, c’est-à-dire le payload encodé en Base64.
    const base64Url = token.split('.')[1];

    // Les tokens JWT utilisent un encodage Base64URL, qui est une variante du Base64 standard.
    // Dans le Base64URL, le caractère '-' remplace '+', et '_' remplace '/'
    // afin de rendre l’encodage sûr pour les URL (pas de caractères spéciaux de base64 classiques).
    // Ici, on remplace '-' par '+' et '_' par '/' pour rétablir le format standard Base64.
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    // window.atob() est une fonction du navigateur qui décode une chaîne en Base64 standard en texte brut.
    // On utilise ensuite JSON.parse() pour convertir cette chaîne de texte, qui contient un objet JSON
    // (le payload du JWT), en un objet JavaScript.
    return JSON.parse(window.atob(base64));
}

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
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh access token", error);
        throw error;
    }
};


export default axiosWithAuth;
