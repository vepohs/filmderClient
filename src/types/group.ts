import React from "react";

export interface Group {
    groupId: string;
    name: string;
}

export interface SelectedGroupContextProps {
    selectedGroup: Group;
    setSelectedGroup: React.Dispatch<React.SetStateAction<Group>>;
    userGroups: Group[];
    loadUserGroups: () => Promise<void>;
    navigateToPreferences: () => void;
}

export interface GroupHeaderProps {
    selectedGroup: Group;
}
