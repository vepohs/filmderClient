// components/GenresSelector.tsx
import React, {useState} from "react";


interface GenreSelectorProps {
    genres: string[];
}

const GenresSelector: React.FC<GenreSelectorProps> = ({genres}) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(genre)
                ? prevSelected.filter((g) => g !== genre)
                : [...prevSelected, genre]
        );
    };

    return (
        <div className="genreContainer">
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`genreButton ${selectedGenres.includes(genre) ? "selected" : ""}`}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenresSelector;
