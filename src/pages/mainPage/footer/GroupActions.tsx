import React from "react";
import Popup from "./Popup.tsx";
import {CustomToastContainer} from "../../../common/components/CustomToastContainer.tsx";
import {useGroupActions} from "../../../hooks/useGroupActions.ts";

// @ts-ignore
import "../style/GroupManagement.sass";
import {SvgGroupJoin} from "../components/icons/SvgGroupJoin.tsx";
import {SvgGroupAdd} from "../components/icons/SvgGroupAdd.tsx";


const GroupActions: React.FC = () => {

    const {
        isPopupOpen,
        popupMode,
        popUpText,
        handleOpenPopup,
        handlePopupClose,
        handleSubmit,
        setPopUpText,
    } = useGroupActions()

    return (
        <div className="group-page">
            <div className="action-buttons">
                <SvgGroupJoin onClick={() => handleOpenPopup("join")}/>
                <SvgGroupAdd onClick={() => handleOpenPopup("create")}/>
            </div>
            {isPopupOpen && (
                <Popup
                    mode={popupMode}
                    groupName={popUpText}
                    onGroupNameChange={setPopUpText}
                    onClose={handlePopupClose}
                    onSubmit={handleSubmit}
                />
            )}
            <CustomToastContainer/>
        </div>
    );
};

export default GroupActions;
