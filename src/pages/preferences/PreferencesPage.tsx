import React, {useEffect} from "react";
import GenresSelector from "./components/GenresSelector.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";


// @ts-ignore
import "./_PreferencesPage.sass"
import {usePreferences} from "../../context/PreferenceContext.tsx";


const PreferencesForm: React.FC = () => {

    const {submitPreferences, askForPreferences} = usePreferences();

    useEffect(() => {
        askForPreferences();
    }, []);

    return (
        <div className="PreferencesGlobal">

            <GenresSelector/>
            <hr/>

            <ProviderSelector/>
            <button onClick={submitPreferences} className="submitButton">
                Enregistrer les préférences
            </button>
        </div>
    );
};

export default PreferencesForm;
