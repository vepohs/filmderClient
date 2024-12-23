import React from "react";
import {usePreferences} from "../../../context/PreferenceContext.tsx";

// @ts-ignore
import "../PreferencesPage.sass";



const ProviderSelector: React.FC = () => {

    const {setSelectedProviders, selectedProviders, allProviders} = usePreferences();

    const toggleProvider = (providerId: number) => {
        setSelectedProviders((prevSelected) =>
            prevSelected.includes(providerId)
                ? prevSelected.filter((p) => p !== providerId)
                : [...prevSelected, providerId]
        );
    };

    return (
        <>
            <h1>Fournisseurs</h1>
            <div className="providersContainer">
                {allProviders.map((provider) => (
                    <button
                        key={provider.id}
                        onClick={() => toggleProvider(provider.id)}
                        className={`providerButton ${selectedProviders.includes(provider.id) ? "selected" : ""}`}
                    >
                        {provider.name}
                    </button>
                ))}
            </div>
        </>
    );
};

export default ProviderSelector;
