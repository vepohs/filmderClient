// src/components/HeaderLogin.tsx


// @ts-ignore
import MyLogo from "../../signUp/components/icons/filmderIcon.tsx";
import "../styles/HeaderStyle.sass";

export function HeaderLogin() {
    return (
        <div className='headerContainer'>
            <MyLogo />
            <h2>Se connecter</h2>
        </div>
    );
}
