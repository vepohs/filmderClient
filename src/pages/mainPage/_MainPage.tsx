import {FooterMainPage} from "./components/FooterMainPage.tsx";
import {HeaderMainPage} from "./components/HeaderMainPage.tsx";
import {MiddleMainPage} from "./components/MiddleMainPage.tsx";
// @ts-ignore
import './_MainPageStyle.sass';

export function _MainPage() {


    return (
        <div className="mainPage">
            <HeaderMainPage/>
            <MiddleMainPage/>
            <FooterMainPage/>
        </div>
    );
}