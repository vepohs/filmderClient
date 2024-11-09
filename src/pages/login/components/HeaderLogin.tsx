// src/AAAcomponents/HeaderLogin.tsx

import MyLogo from "../../../common/icons/filmderIcon.tsx";

// @ts-ignore
import "../style/HeaderLogin.sass";

export function HeaderLogin() {
    return (
        <div className='headerLoginContainer'>
            <MyLogo />
            <h2>Se connecter</h2>
        </div>
    );
}