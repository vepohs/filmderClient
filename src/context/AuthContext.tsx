// src/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosWithAuth from "../axiosUtils/axiosConfig.ts";
import axios from "axios";
import {LoginFormInputs} from "../types/formInputsTypes.ts";
import {API_BASE_URL} from "../config/constants.ts";

interface AuthContextType {
    isAuthenticated: boolean | null;
    loading: boolean;
    login: (credentials: LoginFormInputs) => void;
    logout: () => void;
    verifyToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    loading: false,
    login: () => {
    },
    logout: () => {
    },
    verifyToken: async () => {
    },
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

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
        //TODO peut etre faire la connextion dans AuthContext non ?
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
        console.log("QUIJESUISLA");
        console.log(response)
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        // TODO Ca reste 7 jours a synchro avec server
//        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800`;
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
        <AuthContext.Provider value={{isAuthenticated, loading, verifyToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};