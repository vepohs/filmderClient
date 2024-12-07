// src/context/PreferenceContext.tsx
import React, {createContext, useContext, useEffect, useState} from "react";
import axiosWithAuth from "../axiosUtils/axiosConfig.ts";
import {useSelectedGroup} from "./SelectedGroupContext.tsx";
import {useNavigate} from "react-router-dom";

interface PreferenceContextType {
    hasPreferences: boolean | null;
    loading: boolean;
    allGenres: { id: number; name: string }[];
    allProviders: { id: number; name: string }[];
    selectedGenres: number[];
    selectedProviders: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
    setSelectedProviders: React.Dispatch<React.SetStateAction<number[]>>;
    submitPreferences: () => void;
}

interface PreferencesData {
    genrePreferenceIds: number[];
    providerPreferenceIds: number[];
    // rewatchPreference: boolean;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [hasPreferences, setHasPreferences] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [allGenres, setAllGenres] = useState<{ id: number; name: string }[]>([]);
    const [allProviders, setallProviders] = useState<{ id: number; name: string }[]>([]);

    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);

    const {selectedGroup} = useSelectedGroup();
    const navigate = useNavigate();

    const askForAllPreferences = async () => {
        try {
            const response = await axiosWithAuth.get("users/protected/getPreferences");
            const fetchedGenres = response.data.genrePreference.map((genre: { id: number; name: string }) => ({
                id: genre.id,
                name: genre.name,
            }));

            const fetchedProviders = response.data.providerPreference.map((provider: {
                id: number;
                name: string;
                logoPath: string;
            }) => ({
                id: provider.id,
                name: provider.name,
                logoPath: provider.logoPath,
            }));

            setAllGenres(fetchedGenres);
            setallProviders(fetchedProviders);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        askForAllPreferences();
    }, []);

    const requestPreferences = () => {
        if (selectedGroup === "me") {
            return axiosWithAuth.get("users/protected/getUserPreferences");
        } else {
            return axiosWithAuth.get(`group/protected/getGroupPreference`, {
                params: {groupId: selectedGroup},
            });
        }
    };

    const askForPreferences = async () => {
        console.log("askForPreferences");
        setLoading(true);

        try {

            const response = await requestPreferences()
            console.log("response", response);
            console.log(selectedGroup)
            const userGenrePreferences = response.data.genrePreference.map((genre: {
                id: number;
                name: string
            }) => genre.id);
            const userProviderPreferences = response.data.providerPreference.map((provider: {
                id: number;
                name: string
            }) => provider.id);
            setHasPreferences(userGenrePreferences.length > 0 && userProviderPreferences.length > 0);
            setSelectedGenres(userGenrePreferences);
            setSelectedProviders(userProviderPreferences);
        } catch (error) {
            console.error("Erreur lors de la récupération des préférences utilisateur:", error);
            alert("Impossible de récupérer les préférences utilisateur. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const submitPreferencesRequest = (data: PreferencesData) => {
        if (selectedGroup === "me") {
            return axiosWithAuth.post("users/protected/setPreferences", data);
        } else {
            const groupData = {
                ...data,
                groupId: selectedGroup,
            };
            return axiosWithAuth.post("group/protected/setGroupPreference", groupData);
        }
    };


    const submitPreferences = async () => {
        try {

            const data: PreferencesData = {
                genrePreferenceIds: selectedGenres,
                providerPreferenceIds: selectedProviders,
                // rewatchPreference: isRewatchChecked,
            };
            await submitPreferencesRequest(data);

            // Met correctement a jour les préferences
            askForPreferences();
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
