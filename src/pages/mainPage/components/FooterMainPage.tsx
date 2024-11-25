import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";

interface Group {
    groupId: string;
    name: string;
}


export function FooterMainPage() {
    const navigate = useNavigate(); // Initialisez le hook useNavigate
    const [userGroups, setUserGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>("me"); // État pour le groupe sélectionné


    const handleGroupPageNavigation = () => {
        navigate("/protected/groupPage"); // Redirige vers la route groupPage
    };

    const handlePreferenceNavigation = () => {
        navigate("/protected/groupPreferences"); // Redirige vers la route groupPage
    };


    useEffect(() => {
        getGroupsForUser();
    }, []);

    async function getGroupsForUser(): Promise<void> {
        try {
            console.log("Fetching user groups...");
            const response = await axiosWithAuth.get("/users/protected/getGroup");
            console.log("User groups:", response.data.group);
            setUserGroups(response.data.group); // Met à jour l'état avec les groupes
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    }

    const handleComboBoxChange = () => {
        if (selectedGroup === "me") {
            navigate("/protected/preferences"); // Redirige vers la page de préférences
            console.log("Moi");
        } else {
            navigate(`/protected/groupPreferences/${selectedGroup}`); // Redirige vers la page d'un groupe
            console.log("Groupe");
        }
    };

    return (
        <div className="footerPrefer">
            <h1>Footer</h1>
            <button onClick={handleGroupPageNavigation}>Groupe</button>
            <button onClick={handleComboBoxChange}>Parametre</button>
            <label htmlFor="group-select">Mes Groupes:</label>
            <select
                id="group-select"
                value={selectedGroup}
                onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setSelectedGroup(e.target.value)
                }
                }

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
