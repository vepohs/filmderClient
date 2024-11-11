import _Login from "./pages/login/_Login.tsx";
import _SignUp from "./pages/signUp/_SignUp.tsx";
import {_MainPage} from "./pages/mainPage/_MainPage.tsx";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute.tsx";


function App() {
    return (
        <Routes>

            <Route path="/" element={<_Login/>}/>
            <Route path="/signup" element={<_SignUp/>}/>
            <Route path="/login" element={<_Login/>}/>

            {/* Route protégée avec des routes imbriquées */}
            <Route path="/mainApp" element={<ProtectedRoute />}>
                <Route index element={<_MainPage />} />
                {/* On peut imbriqué d'autre route ici ex:
                 <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                 */}
            </Route>
            <Route path="*" element="erreur 404"/>
        </Routes>
    );
}
export default App;
