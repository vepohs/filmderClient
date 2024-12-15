// src/context/Routes/PreferenceRoute.tsx
import React from "react";
import {Outlet} from "react-router-dom";
import {PreferenceProvider} from "../PreferenceContext.tsx";

const PreferenceRoute: React.FC = () => {
    return (
        <PreferenceProvider>
            <Outlet/>
        </PreferenceProvider>
    );
};

export default PreferenceRoute;
