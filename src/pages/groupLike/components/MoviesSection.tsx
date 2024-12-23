// MoviesSection.tsx
import React from "react";
import {CardContainer} from "../../../common/components/CardContainer.tsx";
import {MovieWithCount} from "../../../types/movie.ts";

// @ts-ignore
import "../GroupLike.sass"

interface MoviesSectionProps {
    count: number;
    movies: MovieWithCount[];
    onMovieClick: (movie: MovieWithCount) => void;
    onSwipe: (liked: boolean, movieId: number) => void;
}

export const MoviesSection: React.FC<MoviesSectionProps> = ({count, movies, onMovieClick, onSwipe}) => {
    return (
        <li className="sectionItem">
            <h2>{"❤️".repeat(count)}</h2>

            {
                /*
                <h2>
                    {Array.from({length: count}).map((_, index) => (
                        <span key={index}>❤️</span>
                    ))}
                </h2>
                
                 */
            }

            <ul className='movieContainer'>
                {movies.map((movie) => (
                    <li key={movie.id} className="movieItem">
                        <CardContainer
                            firstBackgroundImage={movie.imagePath}
                            onSwipe={(liked) => onSwipe(liked, movie.id)}
                            onClick={(e) => {
                           e.stopPropagation(); // Arrête la propagation de l'événement
                           onMovieClick(movie);
                           }}
                        />
                    </li>
                ))}
            </ul>
        </li>
    );
};
