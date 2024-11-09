import {FooterMainPage} from "./FooterMainPage.tsx";
import {HeaderMainPage} from "./HeaderMainPage.tsx";
import {MiddleMainPage} from "./MiddleMainPage.tsx";
// @ts-ignore
import '../styles/MainPageStyle.sass';

export function MainPage() {
    return (
        <div className="mainPage">
            <HeaderMainPage/>
            <MiddleMainPage/>
            <FooterMainPage/>
        </div>
    );
}