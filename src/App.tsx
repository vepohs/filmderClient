import _Login from "./pages/login/_Login.tsx";
import _SignUp from "./pages/signUp/_SignUp.tsx";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute.tsx";
import PublicRoute from "./context/PublicRoute.tsx";
import _UserPreferences from "./pages/preferences/_UserPreferences.tsx";
import PreferencesProtected from "./context/PreferencesProtected.tsx";
import {PreferenceProvider} from "./context/PreferenceProvider.tsx";
import _GroupPage from "./pages/groupPage/_GroupPage.tsx";
// @ts-ignore
import "./App.sass"
import _PreferenceGroup from "./pages/preferences/_PreferenceGroup.tsx";
import _MainPage from "./pages/mainPage/_MainPage.tsx";

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
                    <Route path="preferences" element={<_UserPreferences/>}/>
                    <Route path="groupPreferences/:groupId" element={<_PreferenceGroup/>}/>
                    <Route index
                           element={
                               <PreferencesProtected>
                                   <_MainPage/>
                               </PreferencesProtected>
                           }
                    />

                    <Route path="groupPage" element={<_GroupPage/>}/>

                    <Route path="*" element="erreur 404"/>

                </Route>

                <Route path="*" element="erreur 404"/>
            </Routes>

        </PreferenceProvider>

    );
}

export default App;
