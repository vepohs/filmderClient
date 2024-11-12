// src/AuthContext.tsx
import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (token : string) => void;
    logout: () => void;
    verifyToken: (token: string) => Promise<void>; // Signature correcte pour verifyToken
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    loading: true,
    login: () => {},
    logout: () => {},
    verifyToken: async () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyToken = async (token: string) => {
        try {
            setLoading(true);
            // Envoyer une requête au backend pour vérifier le token
            const response = await axios.get('http://localhost:3014/api/protected/test', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Si le token est valide, mettre à jour l'état
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('accessToken');

            }
        } catch (error) {
            console.log(error);
            // En cas d'erreur, considérer que le token est invalide
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }

        const newAccessToken = await getNewAccessToken();
        console.log("newAccessToken");
        console.log(newAccessToken);
    };


    // Function to get a new access token using the refresh token
    const getNewAccessToken = async () => {
        try {
            console.log("JE DEMANDE UN NEW ACCESS TOKEN");
            const response = await axios.post(
                'http://localhost:3014/api/auth/refreshToken',
                {},
                { withCredentials: true }  // Indique à Axios d’envoyer les cookies
            );
            const newAccessToken = response.data.accessToken;
            return newAccessToken;
        } catch (error) {
            console.error("Failed to refresh access token", error);
            throw error;
        }
    };
/*
    useEffect(() => {
        const verify = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                await verifyToken(token);
            } else {
                setLoading(false);
            }
        };
        verify();
    }, []);

*/

    const login = (token : string) => {
        setIsAuthenticated(true);
        localStorage.setItem('accessToken', token);
    };

    useEffect(() => {
        console.log("isAuthenticated a changé :", isAuthenticated);
    }, [isAuthenticated]);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, verifyToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
