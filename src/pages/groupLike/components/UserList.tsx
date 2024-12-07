import React from "react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

interface UserListProps {
    users: User[]; // Liste des utilisateurs
}

const UserList: React.FC<UserListProps> = ({users}) => {
    const handleClick = (id: string) => {
        console.log(id); // Log l'id de l'utilisateur
    };

    return (
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
            {users.map((user) => (
                <div
                    key={user.id}
                    onClick={() => handleClick(user.id)}
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
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
