// src/context/Routes/PreferenceRoute.tsx
import React from "react";
import {Outlet} from "react-router-dom";
import {PreferenceProvider} from "../PreferenceContext";

const PreferenceRoute: React.FC = () => {
    return (
        <PreferenceProvider>
            <Outlet/> {/* Seules les routes enfants ont accès à PreferenceContext */}
        </PreferenceProvider>
    );
};

export default PreferenceRoute;
