import React from "react";

// @ts-ignore
import "../_PreferencesPage.sass";
import {usePreferences} from "../../../context/PreferenceContext.tsx";


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
    );
};

export default GenresSelector;
