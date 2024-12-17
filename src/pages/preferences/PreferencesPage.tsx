import React, {useEffect} from "react";
import GenresSelector from "./components/GenresSelector.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";
import {usePreferences} from "../../context/PreferenceContext.tsx";

// @ts-ignore
import "./_PreferencesPage.sass"


const PreferencesForm: React.FC = () => {

    const {submitPreferences, askForPreferences} = usePreferences();

    useEffect(() => {
        askForPreferences();
    }, []);

    return (
        <div className="PreferencesGlobal">
            <h1>Genres</h1>
            <GenresSelector/>
            <hr/>

            <h1>Providers</h1>
            <ProviderSelector/>

            <button onClick={submitPreferences} className="submitButton">
                Enregistrer les préférences
            </button>
        </div>
    );
};

export default PreferencesForm;
