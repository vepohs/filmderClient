// src/context/PreferencesProtected.tsx
import {Navigate, Outlet} from "react-router-dom";
import {usePreferences} from "./PreferenceProvider";
import {useEffect} from "react";

const PreferencesProtected: React.FC = () => {
    const {hasPreferences, loading, getPreferences} = usePreferences();

    useEffect(() => {
        getPreferences();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return hasPreferences ? <Outlet/> : <Navigate to="/protected/preferences" replace/>;
};

export default PreferencesProtected;
