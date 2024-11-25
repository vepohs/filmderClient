import React, {useEffect, useState} from "react";
// @ts-ignore
import "./_GroupPage.sass";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import GroupList from "./components/GroupList.tsx";
import ActionButtons from "./components/ActionButtons.tsx";
import Popup from "./components/Popup.tsx";

export type Group = {
    groupId: number;
    name: string;
};

const GroupPage: React.FC = () => {
    const [userGroups, setUserGroups] = useState<Group[]>([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMode, setPopupMode] = useState<"create" | "join">("create");
    const [popUpText, setpopUpText] = useState("");

    const handleOpenPopup = (mode: "create" | "join") => {
        setPopupMode(mode);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        setpopUpText("");
    };

    const handleCreateGroupSubmit = async () => {
        if (popUpText.trim()) {

            console.log("LE NOM DU GROUPE C", popUpText);
            const response = await axiosWithAuth.post("/group/protected/groupAdd", {
                name: popUpText,
            });
            console.log("LA REPONSE RECU C :", response);
            await getGroupsForUser()
            handlePopupClose();
        } else {
            alert("Le nom du groupe ne peut pas être vide !");
        }
    };

    const handleJoinGroupSubmit = async () => {
        if (popUpText.trim()) {
            try {
                const response = await axiosWithAuth.post("/group/protected/groupJoin", {
                    groupId: popUpText,
                });
                console.log("Joining group response:", response);
                alert("You successfully joined the group!");
                getGroupsForUser();
                handlePopupClose();
            } catch (error) {
                console.error("Error joining the group:", error);
                alert("Failed to join the group. Please try again.");
            }
        } else {
            alert("Le nom du groupe ne peut pas être vide !");
        }
    };

    const handleSubmit = () => {
        if (popupMode === "create") {
            handleCreateGroupSubmit();
        } else {
            handleJoinGroupSubmit();
        }
    };

    useEffect(() => {
        getGroupsForUser();
    }, []);

    async function getGroupsForUser(): Promise<void> {
        console.log("Fetching user groups...");
        const response = await axiosWithAuth.get("/users/protected/getGroup");
        console.log("User groups:", response.data.group);
        setUserGroups(response.data.group);

    }

    return (
        <div className="group-page">
            <h1>Group Page</h1>
            <ActionButtons onOpenPopup={handleOpenPopup}/>
            <GroupList groups={userGroups}/>
            {isPopupOpen && (
                <Popup
                    mode={popupMode}
                    groupName={popUpText}
                    onGroupNameChange={setpopUpText}
                    onClose={handlePopupClose}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default GroupPage;
