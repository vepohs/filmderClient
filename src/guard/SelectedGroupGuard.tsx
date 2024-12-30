import {Navigate, Outlet} from "react-router-dom";
import {useSelectedGroup} from "../context/SelectedGroupContext.tsx";

const SelectedGroupGuard = () => {
    const {selectedGroup} = useSelectedGroup()
    return selectedGroup.groupId !== "me" ? <Outlet/> : <Navigate to="/protected"/>;
};

export default SelectedGroupGuard;
