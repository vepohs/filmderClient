// src/context/PreferenceProvider.tsx
import React, {createContext, useContext, useEffect, useState} from "react";
import axiosWithAuth from "../axiosUtils/axiosConfig.ts";

interface PreferenceContextType {
    hasPreferences: boolean;
    loading: boolean;
    getPreferences: () => void;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [hasPreferences, setHasPreferences] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getPreferences = async () => {
        setLoading(true);
        try {
            const response = await axiosWithAuth.get("/users/protected/getUserPreferences");
            console.log("ZIZIZIZIZIZI")
            console.log(response.data)
            console.log(response.data.genrePreference.length === 0)
            console.log(response.data.providerPreference.length === 0)
            console.log(response.data.genrePreference.length > 0 && response.data.providerPreference.length > 0)
            console.log("iciiiiii")
            setHasPreferences(response.data.genrePreference.length > 0 && response.data.providerPreference.length > 0);

        } catch (error) {
            console.error("Erreur lors de la récupération des préférences:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPreferences();
    }, []);

    return (
        <PreferenceContext.Provider value={{hasPreferences, loading, getPreferences}}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreferences = () => {
    return useContext(PreferenceContext);

};
