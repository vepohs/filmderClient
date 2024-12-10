import {Genre, Provider} from "./GenresAndProviders.ts";

export interface Movie {
    // TODO je sais pas trop le type qu'on doit mettre
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
}

export interface MovieWithCount extends Movie {
    count: number;
}
