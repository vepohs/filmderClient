// components/ProviderSelector.tsx
import React, {useState} from "react";

interface ProviderSelectorProps {
    providers: string[];
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({providers}) => {
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

    const toggleProvider = (provider: string) => {
        setSelectedProviders((prevSelected) =>
            prevSelected.includes(provider)
                ? prevSelected.filter((p) => p !== provider)
                : [...prevSelected, provider]
        );
    };

    return (
        <div className="providerContainer">
            {providers.map((provider) => (
                <button
                    key={provider}
                    onClick={() => toggleProvider(provider)}
                    className={`providerButton ${selectedProviders.includes(provider) ? "selected" : ""}`}
                >
                    {provider}
                </button>
            ))}
        </div>
    );
};

export default ProviderSelector;
