/*

// src/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
*/

// src/ProtectedRoute.tsx
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { useAuth } from './AuthContext';
import {useEffect} from "react";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyToken } = useAuth() || {};

    const location = useLocation();

    // Verif a chaque fois que le user veut une page si il est bien autentifier
    useEffect(() => {
        console.log("yooooo")
        const token = localStorage.getItem('accessToken');
        if (token) {
            verifyToken(token);
        }
    }, [location.pathname]);
    
    
    if (loading) {
        // Vous pouvez afficher un indicateur de chargement ici
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

};

export default ProtectedRoute;
