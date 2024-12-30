import React from "react";
import {useGroupNavigate} from "../../../hooks/useGroupNavigate.ts";
import {SvgHeart} from "../components/icons/SvgHeart.tsx";
import {SvgParams} from "../components/icons/SvgParams.tsx";

// @ts-ignore
import "../style/FooterMainPage.sass";

type GroupItemProps = {
    group: { groupId: string; name: string };
    isSelected: boolean;
    onClick: () => void;
};

export const DropDownMenuItem: React.FC<GroupItemProps> = ({group, isSelected, onClick}) => {

    const {navigateToGroupSettings, navigateToLikePage} = useGroupNavigate();

    return (
        <li className={`groupItem ${isSelected ? "active" : ""}`}
            onClick={onClick}>
            <span className="groupName">{group.name}</span>
            <div className="iconsContainer">
                <SvgHeart
                    className="groupSettingsIcon"
                    onClick={() => navigateToLikePage(group)}
                />
                <SvgParams
                    className="groupSettingsIcon"
                    onClick={() => navigateToGroupSettings(group)}
                />
            </div>
        </li>
    );
};
