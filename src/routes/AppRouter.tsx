import {Route, BrowserRouter, Routes} from "react-router-dom";
import _Login from "../pages/login/_Login.tsx";
import _SignUp from "../pages/signUp/_SignUp.tsx";
import {_MainPage} from "../pages/mainPage/_MainPage.tsx";

export function AppRouter() {
    return (
            <Routes>
                <Route path="/login" element={<_Login/>}/>
                <Route path="/signup" element={<_SignUp/>}/>
                <Route path="/" element={<_Login/>}/>
                <Route path="*" element="erreur 404"/>

                <Route path="/protected/mainApp" element={<_MainPage/>}/>
            </Routes>
    );
}