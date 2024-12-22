import {useState} from "react";
import {DropdownMenu} from "./DropdownMenu.tsx";
import {SelectedGroup} from "./SelectedGroup.tsx";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import {Group} from "../../../types/group.ts";
import GroupActions from "./GroupActions.tsx";

// @ts-ignore
import "../style/FooterMainPage.sass";

export function FooterMainPage() {
    const {setSelectedGroup} = useSelectedGroup();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleGroupChange = (groupId: Group) => {
        setSelectedGroup(groupId);
        setIsDropdownOpen(false);
    };

    return (
        <div className="footerPrefer">
            <div className ="navFooter">
            <div className="customComboBox">
                <div className="selectedGroup" onClick={toggleDropdown}>
                    <SelectedGroup/>
                    <span className="dropdownIcon">{isDropdownOpen ? "▲" : "▼"}</span>
                </div>
                {isDropdownOpen && <DropdownMenu onGroupChange={handleGroupChange}/>}
            </div>
            <GroupActions/>
                </div>
        </div>
    );
}
