import React from "react";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx"; // Import du contexte
import {useGroupActions} from "./useGroupActions.ts";
import {Heart} from "../components/icons/Heart.tsx";
import {Params} from "../components/icons/Params.tsx";
// @ts-ignore
import "../style/FooterMainPage.sass";

export const SelectedGroupControl: React.FC = () => {
    const {selectedGroup, userGroups} = useSelectedGroup();
    const {navigateToGroupSettings, navigateToLikePage} = useGroupActions();


    const groupName =
        selectedGroup === "me"
            ? "Moi"
            : userGroups.find((group) => group.groupId === selectedGroup)?.name || "Groupe inconnu";

    return (
        <>
            <span>{groupName}</span>
            <div className="iconsContainer">
                {selectedGroup !== "me" && (
                    <Heart
                        className="groupSettingsIcon"
                        onClick={() => navigateToLikePage(selectedGroup)}
                    />
                )}
                <Params
                    className="groupSettingsIcon"
                    onClick={() => navigateToGroupSettings(selectedGroup)}
                />
            </div>
        </>
    );
};
