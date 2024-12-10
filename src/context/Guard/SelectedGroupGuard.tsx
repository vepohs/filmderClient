import {Navigate, Outlet} from "react-router-dom";
import {useSelectedGroup} from "../SelectedGroupContext/SelectedGroupContext.tsx";

const SelectedGroupGuard = () => {
    const {selectedGroup} = useSelectedGroup()
    console.log(selectedGroup)
    return selectedGroup.groupId !== "me" ? <Outlet/> : <Navigate to="/protected"/>;
};

export default SelectedGroupGuard;
