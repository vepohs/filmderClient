import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
// @ts-ignore
import "./index.sass"

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
