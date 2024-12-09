import axiosWithAuth from "../axiosUtils/axiosConfig";
import {PreferencesData} from "../types/PreferencesType.ts";

export const fetchUserPreferences = () =>
    axiosWithAuth.get("users/protected/getUserPreferences");

export const fetchGroupPreferences = (groupId: string) =>
    axiosWithAuth.get("group/protected/getGroupPreference", {params: {groupId}});

export const setUserPreferences = (data: PreferencesData) =>
    axiosWithAuth.post("users/protected/setPreferences", data);

export const setGroupPreferences = (groupId: string, data: PreferencesData) =>
    axiosWithAuth.post("group/protected/setGroupPreference", {...data, groupId});

export const fetchAllPreferences = () =>
    axiosWithAuth.get("users/protected/getPreferences");
