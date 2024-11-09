// src/AAAcomponents/HeaderLogin.tsx

import MyLogo from "../../../common/icons/filmderIcon.tsx";

// @ts-ignore
import "../style/HeaderStyle.sass";

export function HeaderLogin() {
    return (
        <div className='headerContainer'>
            <MyLogo />
            <h2>Se connecter</h2>
        </div>
    );
}
