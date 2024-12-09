import React, {useEffect, useState} from "react";
import GenresSelector from "./components/GenresSelector.tsx";
import ReWatchCheckBox from "./components/ReWatchCheckBox.tsx";
import ProviderSelector from "./components/ProvidersSelector.tsx";


// @ts-ignore
import "./_PreferencesPage.sass"
import {usePreferences} from "../../context/preferencesContext/PreferenceContext.tsx";


const PreferencesForm: React.FC = () => {


    const [isRewatchChecked, setIsRewatchChecked] = useState<boolean>(false);

    const {submitPreferences, askForPreferences} = usePreferences();

    useEffect(() => {
        askForPreferences();
    }, []);

    return (
        <div className="PreferencesGlobal">
            <h1>Genres</h1>
            <GenresSelector/>
            <hr/>


            <h1>Rewatch</h1>
            <ReWatchCheckBox
                label="Rewatch"
                isChecked={isRewatchChecked}
                setIsChecked={setIsRewatchChecked}
            />
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
