// src/context/PublicRoute.tsx
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../AuthContext.tsx';
import {useEffect} from "react";

const PublicRoute = () => {
    const {isAuthenticated, verifyToken, loading} = useAuth();

    useEffect(() => {
        verifyToken();
    }, []);

    // Evite le pb d'affichage quand on refresh la page ou qu'on est en train de parler a l'api
    if (loading || isAuthenticated === null) {
        return <div>Chargement...</div>;
    }

    return !isAuthenticated ? <Outlet/> : <Navigate to="/protected"/>;
};

export default PublicRoute;
