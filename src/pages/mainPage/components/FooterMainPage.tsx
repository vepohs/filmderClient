import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import {Params} from "./icons/Params.tsx";
import "../style/FooterMainPage.sass";
import {Heart} from "./icons/Heart.tsx";

export function FooterMainPage() {
    const navigate = useNavigate();
    const {selectedGroup, setSelectedGroup, userGroups, navigateToPreferences} = useSelectedGroup();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleGroupChange = (groupId: string) => {
        console.log("YOOOOOOO")
        console.log(groupId)
        setSelectedGroup(groupId);
        setIsDropdownOpen(false); // Ferme le menu déroulant après sélection
    };

    const navigateToGroupSettings = (groupId: string) => {
        setSelectedGroup(groupId);
        navigateToPreferences();
    };

    const navigateToLikePage = (groupId: string) => {
        setSelectedGroup(groupId);
        navigate("/protected/groupLike");
    }

    return (
        <div className="footerPrefer">
            <div className="customComboBox">
                <div className="selectedGroup" onClick={toggleDropdown}>
                    {selectedGroup === "me" ? "Moi" : userGroups.find((group) => group.groupId === selectedGroup)?.name}
                    <div>
                        {selectedGroup !== "me" && (
                            <Heart className="groupSettingsIcon"
                                   onClick={() => {
                                       navigateToLikePage(selectedGroup);
                                   }}
                            />
                        )}
                        <Params
                            className="groupSettingsIcon"
                            onClick={() => {
                                navigateToGroupSettings(selectedGroup);
                            }}
                        />
                        <span className="dropdownIcon">{isDropdownOpen ? "▲" : "▼"}</span>
                    </div>
                </div>
                {isDropdownOpen && (
                    <ul className="groupList">
                        {selectedGroup !== "me" && (<li
                                className={`groupItem ${selectedGroup === "me" ? "active" : ""}`}
                                onClick={() => handleGroupChange("me")}
                            >
                                Moi
                                <Params
                                    className="groupSettingsIcon"
                                    onClick={() => {

                                        navigateToGroupSettings("me");
                                    }}
                                />
                            </li>
                        )}
                        {userGroups
                            .filter((group) => group.groupId !== selectedGroup) // Exclut le groupe sélectionné
                            .map((group) => (
                                <li
                                    key={group.groupId}
                                    className={`groupItem ${selectedGroup === group.groupId ? "active" : ""}`}
                                    onClick={() => handleGroupChange(group.groupId)}
                                >
                                    <span className="groupName">{group.name}</span>
                                    <div className="iconsContainer">
                                        <Heart
                                            className="groupSettingsIcon"
                                            onClick={() => {
                                                navigateToLikePage(selectedGroup);
                                            }}
                                        />
                                        <Params
                                            className="groupSettingsIcon"
                                            onClick={() => {
                                                navigateToGroupSettings(group.groupId);
                                            }}
                                        />
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
