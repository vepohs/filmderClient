import {Navigate} from "react-router-dom";
import {usePreferences} from "../PreferenceContext.tsx";
import {useEffect} from "react";

const PreferencesProtected: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {hasPreferences, loading, getPreferences} = usePreferences();

    useEffect(() => {
        getPreferences();
    }, [hasPreferences]);

    if (loading || hasPreferences === null) {
        return <div>Loading...</div>;
    }

    return hasPreferences ? <>{children}</> : <Navigate to="/protected/preferences" replace/>;
};

export default PreferencesProtected;