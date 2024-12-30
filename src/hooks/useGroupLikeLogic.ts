import {useCallback, useEffect, useState} from "react";
import {mapMovie} from "../utils/groupLikeUtils.ts";
import {useSelectedGroup} from "../context/SelectedGroupContext.tsx";
import {User} from "../types/user.ts";
import {MovieWithCount} from "../types/movie.ts";
import {APIgetGroupMoviesCommon, APIgetGroupUsers, APISendGroupeSwipe} from "../services/groupLikeApiCall.ts";


export const useGroupLikeLogic = () => {
    const {selectedGroup} = useSelectedGroup();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
    const [movies, setMovies] = useState<MovieWithCount[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieWithCount | null>(null);

    const getGroupUsers = useCallback(async () => {
        try {
            const response: User[] = await APIgetGroupUsers(selectedGroup.groupId);
            setUsers(response);
            setSelectedUsersIds(response.map((user) => user.id));
        } catch (error) {
            console.error("Error fetching group users:", error);
        }
    }, [selectedGroup.groupId]);

    const getGroupCommonMovies = useCallback(async () => {
        try {
            const response = await APIgetGroupMoviesCommon(selectedUsersIds, selectedGroup.groupId);
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

    // On regroupe les films par leur "count" de likes
    /* La sortie
    {
  5: [ ...films avec 5 likes... ],
  3: [ ...films avec 3 likes... ],
  2: [ ...films avec 2 likes... ]
}
     */
    const moviesByCount = movies.reduce((acc, movie) => {
        if (!acc[movie.count]) {
            acc[movie.count] = [];
        }
        acc[movie.count].push(movie);
        return acc;
    }, {} as Record<number, MovieWithCount[]>);

// On récupère les différents "counts" (clés) et on les trie par ordre décroissant
    /* La sortie
    [5, 3, 2]
     */
    const sortedCounts = Object.keys(moviesByCount)
        .map(strKey => parseInt(strKey))
        .sort((a, b) => b - a);

    return {
        users,
        selectedUsersIds,
        toggleUserSelection,
        selectedMovie,
        openMoviePopup,
        closeMoviePopup,
        moviesByCount,
        sortedCounts,
        swiped,
        selectedGroup
    };
};
