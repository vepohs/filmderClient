import React from "react";
// @ts-ignore
import "../_PreferencesPage.sass";
import {usePreferences} from "../../../context/PreferenceContext.tsx";


const ProviderSelector: React.FC = () => {

    const {setSelectedProviders, selectedProviders, allProviders} = usePreferences();

    const toggleProvider = (providerId: number) => {
        setSelectedProviders((prevSelected) =>
            prevSelected.includes(providerId)
                ? prevSelected.filter((p) => p !== providerId)
                : [...prevSelected, providerId]
        );
    };

    console.log("selectedProviders", selectedProviders);
    return (
        <div className="providerContainer">
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
    );
};

export default ProviderSelector;
