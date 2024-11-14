// components/GenresSelector.tsx
import React, {useState} from "react";
import "../_UserPreferences.sass";


interface GenreSelectorProps {
    genres: { id: number; name: string }[];
}

const GenresSelector: React.FC<GenreSelectorProps> = ({genres}) => {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    const toggleGenre = (genreId: number) => {
        console.log("c est clické ma gueule" + genreId)
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
