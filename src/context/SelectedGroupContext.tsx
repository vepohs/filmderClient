// src/context/SelectedGroupContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosWithAuth from "../axiosUtils/axiosConfig";
import {useNavigate} from "react-router-dom";

interface Group {
    groupId: string;
    name: string;
}

interface SelectedGroupContextProps {
    selectedGroup: string;
    setSelectedGroup: (groupId: string) => void;
    userGroups: Group[];
    getGroupsForUser: () => Promise<void>; // Exposition de la fonction dans le contexte
    navigateToPreferences: () => void;
    fetchMoviesForGroup: (excludedIds: number[]) => Promise<Movie[]>;

}

interface MovieResponse {
    movies: Movie[];
}

interface Movie {
    // TODO je sais pas trop le type qu'on doit mettre
    providers: Provider[];
    synopsis: string;
    averageGrade: number;
    duration: number;
    id: number;
    imagePath: string;
    releaseDate: string;
    title?: string;
    votes: number;
}

interface Provider {
    id: number;
    name: string;
    logoPath: string;
}

export const SelectedGroupContext = createContext<SelectedGroupContextProps | undefined>(undefined);

export const SelectedGroupProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [selectedGroup, setSelectedGroup] = useState<string>("me");
    const [userGroups, setUserGroups] = useState<Group[]>([]);
    const navigate = useNavigate();

    // Persistance, quand on reload la page, on garde le groupe sélectionné
    useEffect(() => {
        const storedGroup = localStorage.getItem("selectedGroup");
        if (storedGroup) {
            setSelectedGroup(storedGroup);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedGroup", selectedGroup);
    }, [selectedGroup]);

    useEffect(() => {
        getGroupsForUser();
    }, []);

    async function getGroupsForUser(): Promise<void> {
        try {
            const response = await axiosWithAuth.get("/users/protected/getGroup");
            console.log(response)
            setUserGroups(response.data.group);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    }

    const navigateToPreferences = () => {
        navigate(selectedGroup === "me" ? "/protected/preferences" : `/protected/groupPreferences/${selectedGroup}`);
    }


    // Logique pour récupérer les films en fonction du groupe sélectionné
    const fetchMoviesForGroup = async (excludedIds: number[]): Promise<Movie[]> => {
        const endpoint =
            selectedGroup === "me"
                ? "movie/protected/getMovie"
                : "movie/protected/getGroupMovie";
        const payload =
            selectedGroup === "me"
                ? {listExcluedIds: excludedIds}
                : {listExcluedIds: excludedIds, groupId: selectedGroup};

        try {
            const response = await axiosWithAuth.post<MovieResponse>(endpoint, payload);
            return response.data.movies || [];
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    };
    return (
        <SelectedGroupContext.Provider
            value={{
                selectedGroup,
                setSelectedGroup,
                userGroups,
                getGroupsForUser,
                navigateToPreferences,
                fetchMoviesForGroup
            }}>
            {children}
        </SelectedGroupContext.Provider>
    );
};

export const useSelectedGroup = () => {
    const context = useContext(SelectedGroupContext);
    if (!context) {
        throw new Error("MiddleMainPage must be used within a SelectedGroupProvider");
    }
    return context;
}