import React from "react";
import {SvgGroupAdd} from "../components/icons/SvgGroupAdd.tsx";
import {SvgGroupJoin} from "../components/icons/SvgGroupJoin.tsx";

type ActionButtonsProps = {
    onOpenPopup: (mode: "create" | "join") => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({onOpenPopup}) => (
    <div className="action-buttons">
        <SvgGroupJoin onClick={() => onOpenPopup("join")}/>
        <SvgGroupAdd onClick={() => onOpenPopup("create")}/>
    </div>
);

export default ActionButtons;
