// @ts-ignore
import "../style/HeaderMainPage.sass";
import MyLogo from "../../../common/icons/filmderIcon.tsx";
import {SvgLogout} from "./icons/SvgLogout.tsx";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";

export function HeaderMainPage() {
    const logout = async () => {
        const response = await axiosWithAuth.post("/auth/logout")
        // localStorage.removeItem("accessToken")
        console.log(response)
    }
    return (
        <div className='headerPrefer'>
            <MyLogo/>
            <SvgLogout onClick={logout}></SvgLogout>
        </div>
    );
}