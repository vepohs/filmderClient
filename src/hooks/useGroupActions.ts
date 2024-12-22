import {useEffect, useState} from "react";
import {useSelectedGroup} from "../context/SelectedGroupContext.tsx";
import {APICreateGroup, APIJoinGroup} from "../services/groupManagementAPICalls.ts";
import {handleErrorToast, handleSuccessToast, handleWarningToast} from "../Utils/toastUtils.ts";


export function useGroupActions() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMode, setPopupMode] = useState<"create" | "join">("create");
    const [popUpText, setPopUpText] = useState("");
    const {loadUserGroups} = useSelectedGroup();

    const handleOpenPopup = (mode: "create" | "join") => {
        setPopupMode(mode);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        setPopUpText("");
    };

    const handleCreateGroupSubmit = async () => {
        if (popUpText.trim()) {
            try {
                await APICreateGroup(popUpText);
                handleSuccessToast("Groupe créé avec succès !");
                await loadUserGroups();
                handlePopupClose();
            } catch (error) {
                handleErrorToast("Erreur lors de la création du groupe !");
            }
        } else {
            handleWarningToast("Le nom du groupe ne peut pas être vide !");
        }
    };

    const handleJoinGroupSubmit = async () => {
        if (popUpText.trim()) {
            try {
                await APIJoinGroup(popUpText);
                handleSuccessToast("Groupe rejoint avec succès !");
                await loadUserGroups();
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

    return {
        isPopupOpen,
        popupMode,
        popUpText,
        handleOpenPopup,
        handlePopupClose,
        handleSubmit,
        setPopUpText,
    };
}
