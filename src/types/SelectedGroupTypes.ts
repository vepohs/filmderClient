import {Movie} from "./MovieAndProviders.ts";

export interface Group {
    groupId: string;
    name: string;
}

export interface SelectedGroupContextProps {
    selectedGroup: Group;
    setSelectedGroup: React.Dispatch<React.SetStateAction<Group>>;
    userGroups: Group[];
    loadUserGroups: () => Promise<void>; // Exposition de la fonction dans le contexte
    navigateToPreferences: () => void;
}

export interface MovieResponse {
    movies: Movie[];
}