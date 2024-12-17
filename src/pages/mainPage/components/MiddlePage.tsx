// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "../style/MiddleMainPage.sass";
import {useMiddleMainPage} from "../../../hooks/useMiddlePage.ts";
import {MovieDisplay} from "./MovieDisplay.tsx";


export function MiddleMainPage() {
    const {
        movies,
        firstMovie,
        secondMovie,
        containerRef,
        handleSwipe
    } = useMiddleMainPage();

    return (
        <div className="middleMainPage" ref={containerRef}>
            {!movies.length ? (
                <div className="spinner"></div>
            ) : (
                <MovieDisplay
                    movie1={firstMovie}
                    movie2={secondMovie}
                    onSwipe={handleSwipe}
                />
            )}
        </div>
    );
}
