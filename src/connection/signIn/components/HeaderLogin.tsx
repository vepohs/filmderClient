// src/AAAcomponents/HeaderLogin.tsx

import MyLogo from "../../../AAAcomponents/assets/filmderIcon.tsx";

// @ts-ignore
import "../styles/HeaderStyle.sass";

export function HeaderLogin() {
    return (
        <div className='headerContainer'>
            <MyLogo />
            <h2>Se connecter</h2>
        </div>
    );
}
