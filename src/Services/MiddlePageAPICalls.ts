import axiosWithAuth from "../Utils/axiosWithAuth.ts";
import {MovieResponse} from "../types/SelectedGroupTypes.ts";

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

export const APIsendSwipeResponse = (movieId: number, liked: boolean) =>
    axiosWithAuth.post("/users/protected/swipeMovie", { movieId, liked });