import React, {useState} from "react";

// @ts-ignore
import "../style/FooterMainPage.sass";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import {DropdownMenu} from "./DropdownMenu.tsx";
import {SelectedGroupControl} from "./SlectedGroupControl.tsx";

export function FooterMainPage() {
    const {setSelectedGroup} = useSelectedGroup();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleGroupChange = (groupId: string) => {
        setSelectedGroup(groupId);
        setIsDropdownOpen(false); // Ferme le menu déroulant après sélection
    };

    return (
        <div className="footerPrefer">
            <div className="customComboBox">
                <div className="selectedGroup" onClick={toggleDropdown}>
                    <SelectedGroupControl/>
                    <span className="dropdownIcon">{isDropdownOpen ? "▲" : "▼"}</span>
                </div>
                {isDropdownOpen && <DropdownMenu onGroupChange={handleGroupChange}/>}
            </div>
        </div>
    );
}
