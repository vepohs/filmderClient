import React from "react";
import {MovieDisplay} from "../../../common/components/MovieDisplay.tsx";
import {MovieWithCount} from "../../../types/movie.ts";


interface MoviePopupProps {
    movie: MovieWithCount;
    onClose: () => void;
    onSwipe: (liked: boolean, movieId: number) => void;
}

export const MoviePopup: React.FC<MoviePopupProps> = ({movie, onClose, onSwipe}) => {
    return (
        <div className="popupOverlay" onClick={onClose}>
            <div className="popupContent">
                <MovieDisplay
                    movie1={movie}
                    onSwipe={(liked) => {
                        onSwipe(liked, movie.id);
                        onClose();
                    }}
                />
            </div>
        </div>
    );
};
