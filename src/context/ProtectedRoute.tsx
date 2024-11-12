// src/ProtectedRoute.tsx
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { useAuth } from './AuthContext';
import {useEffect} from "react";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyToken } = useAuth() || {};

    const location = useLocation();
    // Verif a chaque fois que le user veut une page si il est bien autentifier
    useEffect(() => {
        verifyToken();
    }, [location.pathname]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

};
export default ProtectedRoute;
