import React from "react";
import {useGroupActions} from "./useGroupActions.ts";
import {Heart} from "../components/icons/Heart.tsx";
import {Params} from "../components/icons/Params.tsx";

// @ts-ignore
import "../style/FooterMainPage.sass";

type GroupItemProps = {
    group: { groupId: string; name: string };
    isSelected: boolean;
    onClick: () => void;
};

export const GroupItem: React.FC<GroupItemProps> = ({group, isSelected, onClick}) => {
    const {navigateToGroupSettings, navigateToLikePage} = useGroupActions();

    return (
        <li className={`groupItem ${isSelected ? "active" : ""}`}
            onClick={onClick}>
            <span className="groupName">{group.name}</span>
            <div className="iconsContainer">
                <Heart
                    className="groupSettingsIcon"
                    onClick={() => navigateToLikePage(group)}
                />
                <Params
                    className="groupSettingsIcon"
                    onClick={() => navigateToGroupSettings(group)}
                />
            </div>
        </li>
    );
};
