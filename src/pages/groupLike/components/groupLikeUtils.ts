// Fonction utilitaire pour mapper un film
import {Genre, Provider} from "../../../types/GenresAndProviders.ts";
import {MovieWithCount} from "../../../types/MovieAndProviders.ts";

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
        .then(() => alert("Texte copié dans le presse-papiers !"))
        .catch((error) => console.error("Erreur lors de la copie :", error));
};
