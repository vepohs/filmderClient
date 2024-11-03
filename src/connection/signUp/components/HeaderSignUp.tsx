import MyLogo from "./icons/filmderIcon.tsx";
import "../styles/HeaderStyle.sass";


export function HeaderSignUp() {
    return (
        <div className='headerContainer'>
            <MyLogo></MyLogo>
            <h2>SIGN UP</h2>
        </div>
    );
}