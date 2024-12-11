// GroupMoviesSections.tsx
import React from "react";
import {MovieWithCount} from "../../../types/MovieAndProviders.ts";
import {MoviesSection} from "./MoviesSection.tsx";


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
            <h2>Films et likes du groupe</h2>
            <ul>
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
