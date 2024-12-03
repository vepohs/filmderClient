
import "../style/HeaderMainPage.sass";
import MyLogo from "../../../common/icons/filmderIcon.tsx";
import {SvgLogout} from "./icons/SvgLogout.tsx";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";
import {API_BASE_URL} from "../../../config/constants.ts";

export function HeaderMainPage() {
    const logout = async () => {
        try {
            // Récupération du refreshToken depuis localStorage
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error("No refresh token available in localStorage");
            }

            // Appel de l'API pour rafraîchir le token
            const response = await axiosWithAuth.post(
                `${API_BASE_URL}/api/auth/refreshToken`,
                {}, // Corps de requête vide
                {
                    headers: {
                        'refreshtoken': refreshToken, // Ajout du refreshToken dans les headers
                    },
                }
            );

            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
              //todo : redirection vers la page de connexion
            } else {
                console.error("Failed to refresh token. Logging out...");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    return (
        <div className='headerPrefer'>
            <MyLogo/>
            <SvgLogout onClick={logout}></SvgLogout>
        </div>
    );
}