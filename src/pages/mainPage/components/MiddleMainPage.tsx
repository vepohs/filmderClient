import {useMiddleMainPage} from "../../../hooks/useMiddlePage.ts";
import {MovieDisplay} from "../../../common/components/MovieDisplay.tsx";
// @ts-ignore
import "../style/MiddleMainPage.sass";

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
                <div className="spinnerMainPage"></div>
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
