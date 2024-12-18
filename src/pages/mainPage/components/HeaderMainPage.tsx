import FilmderIcon from "../../../common/icons/SvgFilmderIcon.tsx";
import {SvgLogout} from "./icons/SvgLogout.tsx";
import {useAuth} from "../../../context/authContext.tsx";
// @ts-ignore
import "../style/HeaderMainPage.sass";

export function HeaderMainPage() {

    const {logout} = useAuth();

    return (
        <div className='headerPrefer'>
            <FilmderIcon/>
            <SvgLogout onClick={logout}></SvgLogout>
        </div>
    );
}