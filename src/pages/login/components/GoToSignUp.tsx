// src/AAAcomponents/GoToSignUp.tsx

// @ts-ignore
import "../style/GoToSignUp.sass";
import {Link} from "react-router-dom";

export function GoToSignUp() {
    return (
        <div className='signUpContainer'>
            <p>Pas de compte ?</p>
            <Link to="/signup">Inscrivez-vous</Link>
        </div>
    );
}
