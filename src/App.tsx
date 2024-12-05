import _Login from "./pages/login/_Login.tsx";
import _SignUp from "./pages/signUp/_SignUp.tsx";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./context/Routes/ProtectedRoute.tsx";
import PublicRoute from "./context/Routes/PublicRoute.tsx";
import PreferencesProtected from "./context/Routes/PreferencesProtected.tsx";
import {PreferenceProvider} from "./context/PreferenceContext.tsx";
import _GroupPage from "./pages/groupPage/_GroupPage.tsx";
// @ts-ignore
import "./App.sass"
import _MainPage from "./pages/mainPage/_MainPage.tsx";
import {GroupLike} from "./_GroupLike.tsx";
import PreferencesForm from "./pages/preferences/PreferencesPage.tsx";
import SelectedGroupRoute from "./context/Routes/SelectedGroupRoute.tsx";
import PreferenceRoute from "./context/Routes/PreferenceRoute.tsx";

function App() {
    return (
        <PreferenceProvider>

            <Routes>
                <Route element={<PublicRoute/>}>
                    <Route index element={<_Login/>}/>
                    <Route path="/login" element={<_Login/>}/>
                    <Route path="/signup" element={<_SignUp/>}/>
                </Route>

                <Route path="/protected" element={<ProtectedRoute/>}>
                    <Route element={<SelectedGroupRoute/>}>
                        <Route element={<PreferenceRoute/>}>

                            <Route path="preferences" element={<PreferencesForm/>}/>
                            <Route index
                                   element={
                                       <PreferencesProtected>
                                           <_MainPage/>
                                       </PreferencesProtected>
                                   }
                            />
                        </Route>

                        <Route path="groupPage" element={<_GroupPage/>}/>
                        <Route path="groupLike" element={<GroupLike/>}/>

                        <Route path="*" element="erreur 404"/>
                    </Route>
                </Route>

                <Route path="*" element="erreur 404"/>
            </Routes>

        </PreferenceProvider>

    );
}

export default App;
