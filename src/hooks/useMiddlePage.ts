import {useEffect, useRef, useState} from "react";
import {Movie, MovieResponse} from "../types/movie.ts";
import {useSelectedGroup} from "../context/SelectedGroupContext.tsx";
import {APIgetMovies, APIsendSwipeResponse} from "../services/MiddlePageAPICalls.ts";


const MOVIES_FETCH_THRESHOLD = 19;

export function useMiddleMainPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { selectedGroup } = useSelectedGroup();

    const firstMovie = movies[0];
    const secondMovie = movies[1];

    useEffect(() => {
        setMovies([]);
        fetchMovies([]);
    }, [selectedGroup]);

    async function fetchMovies(excludedMovieIds: number[]) {
        if (loading) return;
        setLoading(true);
        try {
            const response: MovieResponse = await APIgetMovies(excludedMovieIds, selectedGroup.groupId);
            const newMovies = response.movies || [];
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSwipe(liked: boolean) {
        if (!firstMovie) return;
/*
ATTENTION, ici c'est super interessant mais c'est ok de faire un removeSwipeMovie avant d'envoyer
le swipe car le setMovie c'est async et ducoup ca swipera le bon film car firstMovie a tjrs la bonne valeur car
il a pas encore reelement été changé
 */
        removeSwipedMovie();
        resetScroll();
        await sendSwipeResponse(firstMovie.id, liked);
        await fetchMoviesIfNeeded();
    }

    function removeSwipedMovie() {
        setMovies((prevMovies) => prevMovies.slice(1));
    }
    function resetScroll() {
        if (containerRef.current) {
            containerRef.current.scrollTo(0, 0);
        }
    }

    async function sendSwipeResponse(movieId: number, liked: boolean) {
        try {
            await APIsendSwipeResponse(movieId, liked);
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réponse :", error);
        }
    }

    async function fetchMoviesIfNeeded() {
        if (movies.length <= MOVIES_FETCH_THRESHOLD && !loading) {
            const excludedMovieIds = movies.map((movie) => movie.id);
            await fetchMovies(excludedMovieIds);
        }
    }

    return {
        movies,
        loading,
        firstMovie,
        secondMovie,
        containerRef,
        handleSwipe,
    };
}
