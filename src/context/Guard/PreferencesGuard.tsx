import {Navigate} from "react-router-dom";
import {usePreferences} from "../PreferenceContext.tsx";

const PreferencesGuard: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {hasPreferences, loading} = usePreferences();

    if (loading || hasPreferences === null) {
        return <div>Loading...</div>;
    }

    return hasPreferences ? <>{children}</> : <Navigate to="/protected/preferences" replace/>;
};

export default PreferencesGuard;
