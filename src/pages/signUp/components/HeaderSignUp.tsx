import FilmderIcon from "../../../common/icons/SvgFilmderIcon.tsx";
// @ts-ignore
import "../style/HeaderSignUp.sass"


export function HeaderSignUp() {
    return (
        <div className='headerSignUpContainer'>
            <FilmderIcon></FilmderIcon>
            <h2>Inscription</h2>
        </div>
    );
}