import React from "react";
import {DropDownMenuItem} from "./DropDownMenuItem.tsx";
import {SvgParams} from "../components/icons/SvgParams.tsx";
import {useGroupNavigate} from "../../../hooks/useGroupNavigate.ts";
import {Group} from "../../../types/group.ts";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";

// @ts-ignore
import "../style/FooterMainPage.sass";


type DropdownMenuProps = {
    onGroupChange: (group: Group) => void; // Accepte maintenant un objet de type Group
};


export const DropdownMenu: React.FC<DropdownMenuProps> = ({onGroupChange}) => {

    const {userGroups, selectedGroup} = useSelectedGroup();
    const {navigateToGroupSettings} = useGroupNavigate();
    const filteredGroups = userGroups.filter((group) => group.groupId !== selectedGroup.groupId);

    return (
        <ul className="groupList">

            {selectedGroup.groupId !== "me" && (
                <li
                    className="groupItem"
                    onClick={() => onGroupChange({groupId: "me", name: "Moi"})}
                >
                    <span className="groupName">Moi</span>

                    <SvgParams
                        className="groupSettingsIcon"
                        onClick={() => navigateToGroupSettings({groupId: "me", name: "Moi"})}
                    />
                </li>
            )}

            {
                filteredGroups.map((group) => (
                    <DropDownMenuItem
                        key={group.groupId}
                        group={group}
                        isSelected={false}
                        onClick={() => onGroupChange(group)}
                    />
                ))}
        </ul>
    );
};
