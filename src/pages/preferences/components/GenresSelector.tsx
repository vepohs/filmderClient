import React from "react";

// @ts-ignore
import "../_PreferencesPage.sass";

interface GenreSelectorProps {
    genres: { id: number; name: string }[];
    selectedGenres: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
}

const GenresSelector: React.FC<GenreSelectorProps> = ({genres, selectedGenres, setSelectedGenres}) => {
    const toggleGenre = (genreId: number) => {
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(genreId)
                ? prevSelected.filter((g) => g !== genreId)
                : [...prevSelected, genreId]
        );
    };


    return (
        <div className="genreContainer">
            {genres.map((genre) => (
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
