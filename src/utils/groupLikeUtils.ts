import {MovieWithLike, MovieWithLikeResponse} from "../types/movie.ts";
import {handleErrorToast, handleSuccessToast} from "./toastUtils.ts";

export const mergeMovieAndLike = (item: MovieWithLikeResponse): MovieWithLike => ({
    ...item.movie,
    nbLike: item.count,
});

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => handleSuccessToast("Copié dans le presse-papier"))
        .catch(() => handleErrorToast("Erreur lors de la copie dans le presse-papier"));
};
