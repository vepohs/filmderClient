import MyLogo from "../../../common/icons/filmderIcon.tsx";
// @ts-ignore
import "../style/HeaderSignUp.sass"


export function HeaderSignUp() {
    return (
        <div className='headerSignUpContainer'>
            <MyLogo></MyLogo>
            <h2>SIGN UP</h2>
        </div>
    );
}