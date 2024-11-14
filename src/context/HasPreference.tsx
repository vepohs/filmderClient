// src/ProtectedRoute.tsx
import {Navigate, Outlet} from 'react-router-dom';
import {useEffect, useState} from "react";
import axiosWithAuth from "../axiosUtils/axiosConfig.ts";

const HasPreferenceRoute = () => {
    const [hasPreferences, setHasPreferences] = useState<boolean>(true);
    const getpp = async () => {
        const response = await axiosWithAuth.get("/users/protected/getUserPreferences")
        console.log("jsuis la ")
        console.log(response)
        if (Object.keys(response.data).length === 0){
            console.log("y a rien ")
            setHasPreferences(false);
            console.log("UIIIII" + hasPreferences)

        }
        console.log("ICIIIIIIIIIIIIIIII" + hasPreferences)
    }

    // const location = useLocation();
    // Verif a chaque fois que le user veut une page si il est bien autentifier
    useEffect(()  => {
        getpp()
    }, []);

    return hasPreferences ? <Outlet /> : <Navigate to="/protected/preferences" replace />;

};
export default HasPreferenceRoute;
