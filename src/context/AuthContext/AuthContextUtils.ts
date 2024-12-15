import {LoginResponse} from "../../types/AuthContext.ts";

export const setLocalStorage = (accessToken: string, refreshToken: string, selectedGroup: object) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
};

export const extractUserInfo = (response: LoginResponse) => {
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const defaultGroup = { groupId: "me", name: "Moi" };
    return { accessToken, refreshToken, defaultGroup };
};

export const clearLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("selectedGroup");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}