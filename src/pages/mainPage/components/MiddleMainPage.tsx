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
    const [index, setIndex] = useState<number>(0);
    const [imgPath, setImgPath] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchMovies() {
        try {
            const response = await axiosWithAuth.get<MovieResponse>("/movie/protected/getMovie");
            if (response.data.movie && response.data.movie.length > 0) {
                setMovies(response.data.movie);
                setImgPath(response.data.movie[0].imagePath);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du film :", error);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 0 && movies[index]) {
            setImgPath(movies[index].imagePath);
        }
    }, [index, movies]);

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

    const handleLike = async () => {
        if (movies.length > 0 && movies[index]) {
            sendSwipeResponse(movies[index].id, true);
            handleNextImage();
        }
    };

    const handleDislike = async () => {
        if (movies.length > 0 && movies[index]) {
            sendSwipeResponse(movies[index].id, false);
            handleNextImage();
        }
    };

    const handleNextImage = async () => {
        if (movies.length > 0) {
            if (index + 1 > movies.length - 1) {
                setLoading(true)
                await fetchMovies();
                setIndex(0)
                setLoading(false)
            } else {
                console.log("Passage à l'image suivante...");
                setIndex((prevIndex) => (prevIndex + 1));
            }
        }
    };

    return (
        <div className="middleMainPage">
            <div className="imageContainer">
                <img src={imgPath!} style={{width: "400px", height: "400px"}} alt="Image description"/>
                <button onClick={handleLike}>
                    LIKE
                </button>
                <button onClick={handleDislike} disabled={loading}>
                    DISLIKE
                </button>
            </div>
        </div>
    );
}
