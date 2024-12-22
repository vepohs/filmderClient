import {Genre, Provider} from "../types/genreAndProvider.ts";
import {MovieWithCount} from "../types/movie.ts";
import {handleErrorToast, handleSuccessToast} from "./toastUtils.ts";

export const mapMovie = (item: any): MovieWithCount => ({
    ...item.movie,
    count: item.count,
    providers: item.movie.providers.map((provider: Provider) => ({
        id: provider.id,
        name: provider.name,
        logoPath: provider.logoPath,
    })),
    genres: item.movie.genres.map((genre: Genre) => ({
        id: genre.id,
        name: genre.name,
    })),
});

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => handleSuccessToast("Copié dans le presse-papier"))
        .catch(() => handleErrorToast("Erreur lors de la copie dans le presse-papier"));
};
