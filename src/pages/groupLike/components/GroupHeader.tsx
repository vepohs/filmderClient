// GroupHeader.tsx
import React from "react";
import {Group} from "../../../types/SelectedGroupTypes.ts";

import {SVGCopy} from "./SVGCopy.tsx";
import {copyToClipboard} from "../../../Utils/groupLikeUtils.ts";


interface GroupHeaderProps {
    selectedGroup: Group;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({selectedGroup}) => {
    return (
        <>
            <h1>{selectedGroup.name}</h1>
            <h1>

                <span>
                    {selectedGroup.groupId}
                   <SVGCopy onClick={ () => copyToClipboard(selectedGroup.groupId) }/>
                </span>
            </h1>
        </>
    );
};
