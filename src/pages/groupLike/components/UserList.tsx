import React from "react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

interface UserListProps {
    users: User[]; // Liste des utilisateurs
    toggleUserSelection: (id: string) => void; // Fonction pour toggler la sélection
    selectedUsers: string[]; // Liste des IDs des utilisateurs sélectionnés
}

const UserList: React.FC<UserListProps> = ({users, toggleUserSelection, selectedUsers}) => {
    return (
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
            {users.map((user) => (
                <div
                    key={user.id}
                    onClick={() => toggleUserSelection(user.id)} // Toggle la sélection au clic
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: selectedUsers.includes(user.id) ? "#008000" : "#FF0000", // Couleur différente si sélectionné
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background-color 0.3s",
                    }}
                >
                    {user.firstName[0]}
                    {user.lastName[0]}
                </div>
            ))}
        </div>
    );
};

export default UserList;
