// src/AuthContext.tsx
import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (token : string) => void;
    logout: () => void;
    verifyToken(): (token : string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyToken = async (token: string) => {
        try {
            // Envoyer une requête au backend pour vérifier le token
            const response = await axios.get('http://localhost:3014/api/protected/test', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("dans verifyToken, response :", response);
            // Si le token est valide, mettre à jour l'état
            if (response.status === 200) {
                setIsAuthenticated(true);
                localStorage.setItem('accessToken', token);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log(error);
            // En cas d'erreur, considérer que le token est invalide
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

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


    const login = (token : string) => {
        setIsAuthenticated(true);
        localStorage.setItem('accessToken', token);
    };

    useEffect(() => {
        console.log("isAuthenticated a changé :", isAuthenticated);
    }, [isAuthenticated]);
    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, verifyToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
