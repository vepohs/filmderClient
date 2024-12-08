import {Navigate, Outlet} from "react-router-dom";
import {useSelectedGroup} from "../SelectedGroupContext.tsx";

const SelectedGroupGuard = () => {
    const {selectedGroup} = useSelectedGroup()
    console.log(selectedGroup)
    return selectedGroup !== "me" ? <Outlet/> : <Navigate to="/protected"/>;
};

export default SelectedGroupGuard;
