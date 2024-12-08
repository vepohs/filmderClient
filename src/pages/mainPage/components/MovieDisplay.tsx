import React from "react";
import {SvgLike} from "./icons/SvgLike.tsx";
import {SvgDislike} from "./icons/SvgDislike.tsx";
// @ts-ignore
import "../style/MiddleMainPage.sass";

interface Movie {
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

interface MovieDisplayProps {
    movie: Movie;
    onLike: () => void;
    onDislike: () => void;
}

const MovieDisplay: React.FC<MovieDisplayProps> = ({movie, onLike, onDislike}) => {
    return (
        <div className="movieDisplay">
            <div className="imageContainer">
                <img src={movie.imagePath} alt="Movie Poster"/>
                <SvgLike onClick={onLike}/>
                <SvgDislike onClick={onDislike}/>
            </div>
            <div className="detailContainer">
                <div className="title_duration_container">
                    <div className="title">{movie.title}</div>
                    <div className="duration">{movie.duration} min</div>
                </div>
                <div className="releaseDate">{movie.releaseDate}</div>
                <div className="grade_votes_container">
                    <div className="votes">Votes: {movie.votes}</div>
                    <div className="averageGrade">{movie.averageGrade.toFixed(1)}/10</div>
                </div>
                <div className="synopsisContainer">
                    <div className="synopsis">{movie.synopsis}</div>
                </div>
                <div className="providersContainer">
                    {movie.providers.map((provider) => (
                        <div key={provider.id} className="provider">
                            <img src={provider.logoPath} alt={provider.name} className="providerLogo"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDisplay;
