// GroupHeader.tsx
import React from "react";
import {SVGCopy} from "./icons/SVGCopy.tsx";
import {copyToClipboard} from "../../../Utils/groupLikeUtils.ts";
import {GroupHeaderProps} from "../../../types/group.ts";
import {CustomToastContainer} from "../../../common/components/CustomToastContainer.tsx";



export const GroupHeader: React.FC<GroupHeaderProps> = ({selectedGroup}) => {
    return (
        <>
            <h1>{selectedGroup.name}</h1>
            <h1>

                <span>
                    {selectedGroup.groupId}
                   <SVGCopy onClick={() => copyToClipboard(selectedGroup.groupId) }/>
                </span>
            </h1>
            <CustomToastContainer/>
        </>
    );
};
