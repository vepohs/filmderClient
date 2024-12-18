import {useSelectedGroup} from "../context/SelectedGroupContext.tsx";
import {useNavigate} from "react-router-dom";
import {Group} from "../types/group.ts";

export const useGroupActions = () => {

    const {setSelectedGroup, navigateToPreferences} = useSelectedGroup();
    const navigate = useNavigate();

    const navigateToGroupSettings = (groupId: Group) => {
        setSelectedGroup(groupId);
        navigateToPreferences();
    };

    const navigateToLikePage = (groupId: Group) => {
        setSelectedGroup(groupId);
        navigate("/protected/groupLike");
    };

    return {navigateToGroupSettings, navigateToLikePage};
};
