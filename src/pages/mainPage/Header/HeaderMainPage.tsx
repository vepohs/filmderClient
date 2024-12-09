// @ts-ignore
import "../style/HeaderMainPage.sass";
import MyLogo from "../../../common/icons/filmderIcon.tsx";
import {SvgLogout} from "../components/icons/SvgLogout.tsx";
import {useAuth} from "../../../context/AuthContext.tsx";
import _GroupPage from "./groupManagement.tsx";

export function HeaderMainPage() {

    const {logout} = useAuth();

    return (
        <div className='headerPrefer'>
            <MyLogo/>
            <_GroupPage/>
            <SvgLogout onClick={logout}></SvgLogout>
        </div>
    );
}