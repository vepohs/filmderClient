// src/components/GoToSignUp.tsx

// @ts-ignore
import "../styles/GoToSignUp.sass";

export function GoToSignUp() {
    return (
        <div className='signUpContainer'>
            <p>Pas de compte ?</p>
            <a href="/signup">Inscrivez-vous</a>
        </div>
    );
}