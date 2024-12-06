// src/context/Routes/PreferenceRoute.tsx
import React from "react";
import {Outlet} from "react-router-dom";
import {PreferenceProvider} from "../PreferenceContext";

const PreferenceRoute: React.FC = () => {
    return (
        <PreferenceProvider>
            <Outlet/>
        </PreferenceProvider>
    );
};

export default PreferenceRoute;
