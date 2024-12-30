import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import "./utils/axiosWithAuth.ts"
// @ts-ignore
import "./App.sass"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
