import React from "react";
// @ts-ignore
import "../_PreferencesPage.sass";

interface ProviderSelectorProps {
    providers: { id: number; name: string }[];
    selectedProviders: number[];
    setSelectedProviders: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({providers, selectedProviders, setSelectedProviders}) => {
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
            {providers.map((provider) => (
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
