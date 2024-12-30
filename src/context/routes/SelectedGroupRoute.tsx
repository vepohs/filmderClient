import {Outlet} from "react-router-dom";
import {SelectedGroupProvider} from "../SelectedGroupContext.tsx";

const SelectedGroupRoute = () => {

    return (
        <SelectedGroupProvider>
            <Outlet/>
        </SelectedGroupProvider>
    )

}
export default SelectedGroupRoute;