import React, {useState} from "react";
// @ts-ignore
import "./_GroupPage.sass";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import GroupList from "./components/GroupList.tsx";
import ActionButtons from "./components/ActionButtons.tsx";
import Popup from "./components/Popup.tsx";

export type Group = {
    id: number;
    name: string;
};

const GroupPage: React.FC = () => {
    const [userGroups, setUserGroups] = useState<Group[]>([
        {id: 1, name: "Developers"},
        {id: 2, name: "React Enthusiasts"},
        {id: 3, name: "TypeScript Masters"},
    ]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMode, setPopupMode] = useState<"create" | "join">("create");
    const [groupName, setGroupName] = useState("");

    const handleOpenPopup = (mode: "create" | "join") => {
        setPopupMode(mode);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        setGroupName("");
    };

    const handleCreateGroupSubmit = async () => {
        if (groupName.trim()) {
            const newGroup: Group = {
                id: userGroups.length + 1,
                name: groupName,
            };
            console.log("Creating group:", newGroup);
            const response = await axiosWithAuth.post("/group/protected/groupAdd", {
                name: groupName,
            });
            console.log("Creating group response:", response);
            setUserGroups([...userGroups, newGroup]);
            handlePopupClose();
        } else {
            alert("Le nom du groupe ne peut pas être vide !");
        }
    };

    const handleJoinGroupSubmit = async () => {
        if (groupName.trim()) {
            try {
                const response = await axiosWithAuth.post("/group/protected/groupJoin", {
                    groupId: groupName,
                });
                console.log("Joining group response:", response);
                alert("You successfully joined the group!");
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

    return (
        <div className="group-page">
            <h1>Group Page</h1>
            <ActionButtons onOpenPopup={handleOpenPopup}/>
            <GroupList groups={userGroups}/>
            {isPopupOpen && (
                <Popup
                    mode={popupMode}
                    groupName={groupName}
                    onGroupNameChange={setGroupName}
                    onClose={handlePopupClose}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default GroupPage;
