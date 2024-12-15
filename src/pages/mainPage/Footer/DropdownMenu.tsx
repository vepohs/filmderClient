import React from "react";
import {useSelectedGroup} from "../../../context/SelectedGroupContext/SelectedGroupContext.tsx";
import {GroupItem} from "./GroupItem.tsx";
// @ts-ignore
import "../style/FooterMainPage.sass";
import {Params} from "../components/icons/Params.tsx";
import {useGroupActions} from "../../../hooks/useGroupActions.ts";
import {Group} from "../../../types/SelectedGroupTypes.ts";

type DropdownMenuProps = {
    onGroupChange: (group: Group) => void; // Accepte maintenant un objet de type Group
};


export const DropdownMenu: React.FC<DropdownMenuProps> = ({onGroupChange}) => {
    const {userGroups, selectedGroup} = useSelectedGroup();
    const {navigateToGroupSettings} = useGroupActions();
    const filteredGroups = userGroups.filter((group) => group.groupId !== selectedGroup.groupId);


    return (
        <ul className="groupList">

            {selectedGroup.groupId !== "me" && (
                <li
                    className="groupItem"
                    onClick={() => onGroupChange({groupId: "me", name: "Moi"})} // Sélectionner "me" lors du clic
                >
                    <span className="groupName">Moi</span>

                    <Params
                        className="groupSettingsIcon"
                        onClick={() => navigateToGroupSettings({groupId: "me", name: "Moi"})}
                    />
                </li>
            )}

            {
                filteredGroups.map((group) => (
                    <GroupItem
                        key={group.groupId}
                        group={group}
                        isSelected={false}
                        onClick={() => onGroupChange(group)}
                    />
                ))}
        </ul>
    );
};
