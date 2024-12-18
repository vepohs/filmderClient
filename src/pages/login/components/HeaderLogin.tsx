import FilmderIcon from "../../../common/icons/SvgFilmderIcon.tsx";

// @ts-ignore
import "../style/HeaderLogin.sass";

export function HeaderLogin() {
    return (
        <div className='headerLoginContainer'>
            <FilmderIcon />
            <h2>Connexion</h2>
        </div>
    );
}
