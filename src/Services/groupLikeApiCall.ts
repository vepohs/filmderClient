import axiosWithAuth from "../Utils/axiosWithAuth.ts";
import {User} from "../types/UsersTypes.ts";
import {MovieWithCount} from "../types/MovieAndProviders.ts";


export const APIgetGroupUsers = (groupId: string): Promise<User[]> =>
    axiosWithAuth
        .post("group/protected/getGroupUsers", {groupId})
        .then((response) => response.data);

export const APIgetGroupMoviesCommon = (usersId: string[], groupId:string): Promise<MovieWithCount[]> =>
    axiosWithAuth
        .post("group/protected/getGroupMoviesCommon", {usersId, groupId})
        .then((response) => response.data); // Assurez-vous que `mapMovie` est importé ou défini correctement


export const APISendGroupeSwipe = (movieId: number, liked: boolean, groupId: string) =>
    axiosWithAuth
        .post("group/protected/swipeMovieGroup", {movieId, liked, groupId});
