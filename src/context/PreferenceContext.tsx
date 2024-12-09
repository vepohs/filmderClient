// src/context/PreferenceContext.tsx
import React, {createContext, useContext, useEffect, useState} from "react";
import {useSelectedGroup} from "./SelectedGroupContext.tsx";
import {useNavigate} from "react-router-dom";
import {PreferenceContextType, PreferencesData} from "../types/PreferencesType.ts";
import {fetchGroupPreferences, fetchUserPreferences, setGroupPreferences, setUserPreferences} from "./preferenceApi.ts";
import {Genre, Provider} from "../types/GenresAndProviders.ts";
import axiosWithAuth from "../axiosUtils/axiosConfig.ts";

export interface PreferencesResponse {
    genrePreference: Genre[];
    providerPreference: Provider[];
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [hasPreferences, setHasPreferences] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [allProviders, setallProviders] = useState<Provider[]>([]);

    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);

    const {selectedGroup} = useSelectedGroup();
    const navigate = useNavigate();

    const transformPreferencesToIds = (data: PreferencesResponse) => ({
        genres: data.genrePreference.map((genre: Genre) => genre.id),
        providers: data.providerPreference.map((provider: Provider) => provider.id),
    });

    const transformPreferencesToObjects = (data: PreferencesResponse) => ({
        genres: data.genrePreference.map((genre: Genre) => ({
            id: genre.id,
            name: genre.name,
        })),
        providers: data.providerPreference.map((provider: Provider) => ({
            id: provider.id,
            name: provider.name,
        })),
    });

    const askForAllPreferences = async () => {

        try {
            const response = await axiosWithAuth.get("users/protected/getPreferences");
            const {genres, providers} = transformPreferencesToObjects(response.data);
            setAllGenres(genres);
            setallProviders(providers);
        } catch (error) {
            console.error(error);
        }
    }


    const requestPreferences = () => {
        if (selectedGroup === "me") {
            return fetchUserPreferences();
        } else {
            return fetchGroupPreferences(selectedGroup);
        }
    };

    const askForPreferences = async () => {
        setLoading(true);
        try {
            const response = await requestPreferences()
            const {genres, providers} = transformPreferencesToIds(response.data);
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

    const submitPreferencesRequest = (data: PreferencesData) => {
        if (selectedGroup === "me") {
            return setUserPreferences(data);
        } else {
            return setGroupPreferences(selectedGroup, data);
        }
    }

    const submitPreferences = async () => {
        try {
            const data: PreferencesData = {
                genrePreferenceIds: selectedGenres,
                providerPreferenceIds: selectedProviders,
                // rewatchPreference: isRewatchChecked,
            };
            await submitPreferencesRequest(data);

            // Met correctement a jour les préferences
            await askForPreferences();
            alert("Préférences enregistrées avec succès !");
            navigate("/protected");
        } catch (error) {
            console.error("Erreur lors de l'envoi des préférences:", error);
            alert("Une erreur s'est produite lors de l'enregistrement des préférences.");
        }
    };

    // Verif que a chaque fois qu'un groupe est selectionné, ce groupe a des préférences
    // Si le groupe n'a pas de préférences, on redirige vers la page de préférences
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
