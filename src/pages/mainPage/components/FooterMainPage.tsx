import {useNavigate} from "react-router-dom";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";


export function FooterMainPage() {
    const navigate = useNavigate(); // Initialisez le hook useNavigate


    const {selectedGroup, setSelectedGroup, userGroups, navigateToPreferences} = useSelectedGroup();

    const navigateToGroupPage = () => {
        navigate("/protected/groupPage"); // Redirige vers la route groupPage
    };

    const handleComboBoxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedGroup = e.target.value;
        setSelectedGroup(selectedGroup)
        console.log("e.target.value", e.target.value);
        //navigation automatique
    };


    return (
        <div className="footerPrefer">
            <button onClick={navigateToGroupPage}>Groupe</button>
            <button onClick={navigateToPreferences}>Parametre</button>
            <button onClick={() => navigate("/protected/groupLike")}>LES LIKES</button>
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
