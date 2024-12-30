import {Navigate} from "react-router-dom";
import {usePreferences} from "../context/PreferenceContext.tsx";

const PreferencesGuard: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {hasPreferences, askPrefLoading} = usePreferences();

    if (askPrefLoading || hasPreferences === null) {
        return <div>Chargement...</div>;
    }

    return hasPreferences ? <>{children}</> : <Navigate to="/protected/preferences" replace/>;
};

export default PreferencesGuard;
