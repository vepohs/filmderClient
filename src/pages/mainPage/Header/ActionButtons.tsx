import React from "react";

type ActionButtonsProps = {
    onOpenPopup: (mode: "create" | "join") => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({onOpenPopup}) => (
    <div className="action-buttons">
        <button className="button join" onClick={() => onOpenPopup("join")}>
            ➡️ Join Group
        </button>
        <button className="button create" onClick={() => onOpenPopup("create")}>
            ➕ Create Group
        </button>
    </div>
);

export default ActionButtons;
