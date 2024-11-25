// @ts-ignore
import "../style/MiddleMainPage.sass";
import {useEffect, useState} from "react";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";

interface Movie {
    id: number;
    imagePath: string;
    title?: string; // Ajoutez d'autres champs si nécessaire
}

interface MovieResponse {
    movie: Movie[];
}

export function MiddleMainPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchMovies(): Promise<void> {
        try {
            if (loading) return;
            setLoading(true);

            console.log("FETCH MOVIES");
            console.log("MOVIES :", movies);
            const moviesIds = movies.map((movie) => movie.id);
            // const params = moviesIds.length > 0 ? { excludeIds: moviesIds.join(',') } : {};
            console.log("MOVIES IDS :", moviesIds);
            console.log(moviesIds)
            const response = await axiosWithAuth.post<MovieResponse>("/movie/protected/getMovie", {
                listExcluedIds: moviesIds,
            });
            console.log("REPONSE :", response);
            if (response.data.movie && response.data.movie.length > 0) {
                console.log("FILM RECUUUU :", response.data.movie);
                setMovies((prevMovies) => [...prevMovies, ...response.data.movie]); // Ajout des nouveaux films à la liste existante
                console.log("tous les films", movies);
            } else {
                console.log("Aucun film reçu");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du film :", error);
        } finally {
            setLoading(false);
        }
        console.log("tous les films", movies);
    }

    useEffect(() => {
        fetchMovies();
    }, []);

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

    const handleLike = () => {
        if (movies.length > 0) {
            sendSwipeResponse(movies[0].id, true);
            handleNextImage();
        }
    };

    const handleDislike = () => {
        if (movies.length > 0) {
            sendSwipeResponse(movies[0].id, false);
            handleNextImage();
        }
    };

    const handleNextImage = async () => {
        if (movies.length > 0) {
            setMovies((prevMovies) => prevMovies.slice(1)); // Crée une nouvelle liste sans le premier élément

            if (movies.length <= 19 && !loading) {
                await fetchMovies();
            }
        }
    };

    if (!movies.length) {
        return (
            //TODO mettre une animation de login
            <h1>Aucun film à afficher pour le moment. Veuillez réessayer plus tard.</h1>
        );
    }

    const logout = async () => {
        const response = await axiosWithAuth.post("/auth/logout")
        // localStorage.removeItem("accessToken")
        console.log(response)
    }

    return (
        <div className="middleMainPage">
            <div className="imageContainer">
                <img src={movies[0].imagePath} style={{width: "400px", height: "400px"}} alt="Image description"/>
                <button onClick={handleLike}>
                    LIKE
                </button>
                <button onClick={handleDislike}>
                    DISLIKE
                </button>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
