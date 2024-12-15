import axiosWithAuth from "../Utils/axiosWithAuth.ts";
import {MovieResponse} from "../types/SelectedGroupTypes.ts";
/*
attention ici y a pas {} car c est considerer comme une ligne donc pas besoin
pas d'accolade = return implicite
 */

export const APIgetMovies = (listExcluedIds: number[], groupId: string): Promise<MovieResponse> => {
    return groupId === "me"
        ? APIgetMoviesForUser(listExcluedIds)
        : APIgetMoviesForGroup(listExcluedIds, groupId);
}

export const APIgetMoviesForUser = (listExcluedIds: number[]) =>
    axiosWithAuth
        .post<MovieResponse>("movie/protected/getMovie", {listExcluedIds})
        .then((response) => response.data);


export const APIgetMoviesForGroup = (listExcluedIds: number[], groupId: string) =>
    axiosWithAuth
        .post<MovieResponse>("movie/protected/getGroupMovie", {listExcluedIds, groupId})
        .then((response) => response.data);


export const APIgetUserGroups = () =>
    axiosWithAuth
        .get("users/protected/getGroup")
        .then((response) => response.data);
