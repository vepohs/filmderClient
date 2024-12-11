// src/context/PreferenceContext.tsx
import React, {createContext, useContext, useEffect, useState} from "react";
import {useSelectedGroup} from "../SelectedGroupContext/SelectedGroupContext.tsx";
import {useNavigate} from "react-router-dom";
import {PreferenceContextType, PreferencesData} from "../../types/PreferencesType.ts";
import {getAllPreferencesAvailable, getPreferences, setPreferences} from "./preferenceApiCalls.ts";
import {Genre, Provider} from "../../types/GenresAndProviders.ts";
import {transformPreferencesToIds, transformPreferencesToObjects} from "./preferencesUtils.ts";


const PreferenceContext = createContext<PreferenceContextType>({
    hasPreferences: null,
    loading: false,
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
    const [loading, setLoading] = useState<boolean>(false);

    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [allProviders, setallProviders] = useState<Provider[]>([]);

    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);

    const {selectedGroup} = useSelectedGroup();
    const navigate = useNavigate();

    const askForAllPreferences = async () => {
        try {
            const response = await getAllPreferencesAvailable();
            const {genres, providers} = transformPreferencesToObjects(response.data);
            setAllGenres(genres);
            setallProviders(providers);
        } catch (error) {
            console.error(error);
        }
    }

    const askForPreferences = async () => {
        setLoading(true);
        try {
            const response = await getPreferences(selectedGroup.groupId);
            const {genres, providers} = transformPreferencesToIds(response);
            setHasPreferences(genres.length > 0 && providers.length > 0);
            setSelectedGenres(genres);
            setSelectedProviders(providers);
        } catch (error) {
            console.error("Erreur lors de la récupération des préférences utilisateur:", error);
            alert("Impossible de récupérer les préférences utilisateur. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const submitPreferences = async () => {
        try {

            const data: PreferencesData = {
                genrePreferenceIds: selectedGenres,
                providerPreferenceIds: selectedProviders,
                // rewatchPreference: isRewatchChecked,
            };
            await setPreferences(selectedGroup.groupId, data);
            // Met correctement a jour les préferences
            await askForPreferences();
            alert("Préférences enregistrées avec succès !");
            navigate("/protected");
        } catch (error) {
            console.error("Erreur lors de l'envoi des préférences:", error);
            alert("Une erreur s'est produite lors de l'enregistrement des préférences.");
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
            loading,
            allGenres,
            allProviders,
            selectedProviders,
            selectedGenres,
            setSelectedGenres,
            setSelectedProviders,
            submitPreferences,
            askForPreferences
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
