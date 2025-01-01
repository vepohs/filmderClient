import {useEffect, useState} from "react";
import {groupMoviesByLikes, mergeMovieAndLike, sortLikesDescending} from "../utils/groupLikeUtils.ts";
import {useSelectedGroup} from "../context/SelectedGroupContext.tsx";
import {User} from "../types/user.ts";
import {MovieWithLike} from "../types/movie.ts";
import {APIgetGroupMoviesCommon, APIgetGroupUsers, APISendGroupeSwipe} from "../services/groupLikeApiCall.ts";

export const useGroupLikeLogic = () => {
    const {selectedGroup} = useSelectedGroup();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [movies, setMovies] = useState<MovieWithLike[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieWithLike | null>(null);

    const getGroupUsers = async () => {
        try {
            const response: User[] = await APIgetGroupUsers(selectedGroup.groupId);
            setUsers(response);
            setSelectedUserIds(response.map((user) => user.id));
        } catch (error) {
            console.error("Error fetching group users:", error);
        }
    };

    const getGroupCommonMovies = async () => {
        try {
            const response = await APIgetGroupMoviesCommon(selectedUserIds, selectedGroup.groupId);
            const moviesWithLike = response.map(mergeMovieAndLike);
            setMovies(moviesWithLike);
        } catch (error) {
            console.error("Error fetching group common movies:", error);
        }
    };

    useEffect(() => {
        getGroupUsers();
    }, []);

    useEffect(() => {
        if (selectedUserIds.length > 0) {
            getGroupCommonMovies();
        }
    }, [selectedUserIds]);

    const toggleUserSelection = (id: string) => {
        setSelectedUserIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((userId) => userId !== id)
                : [...prevSelected, id]
        );
    };

    const openMoviePopup = (movie: MovieWithLike) => {
        setSelectedMovie(movie);
    };

    const closeMoviePopup = () => {
        setSelectedMovie(null);
    };

    const sendSwipeResponse = async (movieId: number, liked: boolean) => {
        try {
            await APISendGroupeSwipe(movieId, liked, selectedGroup.groupId);
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réponse :", error);
        }
    };

    const swiped = (liked: boolean, movieId: number) => {
        sendSwipeResponse(movieId, liked).then(() => {
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
        });
    };

    const moviesByLikes = groupMoviesByLikes(movies)
    const NbLikesDescending = sortLikesDescending(moviesByLikes)

    return {
        users,
        selectedUsersIds: selectedUserIds,
        toggleUserSelection,
        selectedMovie,
        openMoviePopup,
        closeMoviePopup,
        moviesByLikes,
        NbLikesDescending,
        swiped,
        selectedGroup
    };
};
