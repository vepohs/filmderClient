// GroupHeader.tsx
import React from "react";
import {Group} from "../../../types/SelectedGroupTypes.ts";
import {copyToClipboard} from "./groupLikeUtils.ts";


interface GroupHeaderProps {
    selectedGroup: Group;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({selectedGroup}) => {
    return (
        <>
            <h1>{selectedGroup.name}</h1>
            <h1>
                le code pour rejoindre le groupe est <br/>
                <span
                    onClick={() => copyToClipboard(selectedGroup.groupId)}
                    style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}
                >
                    {selectedGroup.groupId}
                </span>
            </h1>
        </>
    );
};
