import React, {createContext, useContext, useEffect, useState} from "react";
import {useSelectedGroup} from "./SelectedGroupContext.tsx";
import {useNavigate} from "react-router-dom";
import {PreferenceContextType, PreferencesData} from "../types/preferences.ts";
import {Genre, Provider} from "../types/genreAndProvider.ts";
import {transformPreferencesToIds, transformPreferencesToObjects} from "../utils/preferencesUtils.ts";
import {getAllPreferencesAvailable, getPreferences, setPreferences} from "../services/preferenceApiCalls.ts";
import {handleErrorToast, handleSuccessToast} from "../utils/toastUtils.ts";

const PreferenceContext = createContext<PreferenceContextType>({
    hasPreferences: null,
    askPrefLoading: false,
    submitPrefLoading: false,
    allGenres: [],
    allProviders: [],
    selectedGenres: [],
    selectedProviders: [],
    setSelectedGenres: () => {
    },
    setSelectedProviders: () => {
    },
    submitPreferences: () => {
    },
    askForPreferences: () => {
    },
});

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [hasPreferences, setHasPreferences] = useState<boolean | null>(null);
    const [askPrefLoading, setAskPrefLoading] = useState<boolean>(false);
    const [submitPrefLoading, setSubmitPrefLoading] = useState<boolean>(false);

    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [allProviders, setAllProviders] = useState<Provider[]>([]);

    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);

    const {selectedGroup} = useSelectedGroup();
    const navigate = useNavigate();

    const askForAllPreferences = async () => {
        try {
            const response = await getAllPreferencesAvailable();
            const {genres, providers} = transformPreferencesToObjects(response.data);
            setAllGenres(genres);
            setAllProviders(providers);
        } catch (error) {
            console.error(error);
        }
    }

    const askForPreferences = async () => {
        setAskPrefLoading(true);
        try {
            const response = await getPreferences(selectedGroup.groupId);
            const {genres, providers} = transformPreferencesToIds(response);
            setHasPreferences(genres.length > 0 && providers.length > 0);
            setSelectedGenres(genres);
            setSelectedProviders(providers);
        } catch (error) {
            console.error("Erreur lors de la récupération des préférences utilisateur:", error);
            handleErrorToast("Impossible de récupérer les préférences utilisateur. Veuillez réessayer.");
        } finally {
            setAskPrefLoading(false);
        }
    };

    const submitPreferences = async () => {
        if (selectedGenres.length === 0 || selectedProviders.length === 0) {
            handleErrorToast("Veuillez sélectionner au moins un genre et un fournisseur.");
            return;
        }
        try {
            setSubmitPrefLoading(true);
            const data: PreferencesData = {
                genrePreferenceIds: selectedGenres,
                providerPreferenceIds: selectedProviders,
            };
            await setPreferences(selectedGroup.groupId, data);
            // Met correctement a jour les préferences
            await askForPreferences();
            handleSuccessToast("Préférences enregistrées avec succès ! Redirection en cours...");
            setTimeout(() => {
                navigate("/protected");
            }, 1500);
        } catch (error) {
            handleErrorToast("Erreur lors de l'enregistrement des préférences.");
        }finally {
            setSubmitPrefLoading(false);
        }
    };


    /*
    Verif que a chaque fois qu'un groupe est selectionné, ce groupe a des préférences
    Comme ca, si le groupe n'a pas de préférences, on redirige vers la page de préférences
     */
    useEffect(() => {
        askForPreferences();
    }, [selectedGroup]);

    useEffect(() => {
        askForAllPreferences();
    }, []);

    return (
        <PreferenceContext.Provider value={{
            hasPreferences,
            askPrefLoading,
            submitPrefLoading,
            allGenres,
            allProviders,
            selectedProviders,
            selectedGenres,
            setSelectedGenres,
            setSelectedProviders,
            submitPreferences,
            askForPreferences,

        }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreferences = () => {
    const context = useContext(PreferenceContext);
    if (!context)
        throw new Error("usePreferences must be used within a PreferenceProvider");
    return context;

};
