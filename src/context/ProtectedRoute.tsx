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
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyToken } = useAuth() || {};
    const accesToken = localStorage.getItem("accessToken") || "";
    if(accesToken !== undefined){
        // @ts-ignore
        verifyToken(accesToken)
    }


    if (loading) {
        // Vous pouvez afficher un indicateur de chargement ici
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

};

export default ProtectedRoute;
