import {FooterMainPage} from "./components/FooterMainPage.tsx";
import {HeaderMainPage} from "./components/HeaderMainPage.tsx";
// @ts-ignore
import './_MainPageStyle.sass';
import UserMiddlePage from "./components/UserMiddlePage.tsx";

export function _UserMainPage() {


    return (
        <div className="mainPage">
            <HeaderMainPage/>
            <UserMiddlePage/>
            <FooterMainPage/>
        </div>
    );
}