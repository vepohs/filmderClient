import {SelectedGroupProvider} from "../SelectedGroupContext/SelectedGroupContext.tsx";
import {Outlet} from "react-router-dom";

const SelectedGroupRoute = () => {

    return (
        <SelectedGroupProvider>
            <Outlet/>
        </SelectedGroupProvider>
    )

}
export default SelectedGroupRoute;