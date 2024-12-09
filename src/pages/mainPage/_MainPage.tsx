// @ts-ignore
import './_MainPageStyle.sass'
import {HeaderMainPage} from "./Header/HeaderMainPage.tsx";
import {FooterMainPage} from "./Footer/FooterMainPage.tsx";
import {MiddleMainPage} from "./components/MiddlePage.tsx";


export function _MainPage() {
    return (
        <div className="mainPage">
            <HeaderMainPage/>
            <MiddleMainPage/>
            <FooterMainPage/>
        </div>
    );
}

export default _MainPage;
