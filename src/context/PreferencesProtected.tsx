import {Navigate} from "react-router-dom";
import {usePreferences} from "./PreferenceProvider";
import {useEffect} from "react";

const PreferencesProtected: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {hasPreferences, loading, getPreferences} = usePreferences();

    useEffect(() => {
        getPreferences();
    }, []);

    if (loading || hasPreferences === null) {
        return <div>Loading...</div>;
    }

    return hasPreferences ? <>{children}</> : <Navigate to="/protected/preferences" replace/>;
};

export default PreferencesProtected;