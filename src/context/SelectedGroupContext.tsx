// src/context/SelectedGroupContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosWithAuth from "../axiosUtils/axiosConfig";

interface Group {
    groupId: string;
    name: string;
}

interface SelectedGroupContextProps {
    selectedGroup: string;
    setSelectedGroup: (groupId: string) => void;
    userGroups: Group[];
    getGroupsForUser: () => Promise<void>; // Exposition de la fonction dans le contexte

}

export const SelectedGroupContext = createContext<SelectedGroupContextProps | undefined>(undefined);

export const SelectedGroupProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [selectedGroup, setSelectedGroup] = useState<string>("me");
    const [userGroups, setUserGroups] = useState<Group[]>([]);

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

    return (
        <SelectedGroupContext.Provider value={{selectedGroup, setSelectedGroup, userGroups, getGroupsForUser}}>
            {children}
        </SelectedGroupContext.Provider>
    );
};

export const useSelectedGroup = () => {
    return useContext(SelectedGroupContext);
}