import React from "react";
import {MoviesSection} from "./MoviesSection.tsx";
import {MovieWithCount} from "../../../types/movie.ts";


interface GroupMoviesSectionsProps {
    sortedCounts: number[]; // Tableau de counts triés
    moviesByCount: Record<number, MovieWithCount[]>; // Objet de groupe de films
    onMovieClick: (movie: MovieWithCount) => void;
    onSwipe: (liked: boolean, movieId: number) => void;
}

export const GroupMoviesSections: React.FC<GroupMoviesSectionsProps> = ({
                                                                            sortedCounts,
                                                                            moviesByCount,
                                                                            onMovieClick,
                                                                            onSwipe
                                                                        }) => {

    return (
        <>
            <ul className='ul-container'>
                {sortedCounts.map((count) => {
                    const moviesForThisCount = moviesByCount[count];
                    return (
                        <MoviesSection
                            key={count}
                            count={count}
                            movies={moviesForThisCount}
                            onMovieClick={onMovieClick}
                            onSwipe={onSwipe}
                        />
                    );
                })}
            </ul>
        </>
    );
};
