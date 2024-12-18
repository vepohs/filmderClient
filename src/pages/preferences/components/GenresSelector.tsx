import React from "react";
import {usePreferences} from "../../../context/preferenceContext.tsx";
// @ts-ignore
import "../PreferencesPage.sass";

const GenresSelector: React.FC = () => {
    const {setSelectedGenres, allGenres, selectedGenres} = usePreferences();

    const toggleGenre = (genreId: number) => {
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(genreId)
                ? prevSelected.filter((g) => g !== genreId)
                : [...prevSelected, genreId]
        );
    };


    return (
        <>
            <h1>Genres</h1>
    <div className="genreContainer">
            {allGenres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`genreButton ${selectedGenres.includes(genre.id) ? "selected" : ""}`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
        </>
    );
};

export default GenresSelector;
