import _Login from "./pages/login/_Login.tsx";
import _SignUp from "./pages/signUp/_SignUp.tsx";
import {Route, Routes} from "react-router-dom";
import AuthenticatedGuard from "./context/Guard/AuthenticatedGuard.tsx";
import PublicGuard from "./context/Guard/PublicGuard.tsx";
import PreferencesGuard from "./context/Guard/PreferencesGuard.tsx";
import _GroupPage from "./pages/groupPage/_GroupPage.tsx";
// @ts-ignore
import "./App.sass"
import _MainPage from "./pages/mainPage/_MainPage.tsx";
import {GroupLike} from "./pages/groupLike/_GroupLike.tsx";
import PreferencesForm from "./pages/preferences/PreferencesPage.tsx";
import SelectedGroupRoute from "./context/Routes/SelectedGroupRoute.tsx";
import PreferenceRoute from "./context/Routes/PreferenceRoute.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<PublicGuard/>}>
                    <Route index element={<_Login/>}/>
                    <Route path="/login" element={<_Login/>}/>
                    <Route path="/signup" element={<_SignUp/>}/>
                </Route>

                <Route path="/protected" element={<AuthenticatedGuard/>}>
                    <Route element={<SelectedGroupRoute/>}>
                        <Route element={<PreferenceRoute/>}>

                            <Route path="preferences" element={<PreferencesForm/>}/>
                            <Route index
                                   element={
                                       <PreferencesGuard>
                                           <_MainPage/>
                                       </PreferencesGuard>
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
        </AuthProvider>
    );
}

export default App;
