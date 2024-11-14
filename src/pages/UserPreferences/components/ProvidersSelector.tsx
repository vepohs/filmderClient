import React, {useState} from "react";
import "../_UserPreferences.sass"

interface ProviderSelectorProps {
    providers: { id: number; name: string }[];
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({providers}) => {
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);

    const toggleProvider = (providerId: number) => {
        setSelectedProviders((prevSelected) =>
            prevSelected.includes(providerId)
                ? prevSelected.filter((p) => p !== providerId)
                : [...prevSelected, providerId]
        );
    };

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
