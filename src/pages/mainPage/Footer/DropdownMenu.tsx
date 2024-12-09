import React from "react";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import {GroupItem} from "./GroupItem.tsx";
// @ts-ignore
import "../style/FooterMainPage.sass";
import {Params} from "../components/icons/Params.tsx";
import {useGroupActions} from "./useGroupActions.ts";

type DropdownMenuProps = {
    onGroupChange: (groupId: string) => void; // Nouvelle prop pour gérer le changement de groupe
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({onGroupChange}) => {
    const {userGroups, selectedGroup} = useSelectedGroup();
    const {navigateToGroupSettings} = useGroupActions();
    const filteredGroups = userGroups.filter((group) => group.groupId !== selectedGroup);


    return (
        <ul className="groupList">

            {selectedGroup !== "me" && (
                <li
                    className="groupItem"
                    onClick={() => onGroupChange("me")} // Sélectionner "me" lors du clic
                >
                    <span className="groupName">Moi</span>

                    <Params
                        className="groupSettingsIcon"
                        onClick={() => navigateToGroupSettings("me")}
                    />
                </li>
            )}

            {filteredGroups.map((group) => (
                <GroupItem
                    key={group.groupId}
                    group={group}
                    isSelected={false}
                    onClick={() => onGroupChange(group.groupId)}
                />
            ))}
        </ul>
    );
};
