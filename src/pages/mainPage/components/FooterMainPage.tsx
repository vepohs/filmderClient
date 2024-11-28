import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {SelectedGroupContext} from "../../../context/SelectedGroupContext.tsx";


export function FooterMainPage() {
    const navigate = useNavigate(); // Initialisez le hook useNavigate
    const selectedGroupContext = useContext(SelectedGroupContext);

    if (!selectedGroupContext) {
        throw new Error("FooterMainPage must be used within a SelectedGroupProvider");
    }

    const {selectedGroup, setSelectedGroup, userGroups} = selectedGroupContext;

    const handleGroupPageNavigation = () => {
        navigate("/protected/groupPage"); // Redirige vers la route groupPage
    };

    const onParamsClick = () => {
        if (selectedGroup === "me") {
            navigate("/protected/preferences");
        } else {
            navigate(`/protected/groupPreferences/${selectedGroup}`);
        }
    };

    const handleComboBoxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedGroup = e.target.value;
        setSelectedGroup(selectedGroup)
        console.log("e.target.value", e.target.value);
        console.log("je change mais on s 'en fou mtn c'est faut automatiquement ")
        /*
                if (selectedGroup === "me") {
                    navigate("/protected");
                } else {
                    navigate(`/protected/groupMainPage/${selectedGroup}`);
                }

         */

    };

    return (
        <div className="footerPrefer">
            <button onClick={handleGroupPageNavigation}>Groupe</button>
            <button onClick={onParamsClick}>Parametre</button>
            <label htmlFor="group-select">Mes Groupes:</label>
            <select
                id="group-select"
                value={selectedGroup}
                onChange={handleComboBoxChange}
            >
                <option value="me">Moi</option>
                {userGroups.map((group) => (
                    <option key={group.groupId} value={group.groupId}>
                        {group.name}
                    </option>
                ))}

            </select>

        </div>
    );
}
