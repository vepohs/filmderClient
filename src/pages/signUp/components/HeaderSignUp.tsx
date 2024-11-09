import MyLogo from "../../../common/icons/filmderIcon.tsx";
// @ts-ignore
import "../style/HeaderStyle.sass";


export function HeaderSignUp() {
    return (
        <div className='headerContainer'>
            <MyLogo></MyLogo>
            <h2>SIGN UP</h2>
        </div>
    );
}