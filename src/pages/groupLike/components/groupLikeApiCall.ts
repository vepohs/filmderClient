import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";
import {Group} from "../../../types/SelectedGroupTypes.ts";
import {User} from "../../../types/UsersTypes.ts";
import {MovieWithCount} from "../../../types/MovieAndProviders.ts";


export const APIgetGroupUsers = (groupId: string): Promise<User[]> =>
    axiosWithAuth
        .post("group/protected/getGroupUsers", {groupId})
        .then((response) => response.data);

export const APIgetGroupMoviesCommon = (usersId: string[]): Promise<MovieWithCount[]> =>
    axiosWithAuth
        .post("group/protected/getGroupMoviesCommon", {usersId})
        .then((response) => response.data); // Assurez-vous que `mapMovie` est importé ou défini correctement


export const APIsendSwipeResponse = (movieId: number, liked: boolean, group: Group) =>
    axiosWithAuth
        .post("group/protected/swipeMovieGroup", {movieId, liked, group});
