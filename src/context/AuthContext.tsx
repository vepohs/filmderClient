// src/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';

import {LoginFormInputs} from "../types/formInputsTypes.ts";
import {useNavigate} from "react-router-dom";
import {APIlogin, APILogout, APIverifyAccessToken} from "../Services/AuthContextAPICalls.ts";
import {clearLocalStorage, extractUserInfo, getRefreshToken, setLocalStorage} from "../Utils/AuthContextUtils.ts";
import {LoginResponse} from "../types/AuthContext.ts";

interface AuthContextType {
    isAuthenticated: boolean | null;
    loading: boolean;
    login: (credentials: LoginFormInputs) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    loading: false,
    login: () => {
    },
    logout: () => {
    },
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const verifyToken = async () => {
        try {
            setLoading(true);
            const response = await APIverifyAccessToken()
            if (response.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Error during token verification:", error);
            clearLocalStorage();
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: LoginFormInputs) => {
        // TODO : handle error et averir l'utilisateur
        const response : LoginResponse = await APIlogin(credentials);
        const {accessToken, refreshToken, defaultGroup} = extractUserInfo(response);
        setLocalStorage(accessToken, refreshToken, defaultGroup);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {

            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                throw new Error("No refresh token available in localStorage");
            }

            await APILogout(refreshToken);
            /* Pas de vérif a faire si le deleteRefreshToken a réussi
            Car meme si y a un pb coté serveur on veut quand meme déconnecter l'utilisateur */
            clearLocalStorage();
            setIsAuthenticated(false)
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };


/*
Verifie si le token est valide quand on arrive sur la page ou des qu'on reload la page
Si on met pas, quand on reload la page bha ca ne redemande pas l'état du token et donc
meme si on est connecté bha on est redirigé vers la page de login car quand on recharge la page
isAuthenticated est false de base
 */
    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within a AuthProvider');
    return context;
};