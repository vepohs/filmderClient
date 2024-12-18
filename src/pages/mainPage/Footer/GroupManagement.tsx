import React, {useEffect, useState} from "react";
import axiosWithAuth from "../../../Utils/axiosWithAuth.ts";
import ActionButtons from "./ActionButtons.tsx";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import Popup from "./Popup.tsx";

// @ts-ignore
import "../style/GroupManagement.sass";
import {handleErrorToast, handleSuccessToast, handleWarningToast} from "../../../Utils/toastUtils.ts";
import {CustomToastContainer} from "../../../common/components/CustomToastContainer.tsx";

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
            handleSuccessToast("Groupe créé avec succès !");
            await loadUserGroups()
            handlePopupClose();
        } else {
            handleWarningToast("Le nom du groupe ne peut pas être vide !");
        }
    };

    const handleJoinGroupSubmit = async () => {
        if (popUpText.trim()) {
            try {
                await axiosWithAuth.post("/group/protected/groupJoin", {
                    groupId: popUpText,
                });
                handleSuccessToast("Groupe rejoint avec succès !");
                loadUserGroups();
                handlePopupClose();
            } catch (error) {
                handleErrorToast("Impossible de rejoindre le groupe !");
            }
        } else {
            handleWarningToast("Le nom du groupe ne peut pas être vide !");
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
            {isPopupOpen && (
                <Popup
                    mode={popupMode}
                    groupName={popUpText}
                    onGroupNameChange={setpopUpText}
                    onClose={handlePopupClose}
                    onSubmit={handleSubmit}
                />
            )}
            <CustomToastContainer/>
        </div>
    );
};

export default GroupPage;
