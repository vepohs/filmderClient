// @ts-ignore
import '../style/GoToSignIn.sass';
import {Link} from "react-router-dom";

export function GoToSignIn() {
    return (
        <div className='signInContainer'>
            <p>Already have a account?</p>
            <Link to="/login">sign in</Link>
        </div>
    );
}