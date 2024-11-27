import {FooterMainPage} from "./components/FooterMainPage.tsx";
import {HeaderMainPage} from "./components/HeaderMainPage.tsx";
// @ts-ignore
import './_MainPageStyle.sass';
import GroupMiddlePage from "./components/GroupMiddlePage.tsx";

export function _GroupMainPage() {


    return (
        <div className="mainPage">
            <HeaderMainPage/>
            <GroupMiddlePage/>
            <FooterMainPage/>
        </div>
    );
}