import axiosWithAuth from "../Utils/axiosWithAuth.ts";
import {PreferencesData, PreferencesResponse} from "../types/PreferencesType.ts";

export const getAllPreferencesAvailable = () =>
    axiosWithAuth.get("users/protected/getPreferences");

export const getPreferences = (selectedGroup: string): Promise<PreferencesResponse> => {
    return selectedGroup === "me"
        ? getUserPreferences()
        : getGroupPreferences(selectedGroup);
}

export const getUserPreferences = () =>
    axiosWithAuth
        .get<PreferencesResponse>("users/protected/getUserPreferences")
        .then((response) => response.data);

export const getGroupPreferences = (groupId: string) =>
    axiosWithAuth
        .get<PreferencesResponse>("group/protected/getGroupPreference", {params: {groupId}})
        .then((response) => response.data);


export const setPreferences = (selectedGroup: string, data: PreferencesData) => {
    return selectedGroup === "me"
        ? setUserPreferences(data)
        : setGroupPreferences(selectedGroup, data);
}

export const setUserPreferences = (data: PreferencesData) =>
    axiosWithAuth.post("users/protected/setPreferences", data);

export const setGroupPreferences = (groupId: string, data: PreferencesData) =>
    axiosWithAuth.post("group/protected/setGroupPreference", {...data, groupId});


