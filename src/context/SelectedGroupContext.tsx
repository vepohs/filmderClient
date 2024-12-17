// src/context/SelectedGroupContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Group,SelectedGroupContextProps} from "../types/SelectedGroupTypes.ts";
import {APIgetUserGroups} from "../Services/selectedGroupApiCall.ts";


export const SelectedGroupContext = createContext<SelectedGroupContextProps | undefined>(undefined);

export const SelectedGroupProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [selectedGroup, setSelectedGroup] = useState<Group>(() => {
        const storedGroup = localStorage.getItem("selectedGroup");
        console.log("Stored group", storedGroup);
        return storedGroup ? JSON.parse(storedGroup) : {groupId: "me", name: "Moi"};
        //return {groupId: "me", name: "Moi"}; // Valeur par défaut

    });

    const [userGroups, setUserGroups] = useState<Group[]>([]);
    const navigate = useNavigate();

    const navigateToPreferences = () => {
        navigate("/protected/preferences");
    }

    useEffect(() => {
        localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    }, [selectedGroup]);

    useEffect(() => {
        loadUserGroups();
    }, []);

    async function loadUserGroups(): Promise<void> {
        try {
            const response = await APIgetUserGroups();
            setUserGroups(response.group);

            if (selectedGroup.groupId !== "me" &&
                !response.group.find((group: Group) => group.groupId === selectedGroup.groupId)
            ) {
                console.log(selectedGroup.groupId)
                console.log("Resetting selected group");
                setSelectedGroup({groupId: "me", name: "Moi"});
            }

        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    }


    return (
        <SelectedGroupContext.Provider
            value={{
                selectedGroup,
                setSelectedGroup,
                userGroups,
                loadUserGroups,
                navigateToPreferences,
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