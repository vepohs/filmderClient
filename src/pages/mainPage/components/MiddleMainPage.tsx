

// @ts-ignore
import "../style/MiddleMainPage.sass"
import {useAuth} from "../../../context/AuthContext.tsx";

export function MiddleMainPage() {

    const auth = useAuth();
    console.log(auth?.isAuthenticated);

    return (
        <div className='middleMainPage'>
            <div className='imageContainer'>
                {/* TODO y a un pb avec le svg voir console
                    <Like></Like>
                */}

            </div>
        </div>
    );
}
