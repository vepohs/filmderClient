// @ts-ignore
import './_MainPageStyle.sass'
import {HeaderMainPage} from "./components/HeaderMainPage.tsx";
import {FooterMainPage} from "./components/FooterMainPage.tsx";
import MiddleMainPage from "./components/MiddlePage.tsx";


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
