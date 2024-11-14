// src/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosWithAuth from "../axiosUtils/axiosConfig.ts";
import axios from "axios";
import {LoginFormInputs} from "../types/formInputsTypes.ts";

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

export const useAuth = () => {
    return useContext(AuthContext);
};

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
        const response = await axios.post('http://localhost:3017/api/auth/login', credentials);
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        // TODO Ca reste 7 jours a synchro avec server
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800`;
        console.log("Cookies après définition :", document.cookie);
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
