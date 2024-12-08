import {SvgLike} from "./icons/SvgLike.tsx";
import {SvgDislike} from "./icons/SvgDislike.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "../style/MiddleMainPage.sass"; 
import {CardContainer} from "./CardContainer.tsx";

interface Movie {
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

interface Provider {
    id: number;
    name: string;
    logoPath: string;
}

interface MovieDisplayProps {
    movie1: Movie;
    movie2?: Movie;
    onSwipe: (liked: boolean) => void;
}

export function MovieDisplay({movie1, movie2, onSwipe}: MovieDisplayProps) {
    return (
        <>
            <div className="imageContainer">
                <CardContainer
                    onSwipe={onSwipe}
                    firstBackgroundImage={movie1.imagePath}
                    {...(movie2?.imagePath ? { secondBackgroundImage: movie2.imagePath } : {})}
                />

                <SvgDislike onClick={() => onSwipe(false)}/>
                <SvgLike onClick={() => onSwipe(true)}/>
            </div>
            <div className="detailContainer">
                <div className="title_duration_container">
                    <div className="title">{movie1.title}</div>
                    <div className="duration">{movie1.duration} min</div>
                </div>
                <div className="releaseDate">{movie1.releaseDate}</div>
                <div className="grade_votes_container">
                    <div className="votes">Votes: {movie1.votes}</div>
                    <div className="averageGrade">{movie1.averageGrade.toFixed(1)}/10</div>
                </div>
                <div className="synopsisContainer">
                    <div className="synopsis">{movie1.synopsis}</div>
                </div>
                <div className="providersContainer">
                    {movie1.providers.map((provider) => (
                        <div key={provider.id} className="provider">
                            <img src={provider.logoPath} alt={provider.name} className="providerLogo"/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


