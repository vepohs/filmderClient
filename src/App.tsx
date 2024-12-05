import _Login from "./pages/login/_Login.tsx";
import _SignUp from "./pages/signUp/_SignUp.tsx";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute.tsx";
import PublicRoute from "./context/PublicRoute.tsx";
import PreferencesProtected from "./context/PreferencesProtected.tsx";
import {PreferenceProvider} from "./context/PreferenceProvider.tsx";
import _GroupPage from "./pages/groupPage/_GroupPage.tsx";
// @ts-ignore
import "./App.sass"
import _MainPage from "./pages/mainPage/_MainPage.tsx";
import {GroupLike} from "./_GroupLike.tsx";
import PreferencesForm from "./pages/preferences/PreferencesPage.tsx";

function App() {
    return (
        <PreferenceProvider>

            <Routes>

                <Route element={<PublicRoute/>}>
                    <Route path="/" element={<_Login/>}/>
                    <Route path="/login" element={<_Login/>}/>
                    <Route path="/signup" element={<_SignUp/>}/>

                </Route>


                <Route path="/protected" element={<ProtectedRoute/>}>

                    <Route path="preference" element={<PreferencesForm/>}/>
                    <Route index
                           element={
                               <PreferencesProtected>
                                   <_MainPage/>
                               </PreferencesProtected>
                           }
                    />

                    <Route path="groupPage" element={<_GroupPage/>}/>

                    <Route path="*" element="erreur 404"/>
                    <Route path="groupLike" element={<GroupLike/>}/>
                </Route>


                <Route path="*" element="erreur 404"/>
            </Routes>

        </PreferenceProvider>

    );
}

export default App;
