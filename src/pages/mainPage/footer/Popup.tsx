import React from "react";

type PopupProps = {
    mode: "create" | "join";
    groupName: string;
    onGroupNameChange: (name: string) => void;
    onClose: () => void;
    onSubmit: () => void;
};

const Popup: React.FC<PopupProps> = ({
                                         mode,
                                         groupName,
                                         onGroupNameChange,
                                         onClose,
                                         onSubmit,
                                     }) => (
    <div className="popup-overlay">
        <div className="popup-content">
            <h2>{mode === "create" ? "Créer un groupe" : "Rejoindre un groupe"}</h2>
            <input
                type="text"
                placeholder={
                    mode === "create" ? "Enter le nom du groupe" : "Enter le code du groupe"
                }
                value={groupName}
                onChange={(e) => onGroupNameChange(e.target.value)}
            />
            <div className="popup-actions">
                <button className="button cancel" onClick={onClose}>
                    Cancel
                </button>
                <button className="button submit" onClick={onSubmit}>
                    {mode === "create" ? "Create" : "Join"}
                </button>
            </div>
        </div>
    </div>
);

export default Popup;
