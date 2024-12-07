// src/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosWithAuth from "../axiosUtils/axiosConfig.ts";
import axios from "axios";
import {LoginFormInputs} from "../types/formInputsTypes.ts";
import {API_BASE_URL} from "../config/constants.ts";
import {useNavigate} from "react-router-dom";

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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const verifyToken = async () => {
        try {
            setLoading(true);
            const response = await axiosWithAuth.get('users/protected/verifyAccessToken');
            if (response.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem('accessToken');
            setLoading(false);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: LoginFormInputs) => {
        // TODO : handle error et averir l'utilisateur
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
        const accesToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem('accessToken', accesToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    // Permet de vérifier a chaque fois qu'on change de page ou qu'on reload la page si le token est toujours valide
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