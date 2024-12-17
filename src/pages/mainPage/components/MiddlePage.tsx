// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "../style/MiddleMainPage.sass";
import {useEffect, useRef, useState} from "react";
import axiosWithAuth from "../../../Utils/axiosWithAuth.ts";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import {MovieDisplay} from "./MovieDisplay.tsx";
import {Movie} from "../../../types/MovieAndProviders.ts";
import {MovieResponse} from "../../../types/SelectedGroupTypes.ts";


export function MiddleMainPage() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const {selectedGroup} = useSelectedGroup();
    
    useEffect(() => {
        setMovies([]);
        fetchMovies([]);
    }, [selectedGroup]);

    const fetchMovies = async (excludedIds: number[]) => {
        if (loading) return; // Éviter les appels multiples en cas de chargement en cours
        setLoading(true);
        const newMovies = await loadMovies(excludedIds);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setLoading(false);
    };

    const sendSwipeResponse = async (movieId: number, liked: boolean) => {
        try {
            await axiosWithAuth.post("/users/protected/swipeMovie", {
                movieId,
                liked,
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réponse :", error);
        }
    };

    const handleSwipe = (liked: boolean) => {
        console.log(movies)
        if (movies.length > 0) {
            sendSwipeResponse(movies[0].id, liked); // "liked" indique si c'est un like ou un dislike
            handleNextImage();
            if (containerRef.current) {
                containerRef.current.scrollTo(0, 0);
            }
        }
    };

    const handleNextImage = async () => {
        if (movies.length > 0) {
            setMovies((prevMovies) => prevMovies.slice(1)); // Crée une nouvelle liste sans le premier élément

            if (movies.length <= 19 && !loading) {
                await fetchMovies(movies.map((movie) => movie.id));
            }
        }
    };
    const swiped = (liked: boolean) => {
        handleSwipe(liked);
    };

    const loadMovies = async (excludedIds: number[]): Promise<Movie[]> => {
        try {
            const response: MovieResponse = await APIgetMovies(excludedIds, selectedGroup.groupId);
            return response.movies || [];
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    };

     const APIgetMovies = (listExcluedIds: number[], groupId: string): Promise<MovieResponse> => {
        return groupId === "me"
            ? APIgetMoviesForUser(listExcluedIds)
            : APIgetMoviesForGroup(listExcluedIds, groupId);
    }

     const APIgetMoviesForUser = (listExcluedIds: number[]) =>
        axiosWithAuth
            .post<MovieResponse>("movie/protected/getMovie", {listExcluedIds})
            .then((response) => response.data);


     const APIgetMoviesForGroup = (listExcluedIds: number[], groupId: string) =>
        axiosWithAuth
            .post<MovieResponse>("movie/protected/getGroupMovie", {listExcluedIds, groupId})
            .then((response) => response.data);



    return (
        <div className="middleMainPage" ref={containerRef}>
            {!movies.length ? (
                <div className="spinner"></div>
            ) : (
                <MovieDisplay
                    movie1={movies[0]}
                    movie2={movies[1]}
                    onSwipe={swiped}
                />
            )}
        </div>
    );

}