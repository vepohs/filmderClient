import React, {useContext} from "react";
import {SelectedGroupContext} from "../../../context/SelectedGroupContext/SelectedGroupContext.tsx";

const GroupList: React.FC = () => {
    const selectedGroupContext = useContext(SelectedGroupContext);

    if (!selectedGroupContext) {
        throw new Error("GroupList must be used within a SelectedGroupProvider");
    }

    const {userGroups} = selectedGroupContext;

    return (
        <div className="groups-section">
            <h2>Your Groups</h2>
            <div className="groups-container">
                {userGroups.map((group) => (
                    <div key={group.groupId} className="group-card">
                        {group.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupList;
