// @ts-ignore
import "../style/MiddleMainPage.sass";
import {useEffect, useState} from "react";
import axiosWithAuth from "../../../axiosUtils/axiosConfig.ts";
import {Like} from "../../../common/icons/Like.tsx";

export function MiddleMainPage() {
    const [movie, setMovie] = useState(null); // State pour stocker la réponse
    const [index, setIndex] = useState(0); // Index pour contrôler l'image affichée
    const [imgPath, setImgPath] = useState(null);

    useEffect(() => {
        // Fonction pour faire la requête asynchrone
        const fetchMovie = async () => {
            try {
                const response = await axiosWithAuth.get("/movie/protected/getMovie");
                setMovie(response.data); // Enregistre les données dans le state
                console.log(response); // Log si nécessaire

                // Définit l'image initiale
                if (response.data.movie && response.data.movie.length > 0) {
                    setImgPath(response.data.movie[0].imagePath);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du film :", error);
            }
        };

        fetchMovie();
    }, []);

    useEffect(() => {
        // Met à jour l'image en fonction de l'index actuel
        // @ts-ignore
        if (movie && movie.movie && movie.movie[index]) {
            // @ts-ignore
            setImgPath(movie.movie[index].imagePath);
        }
    }, [index, movie]);

    // Fonction pour passer à l'image suivante
    const handleNextImage = () => {
        // @ts-ignore
        if (movie && movie.movie) {
            // @ts-ignore
            setIndex((prevIndex) => (prevIndex + 1) % movie.movie.length);
        }
    };

    return (
        <div className="middleMainPage">
            <div className="imageContainer">
                <img src={imgPath!} style={{width: "400px", height: "400px"}} alt="Image description"/>
                <button onClick={handleNextImage}>
                    <Like/>
                </button>
            </div>
        </div>
    );
}
