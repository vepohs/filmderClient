import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {MovieResponse} from "../../types/SelectedGroupTypes.ts";
/*
attention ici y a pas {} car c est considerer comme une ligne donc pas besoin
pas d'accolade = return implicite
 */

export const getMovies = (listExcluedIds: number[], groupId: string): Promise<MovieResponse> => {
    return groupId === "me"
        ? getMoviesForUser(listExcluedIds)
        : getMoviesForGroup(listExcluedIds, groupId);
}

export const getMoviesForUser = (listExcluedIds: number[]) =>
    axiosWithAuth
        .post<MovieResponse>("movie/protected/getMovie", {listExcluedIds})
        .then((response) => response.data);


export const getMoviesForGroup = (listExcluedIds: number[], groupId: string) =>
    axiosWithAuth
        .post<MovieResponse>("movie/protected/getGroupMovie", {listExcluedIds, groupId})
        .then((response) => response.data);


export const getUserGroups = () =>
    axiosWithAuth
        .get("users/protected/getGroup")
        .then((response) => response.data);