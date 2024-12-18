import React from "react";
import {useGroupActions} from "../../../hooks/useGroupActions.ts";
import {SvgHeart} from "../components/icons/SvgHeart.tsx";
import {SvgParams} from "../components/icons/SvgParams.tsx";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";

// @ts-ignore
import "../style/FooterMainPage.sass";

export const SelectedGroupControl: React.FC = () => {
    const {selectedGroup, userGroups} = useSelectedGroup();
    const {navigateToGroupSettings, navigateToLikePage} = useGroupActions();

    const groupName =
        selectedGroup.groupId === "me"
            ? "Moi"
            : userGroups.find((group) => group.groupId === selectedGroup.groupId)?.name || "Groupe inconnu";

    return (
        <>
            <span>{groupName}</span>
            <div className="iconsContainer">
                {selectedGroup.groupId !== "me" && (
                    <SvgHeart
                        className="groupSettingsIcon"
                        onClick={() => navigateToLikePage(selectedGroup)}
                    />
                )}
                <SvgParams
                    className="groupSettingsIcon"
                    onClick={() => navigateToGroupSettings(selectedGroup)}
                />
            </div>
        </>
    );
};
