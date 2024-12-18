import React from "react";
import {User} from "../../../types/user.ts";

// @ts-ignore
import "../styles/UserList.sass"


interface UserListProps {
    users: User[]; // Liste des utilisateurs
    toggleUserSelection: (id: string) => void; // Fonction pour toggler la sélection
    selectedUsers: string[]; // Liste des IDs des utilisateurs sélectionnés
}

const UserList: React.FC<UserListProps> = ({users, toggleUserSelection, selectedUsers}) => {
    return (
        <div className="userList">
            {users.map((user) => (
                <div
                    key={user.id}
                    onClick={() => toggleUserSelection(user.id)} // Toggle la sélection au clic
                    className={`userCircle ${
                        selectedUsers.includes(user.id) ? "selected" : "notSelected"
                    }`}
                >
                    {user.firstName[0].toUpperCase()}
                    {user.lastName[0].toUpperCase()}
                </div>
            ))}
        </div>
    );
};

export default UserList;
