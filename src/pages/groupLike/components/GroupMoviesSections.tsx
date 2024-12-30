import React from "react";
import {MoviesSection} from "./MoviesSection.tsx";
import {MovieWithLike} from "../../../types/movie.ts";
import {Link} from "react-router-dom";

// @ts-ignore
import "../styles/GroupMoviesSections.sass";

interface GroupMoviesSectionsProps {
    sortedCounts: number[];
    moviesByCount: Record<number, MovieWithLike[]>;
    onMovieClick: (movie: MovieWithLike) => void;
    onSwipe: (liked: boolean, movieId: number) => void;
}

export const GroupMoviesSections: React.FC<GroupMoviesSectionsProps> = ({
                                                                            sortedCounts,
                                                                            moviesByCount,
                                                                            onMovieClick,
                                                                            onSwipe
                                                                        }) => {
    if (sortedCounts.length === 0) {
        return (
            <p className="noMoviesMessage">
                Aucun film en commun pour le moment. <br/>Sélectionnez le groupe sur{" "}
                <Link to="/protected" className="mainPageLink">
                    la page principale
                </Link>{" "}
                et aimez des films !
            </p>
        );
    }
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
