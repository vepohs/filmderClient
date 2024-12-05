// @ts-ignore
import "../style/MiddleMainPage.sass";
import React, {useEffect, useRef, useState} from "react";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";
import {SvgLike} from "./icons/SvgLike.tsx";
import {SvgDislike} from "./icons/SvgDislike.tsx";
import {useSelectedGroup} from "../../../context/SelectedGroupContext.tsx";

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


const MiddleMainPage: React.FC = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const containerRef = useRef(null);


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
                <SvgLike onClick={() => handleSwipe(true)}/>
                <SvgDislike onClick={() => handleSwipe(false)}/>
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
                    {movies[0].providers.map((provider: Provider) => (
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