import '../styles/MiddleMainPage.sass';
import simsonImage from './test.png';
import {Like} from "./icon/Like.tsx";

export function MiddleMainPage() {
    return (
        <div className='middleMainPage'>
            <div className='imageContainer'>
                <img src={simsonImage} alt='Simson'/>
                <Like></Like>

            </div>
        </div>
    );
}
