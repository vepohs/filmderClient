import axiosWithAuth from "../utils/axiosWithAuth.ts";
import {MovieResponse} from "../types/movie.ts";

export const APIgetMovies = (excludedMovieIds: number[], groupId: string): Promise<MovieResponse> => {
    return groupId === "me"
        ? APIgetMoviesForUser(excludedMovieIds)
        : APIgetMoviesForGroup(excludedMovieIds, groupId);
}

export const APIgetMoviesForUser = (excludedMovieIds: number[]) =>
    axiosWithAuth
        .post<MovieResponse>("movie/protected/getMovie", {excludedMovieIds})
        .then((response) => response.data);


export const APIgetMoviesForGroup = (excludedMovieIds: number[], groupId: string) =>
    axiosWithAuth
        .post<MovieResponse>("movie/protected/getGroupMovie", {excludedMovieIds, groupId})
        .then((response) => response.data);

export const APIsendSwipeResponse = (movieId: number, liked: boolean) =>
    axiosWithAuth.post("/users/protected/swipeMovie", { movieId, liked });