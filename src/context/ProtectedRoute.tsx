// src/ProtectedRoute.tsx
import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './AuthContext';
import {useEffect} from "react";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyToken } = useAuth() || {};

    // Verif a chaque fois que le user veut une page si il est bien autentifier
    useEffect(() => {
        verifyToken();
    }, []);

    // Evite le pb d'affichage quand on refresh la page ou qu'on est en train de parler a l'api
    if (loading || isAuthenticated === null) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

};
export default ProtectedRoute;
