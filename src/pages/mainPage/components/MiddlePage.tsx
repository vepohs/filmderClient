// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "../style/MiddleMainPage.sass";
import {useEffect, useRef, useState} from "react";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";
import {MovieDisplay} from "./MovieDisplay.tsx";

interface Movie {
    // TODO je sais pas trop le type qu'on doit mettre
    providers: Provider[];
    synopsis: string;
    averageGrade: number;
    duration: number;
    id: number;
    imagePath: string;
    releaseDate: string;
    title?: string;
    votes: number;
}

interface Provider {
    id: number;
    name: string;
    logoPath: string;
}

export function MiddleMainPage() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);


    const {fetchMoviesForGroup, selectedGroup} = useSelectedGroup();


    useEffect(() => {
        setMovies([]);
        fetchMovies([]);
    }, [selectedGroup]);

    const fetchMovies = async (excludedIds: number[]) => {
        if (loading) return; // Éviter les appels multiples en cas de chargement en cours
        setLoading(true);
        const newMovies = await fetchMoviesForGroup(excludedIds);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setLoading(false);
    };

    const sendSwipeResponse = async (movie: number, liked: boolean) => {
        try {
            await axiosWithAuth.post("/users/protected/swipeMovie", {
                movie,
                liked,
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réponse :", error);
        }
    };

    const handleSwipe = (liked: boolean) => {
        console.log(liked)
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