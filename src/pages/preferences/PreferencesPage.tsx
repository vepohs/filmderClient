import React, {useEffect} from "react";
import GenresSelector from "./components/GenresSelector.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";
import {usePreferences} from "../../context/PreferenceContext.tsx";
import {CustomToastContainer} from "../../common/components/CustomToastContainer.tsx";

// @ts-ignore
import "./PreferencesPage.sass"



const PreferencesForm: React.FC = () => {

    const {submitPreferences, askForPreferences, submitPrefLoading} = usePreferences();

    useEffect(() => {
        askForPreferences();
    }, []);

    return (
        <div className="PreferencesGlobal">
            <GenresSelector/>
            <ProviderSelector/>
            <button id="submitButton" onClick={submitPreferences} className="submitButton" disabled={submitPrefLoading}>
                Enregistrer les préférences
            </button>
            <CustomToastContainer/>
        </div>
    );
};

export default PreferencesForm;
