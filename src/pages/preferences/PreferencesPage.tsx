import React, {useEffect} from "react";
import GenresSelector from "./components/GenresSelector.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";
import {usePreferences} from "../../context/PreferenceContext.tsx";

// @ts-ignore
import "./PreferencesPage.sass"
import {CustomToastContainer} from "../../common/components/CustomToastContainer.tsx";



const PreferencesForm: React.FC = () => {

    const {submitPreferences, askForPreferences} = usePreferences();

    useEffect(() => {
        askForPreferences();
    }, []);

    return (
        <div className="PreferencesGlobal">

            <GenresSelector/>


            <ProviderSelector/>
            <button onClick={submitPreferences} className="submitButton">
                Enregistrer les préférences
            </button>
            <CustomToastContainer/>
        </div>
    );
};

export default PreferencesForm;
