// src/AuthContext.tsx
import React, {createContext, useState, useContext, useEffect} from 'react';
import authentificateRequestAxios from "../axiosUtils/axiosConfig.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (token : string) => void;
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
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('accessToken');
            }
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

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
