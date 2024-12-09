export interface Movie {
    // TODO je sais pas trop le type qu'on doit mettre
    providers: Provider[];
    synopsis: string;
    averageGrade: number;
    duration: number;
    id: number;
    imagePath: string;
    releaseDate: string;
    title?: string;
    votes: number;
}

export interface Provider {
    id: number;
    name: string;
    logoPath: string;
}
