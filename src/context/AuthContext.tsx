// src/AuthContext.tsx
import React, {createContext, useState, useContext, useEffect} from 'react';
import authentificateRequestAxios from "../axiosUtils/axiosConfig.ts";
import axios from "axios";
import {LoginFormInputs} from "../types/formInputsTypes.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials : LoginFormInputs) => void;
    logout: () => void;
    verifyToken: () => Promise<void>;
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

    const verifyToken = async () => {
        try {
            setLoading(true);
            const response = await authentificateRequestAxios.get('/protected/test');
            if (response.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem('accessToken');

            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials : LoginFormInputs) => {
        //TODO peut etre faire la connextion dans AuthContext non ?
        const response = await axios.post('http://localhost:3014/api/auth/login', credentials);
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
        <AuthContext.Provider value={{ isAuthenticated, loading, verifyToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
