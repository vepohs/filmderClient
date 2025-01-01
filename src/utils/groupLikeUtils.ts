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

// On regroupe les films par leur "count" de likes
/* La sortie
{
5: [ ...films avec 5 likes... ],
3: [ ...films avec 3 likes... ],
2: [ ...films avec 2 likes... ]
}
 */

export const groupMoviesByLikes = (movies: MovieWithLike[]): Record<number, MovieWithLike[]> => {
    return movies.reduce((acc, movie) => {
        if (!acc[movie.nbLike]) {
            acc[movie.nbLike] = [];
        }
        acc[movie.nbLike].push(movie);
        return acc;
    }, {} as Record<number, MovieWithLike[]>);
};

// On récupère les différents "counts" (clés) et on les trie par ordre décroissant
/* La sortie
[5, 3, 2]
 */
export const sortLikesDescending = (moviesByCount: Record<number, MovieWithLike[]>): number[] => {
    return Object.keys(moviesByCount)
        .map((strKey) => parseInt(strKey, 10))
        .sort((a, b) => b - a);
};