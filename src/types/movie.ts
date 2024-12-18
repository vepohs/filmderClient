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

export interface MovieWithCount extends Movie {
    count: number;
}

export interface MovieResponse {
    movies: Movie[];
}