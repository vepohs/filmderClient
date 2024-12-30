import {Genre, Provider} from "./genreAndProvider";

export interface Movie {
    providers: Provider[];
    genres: Genre[];
    synopsis: string;
    averageGrade: number;
    duration: number;
    id: number;
    imagePath: string;
    releaseDate: string;
    title?: string;
    votes: number;
    videoPath?: string;
}

export interface MovieWithLike extends Movie {
    nbLike: number;
}

export interface MovieResponse {
    movies: Movie[];
}

export interface MovieWithLikeResponse {
    movie: Movie;
    count: number;
}
