import axiosWithAuth from "../utils/axiosWithAuth.ts";

// Création d'un groupe
export const APICreateGroup = (groupName: string) =>
    axiosWithAuth.post("/group/protected/groupAdd", {
        name: groupName,
    });

// Rejoindre un groupe
export const APIJoinGroup = (groupId: string) =>
    axiosWithAuth.post("/group/protected/groupJoin", {
        groupId: groupId,
    });
