import {SvgLike} from "./icons/SvgLike.tsx";
import {SvgDislike} from "./icons/SvgDislike.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "../style/MovieDisplay.sass";
import {CardContainer} from "./CardContainer.tsx";
import {Movie} from "../../../types/MovieAndProviders.ts";
import {SVGEye} from "./icons/SVGEye.tsx";
import {useState} from "react";


interface MovieDisplayProps {
    movie1: Movie;
    movie2?: Movie;
    onSwipe: (liked: boolean) => void;
}

export function MovieDisplay({movie1, movie2, onSwipe}: MovieDisplayProps) {
    const [showTrailer, setShowTrailer] = useState(false);
    const onShowTrailer = () => {
        setShowTrailer((prev) => !prev); // Alterne entre afficher et masquer le trailer
    };
    return (
        <>
            <div className="imageContainer">
                <CardContainer
                    className={showTrailer}
                    onSwipe={(liked) => {
                        onSwipe(liked);
                        setShowTrailer(false);
                    }}
                    firstBackgroundImage={movie1.imagePath}
                    {...(movie2?.imagePath ? {secondBackgroundImage: movie2.imagePath} : {})}
                />
                <SvgDislike onClick={() => {
                    onSwipe(false);
                    setShowTrailer(false)
                }}/>
                <SvgLike onClick={() => {
                    onSwipe(true);
                    setShowTrailer(false);
                }}/>

                {movie1.videoPath && <SVGEye onClick={() => onShowTrailer()}/>}
                {showTrailer && movie1.videoPath && (
                    <div className="videoContainer">
                        <iframe className="video"
                                src={`https://www.youtube.com/embed/${movie1.videoPath}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                        ></iframe>
                    </div>
                )}
            </div>

            <div className="detailContainer">
                <div className="title_duration_container">
                    <div className="title">{movie1.title}</div>
                    <div className="duration">{movie1.duration} min</div>
                </div>
                <div className="releaseDate">{movie1.releaseDate}</div>
                <div className="grade_votes_container">
                    <div className="votes">Votes: {movie1.votes}</div>
                    <div className="averageGrade">{movie1.averageGrade.toFixed(1)}/10</div>
                </div>
                <div className="synopsisContainer">
                    <div className="synopsis">{movie1.synopsis}</div>
                </div>
                <div className="providersContainer">
                    {movie1.providers.map((provider) => (
                        <div key={provider.id} className="provider">
                            <img src={provider.logoPath} alt={provider.name} className="providerLogo"/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}


