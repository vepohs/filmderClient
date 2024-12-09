import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import {useNavigate} from "react-router-dom";

export const useGroupActions = () => {

    const {setSelectedGroup, navigateToPreferences} = useSelectedGroup();
    const navigate = useNavigate();

    const navigateToGroupSettings = (groupId: string) => {
        setSelectedGroup(groupId);
        navigateToPreferences();
    };

    const navigateToLikePage = (groupId: string) => {
        setSelectedGroup(groupId);
        navigate("/protected/groupLike");
    };

    return {navigateToGroupSettings, navigateToLikePage};
};
