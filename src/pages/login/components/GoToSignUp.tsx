import {Link} from "react-router-dom";

// @ts-ignore
import "../style/GoToSignUp.sass";

export function GoToSignUp() {
    return (
        <div className='signUpContainer'>
            <p>Pas de compte ?</p>
            <Link to="/signup">Inscrivez-vous</Link>
        </div>
    );
}
