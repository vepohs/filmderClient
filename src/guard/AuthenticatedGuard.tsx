import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";

const AuthenticatedGuard = () => {
    const {isAuthenticated, loading} = useAuth();

// La vérif de la validiter du token ce fait dans le useEffect dans AuthContext

    // Evite le pb d'affichage quand on refresh la page ou qu'on est en train de parler a l'api
    if (loading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" replace/>
    );
};
export default AuthenticatedGuard;
