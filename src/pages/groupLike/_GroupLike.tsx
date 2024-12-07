import React, {useEffect, useState} from "react";
import UserList from "./components/UserList.tsx";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {useSelectedGroup} from "../../context/SelectedGroupContext.tsx";


const GroupLike: React.FC = () => {
    const {selectedGroup} = useSelectedGroup();
    const [users, setUsers] = useState([]);

    const fetchGroupUsers = async () => {
        try {
            console.log(selectedGroup)
            const response = await axiosWithAuth.post("group/protected/getGroupUsers", selectedGroup);
            console.log("huuuuu")
            console.log(response)
            setUsers(response.data); // Assure-toi que response.data est un tableau d'utilisateurs
        } catch (error) {
            console.error("Error fetching group users:", error);
        }
    };

    useEffect(() => {
        fetchGroupUsers();
    }, []);

    return (
        <div>
            <h1>Group Users</h1>
            <UserList users={users}/>
        </div>
    );
};

export default GroupLike;
