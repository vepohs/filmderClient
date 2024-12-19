import {Link} from "react-router-dom";

// @ts-ignore
import '../style/GoToSignIn.sass';
export function GoToSignIn() {
    return (
        <div className='signInContainer'>
            <p>Vous avez déjà une compte ?</p>
            <Link to="/login">Connexion</Link>
        </div>
    );
}