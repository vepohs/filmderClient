// @ts-ignore
import "../style/MiddleMainPage.sass";
import React, {useEffect, useRef, useState} from "react";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";
import {SvgLike} from "./SvgLike.tsx";
import {SvgDislike} from "./SvgDislike.tsx";
import {useParams} from "react-router-dom";

interface Movie {
    id: number;
    imagePath: string;
    title?: string; // Ajoutez d'autres champs si nécessaire
}

interface MovieResponse {
    movie: Movie[];
}

interface PreferencesFormProps {
    type: "user" | "group";
}

const MiddleMainPage: React.FC<PreferencesFormProps> = ({type}) => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const containerRef = useRef(null);

    const {groupId} = useParams<{ groupId: string }>();
    
    // Recharger les films si `groupId` ou `type` change
    useEffect(() => {
        // Réinitialiser les films lorsque le groupe change
        setMovies([]);
        if (type === "group" && !groupId) {
            console.error("groupId est requis pour un groupe.");
            return;
        }
        fetchMovies();
    }, [groupId, type]);

    const requestMovies = (excludedIds: number[]) => {
        if (type === "user") {
            return axiosWithAuth.post<MovieResponse>("movie/protected/getMovie", {
                listExcluedIds: excludedIds,
            });
        } else if (type === "group") {
            if (!groupId) {
                throw new Error("groupId est requis pour récupérer les films d'un groupe.");
            }
            return axiosWithAuth.post<MovieResponse>("movie/protected/getGroupMovie", {
                listExcluedIds: excludedIds,
                groupId,
            });
        } else {
            throw new Error("Type invalide");
        }
    };

    async function fetchMovies(): Promise<void> {
        try {
            if (loading) return;
            setLoading(true);

            console.log("FETCH MOVIES");
            console.log("MOVIES :", movies);
            // a vérif mais je crois que movie id c'est le film qu'on a deja quoi
            const moviesIds = movies.map((movie) => movie.id);
            // const params = moviesIds.length > 0 ? { excludeIds: moviesIds.join(',') } : {};
            console.log("MOVIES IDS :", moviesIds);
            console.log(moviesIds)
            const response = await requestMovies(moviesIds);
            console.log("REPONSE :", response);
            if (response.data.movies && response.data.movies.length > 0) {
                console.log("FILM RECUUUU :", response.data.movies);
                setMovies((prevMovies) => [...prevMovies, ...response.data.movies]); // Ajout des nouveaux films à la liste existante
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
            if (containerRef.current) {
                containerRef.current.scrollTo(0, 0);
            }
        }
    };

    const handleDislike = () => {
        if (movies.length > 0) {
            sendSwipeResponse(movies[0].id, false);
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


    return (
        <div className="middleMainPage" ref={containerRef}>
            <div className="imageContainer">
                <img src={movies[0].imagePath} alt="Image description"/>
                <SvgLike onClick={handleLike}>
                </SvgLike>
                <SvgDislike onClick={handleDislike}>
                </SvgDislike>
            </div>
            <div className="detailContainer">
                <div className='title_duration_container'>
                    <div className='title'>{movies[0].title}</div>
                    <div className='duration'>{movies[0].duration} min</div>
                </div>
                <div className='releaseDate'>{movies[0].releaseDate}</div>
                <div className='grade_votes_container'>
                    <div className='votes'> Votes: {movies[0].votes} </div>
                    <div className='averageGrade'>{movies[0].averageGrade.toFixed(1)}/10</div>
                </div>

                <div className='synopsisContainer'>
                    <div className='synopsis'>{movies[0].synopsis}</div>
                </div>
                <div className="providersContainer">
                    {movies[0].providers.map((provider) => (
                        <div key={provider.id} className="provider">
                            <img src={provider.logoPath} alt={provider.name} className="providerLogo"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default MiddleMainPage;