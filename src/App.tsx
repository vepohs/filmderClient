
import {Route, Routes} from "react-router-dom";
import AuthenticatedGuard from "./Guard/AuthenticatedGuard.tsx";
import PublicGuard from "./Guard/PublicGuard.tsx";
import PreferencesGuard from "./Guard/PreferencesGuard.tsx";
import PreferencesForm from "./pages/preferences/PreferencesPage.tsx";
import SelectedGroupRoute from "./context/Routes/SelectedGroupRoute.tsx";
import PreferenceRoute from "./context/Routes/PreferenceRoute.tsx";
import {AuthProvider} from "./context/authContext.tsx";
import SelectedGroupGuard from "./Guard/SelectedGroupGuard.tsx";
import Login from "./pages/login/Login.tsx";
import MainPage from "./pages/mainPage/MainPage.tsx";
import SignUp from "./pages/signUp/SignUp.tsx";
import GroupLike from "./pages/groupLike/GroupLike.tsx";
// @ts-ignore
import "./App.sass"

function App() {
    return (
        
        <AuthProvider>
            <Routes>
                <Route element={<PublicGuard/>}>
                    <Route index element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Route>

                <Route path="/protected" element={<AuthenticatedGuard/>}>
                    <Route element={<SelectedGroupRoute/>}>
                        <Route element={<PreferenceRoute/>}>

                            <Route path="preferences" element={<PreferencesForm/>}/>
                            <Route index
                                   element={
                                       <PreferencesGuard>
                                           <MainPage/>
                                       </PreferencesGuard>
                                   }
                            />
                        </Route>


                        <Route path="groupPage" element={<GroupLike/>}/>
                        <Route element={<SelectedGroupGuard/>}>
                            <Route path="groupLike" element={<GroupLike/>}/>
                        </Route>
                        <Route path="*" element="erreur 404"/>
                    </Route>
                </Route>

                <Route path="*" element="erreur 404"/>
            </Routes>
        </AuthProvider>
    );
}

export default App;
