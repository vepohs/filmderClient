import React, {useEffect, useState} from "react";
import axiosWithAuth from "../../../Utils/axiosWithAuth.ts";
import ActionButtons from "./ActionButtons.tsx";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import Popup from "./Popup.tsx";

// @ts-ignore
import "../style/groupManagement.sass";

const GroupPage: React.FC = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMode, setPopupMode] = useState<"create" | "join">("create");
    const [popUpText, setpopUpText] = useState("");


    const {loadUserGroups} = useSelectedGroup();

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
            await axiosWithAuth.post("/group/protected/groupAdd", {
                name: popUpText,
            });
            await loadUserGroups()
            handlePopupClose();
        } else {
            alert("Le nom du groupe ne peut pas être vide !");
        }
    };

    const handleJoinGroupSubmit = async () => {
        if (popUpText.trim()) {
            try {
                await axiosWithAuth.post("/group/protected/groupJoin", {
                    groupId: popUpText,
                });
                alert("You successfully joined the group!");
                loadUserGroups();
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
        loadUserGroups();
    }, []);


    return (
        <div className="group-page">

            <ActionButtons onOpenPopup={handleOpenPopup}/>
            { /* <GroupList/> */}
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
