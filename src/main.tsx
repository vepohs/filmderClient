import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import "./axiosUtils/axiosConfig.ts"
// @ts-ignore
import "./App.sass"
import {AuthProvider} from "./context/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)
