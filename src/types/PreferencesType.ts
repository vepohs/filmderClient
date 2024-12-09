import React from "react";
import {Genre, Provider} from "./GenresAndProviders.ts";

export interface PreferenceContextType {
    hasPreferences: boolean | null;
    loading: boolean;
    allGenres: Genre[];
    allProviders: Provider[];
    selectedGenres: number[];
    selectedProviders: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
    setSelectedProviders: React.Dispatch<React.SetStateAction<number[]>>;
    submitPreferences: () => void;
    askForPreferences: () => void;
}

export interface PreferencesData {
    genrePreferenceIds: number[];
    providerPreferenceIds: number[];
    // rewatchPreference: boolean;
}
