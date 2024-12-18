// @ts-ignore
import './MainPage.sass'
import {HeaderMainPage} from "./components/HeaderMainPage.tsx";
import {FooterMainPage} from "./Footer/FooterMainPage.tsx";
import {MiddleMainPage} from "./components/MiddlePage.tsx";


export function MainPage() {
    return (
        <div className="mainPage">
            <HeaderMainPage/>
            <MiddleMainPage/>
            <FooterMainPage/>
        </div>
    );
}

export default MainPage;
