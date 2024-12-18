import {SvgLike} from "../../pages/mainPage/components/icons/SvgLike.tsx";
import {SvgDislike} from "../../pages/mainPage/components/icons/SvgDislike.tsx";
import {CardContainer} from "./CardContainer.tsx";
import {SVGEye} from "../../pages/mainPage/components/icons/SVGEye.tsx";
import {useState} from "react";
import {Movie} from "../../types/movie.ts";

// @ts-ignore
import "../style/MovieDisplay.sass";

interface MovieDisplayProps {
    movie1: Movie;
    movie2?: Movie;
    onSwipe: (liked: boolean) => void;
}

export function MovieDisplay({movie1, movie2, onSwipe}: MovieDisplayProps) {
    const [showTrailer, setShowTrailer] = useState(false);
    const toggleTrailerDisplay = () => {
        setShowTrailer((prev) => !prev);
    };

    const handleSwipe =  (liked: boolean) => {
        onSwipe(liked);
        setShowTrailer(false);
    }

    return (
        <>
            <div className="imageContainer">
                <CardContainer
                    className={showTrailer}
                    onSwipe={(liked) => {
                        handleSwipe(liked);
                    }}
                    firstBackgroundImage={movie1.imagePath}
                    {...(movie2?.imagePath ? {secondBackgroundImage: movie2.imagePath} : {})}
                />
                <SvgDislike onClick={() => {
                    handleSwipe(false)
                }}/>
                <SvgLike onClick={() => {
                    handleSwipe(true)
                }}/>

                {movie1.videoPath && <SVGEye onClick={() => toggleTrailerDisplay()}/>}
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


