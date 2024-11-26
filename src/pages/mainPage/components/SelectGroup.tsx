import { useState } from "react";

export function SelectGroup({ userGroups, selectedGroup, setSelectedGroup, handleGroupPageNavigation, handleComboBoxChange }) {
    const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer la liste déroulante

    const handleSelect = (value) => {
        setSelectedGroup(value); // Met à jour le groupe sélectionné
        setIsOpen(false); // Ferme la liste déroulante
    };

    return (
        <div className="footerPrefer">
            <button onClick={handleGroupPageNavigation}>Groupe</button>
            <button onClick={handleComboBoxChange}>Paramètre</button>

            {/* Conteneur du sélecteur personnalisé */}
            <div className="custom-select">
                <div
                    className="custom-select-header"
                    onClick={() => setIsOpen(!isOpen)} // Toggle de la liste
                >
                    {selectedGroup || "Sélectionnez un groupe"} {/* Valeur actuelle */}
                </div>

                {/* Options de la liste */}
                {isOpen && (
                    <div className="custom-select-options">
                        <div
                            className="custom-option"
                            onClick={() => handleSelect("me")} // Option "Moi"
                        >
                            Moi
                        </div>
                        {userGroups.map((group) => (
                            <div
                                key={group.groupId}
                                className="custom-option"
                                onClick={() => handleSelect(group.groupId)} // Options des groupes
                            >
                                {group.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
