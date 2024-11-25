import React from "react";
import {Group} from "../_GroupPage.tsx";

type GroupListProps = {
    groups: Group[];
};

const GroupList: React.FC<GroupListProps> = ({groups}) => (
    <div className="groups-section">
        <h2>Your Groups</h2>
        <div className="groups-container">
            {groups.map((group) => (
                <div key={group.groupId} className="group-card">
                    {group.name}
                </div>
            ))}
        </div>
    </div>
);

export default GroupList;
