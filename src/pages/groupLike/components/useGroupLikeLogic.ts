// useGroupLikeLogic.ts
import {useCallback, useEffect, useState} from "react";
import {useSelectedGroup} from "../../../context/SelectedGroupContext/SelectedGroupContext.tsx";
import {User} from "../../../types/UsersTypes.ts";
import {APIgetGroupMoviesCommon, APIgetGroupUsers, APIsendSwipeResponse} from "./groupLikeApiCall.ts";
import {mapMovie} from "./groupLikeUtils.ts";
import {MovieWithCount} from "../../../types/MovieAndProviders.ts";


export const useGroupLikeLogic = () => {
    const {selectedGroup} = useSelectedGroup();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
    const [movies, setMovies] = useState<MovieWithCount[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieWithCount | null>(null);

    const getGroupUsers = useCallback(async () => {
        try {
            console.log("je suis dans getGroupUsers")
            const response: User[] = await APIgetGroupUsers(selectedGroup.groupId);
            setUsers(response);
            setSelectedUsersIds(response.map((user) => user.id));
        } catch (error) {
            console.error("Error fetching group users:", error);
        }
    }, [selectedGroup.groupId]);

    // Récupération des films communs selon les utilisateurs sélectionnés
    const getGroupCommonMovies = useCallback(async () => {
        try {
            const response = await APIgetGroupMoviesCommon(selectedUsersIds);
            const moviesWithDetails = response.map(mapMovie);
            setMovies(moviesWithDetails);
        } catch (error) {
            console.error("Error fetching group common movies:", error);
        }
    }, [selectedUsersIds]);

    useEffect(() => {
        getGroupUsers();
    }, [getGroupUsers]);

    useEffect(() => {
        if (selectedUsersIds.length > 0) {
            getGroupCommonMovies();
        }
    }, [selectedUsersIds, getGroupCommonMovies]);

    const toggleUserSelection = (id: string) => {
        setSelectedUsersIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((userId) => userId !== id)
                : [...prevSelected, id]
        );
    };

    const openMoviePopup = (movie: MovieWithCount) => {
        setSelectedMovie(movie);
    };

    const closeMoviePopup = () => {
        setSelectedMovie(null);
    };

    const sendSwipeResponse = async (movieId: number, liked: boolean) => {
        try {
            await APIsendSwipeResponse(movieId, liked, selectedGroup);
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réponse :", error);
        }
    };

    const swiped = (liked: boolean, movieId: number) => {
        sendSwipeResponse(movieId, liked).then(() => {
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
        });
    };

    // Tri et regroupement des films
    const sortedMovies = [...movies].sort((a, b) => b.count - a.count);
    const groupedMovies = sortedMovies.reduce((acc, movie) => {
        if (!acc[movie.count]) {
            acc[movie.count] = [];
        }
        acc[movie.count].push(movie);
        return acc;
    }, {} as Record<number, MovieWithCount[]>);

    return {
        users,
        selectedUsersIds,
        toggleUserSelection,
        selectedMovie,
        openMoviePopup,
        closeMoviePopup,
        groupedMovies,
        swiped,
        selectedGroup
    };
};
