// @ts-ignore
import "../style/HeaderMainPage.sass";
import MyLogo from "../../../common/icons/filmderIcon.tsx";
import {SvgLogout} from "./icons/SvgLogout.tsx";
import {useAuth} from "../../../context/AuthContext.tsx";

export function HeaderMainPage() {

    const {logout} = useAuth();

    return (
        <div className='headerPrefer'>
            <MyLogo/>
            <SvgLogout onClick={logout}></SvgLogout>
        </div>
    );
}