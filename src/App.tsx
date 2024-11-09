import _Login from "./pages/login/_Login.tsx";
import _SignUp from "./pages/signUp/_SignUp.tsx";
import {_MainPage} from "./pages/mainPage/_MainPage.tsx";
import LoginContextProvider from "./contexts/LoginContextProvider.tsx";


function App() {

    return (
        <LoginContextProvider>
            <_Login/>
        </LoginContextProvider>

    );
}

export default App;
