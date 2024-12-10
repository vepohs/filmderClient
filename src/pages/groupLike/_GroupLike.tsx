// GroupLike.tsx
import React from "react";
import UserList from "./components/UserList.tsx";
import {MovieDisplay} from "../mainPage/components/MovieDisplay.tsx";
import {CardContainer} from "../mainPage/components/CardContainer.tsx";
import {copyToClipboard} from "./components/groupLikeUtils.ts";

// @ts-ignore
import "./_GroupKike.sass";

import {useGroupLikeLogic} from "./components/useGroupLikeLogic.ts";

const GroupLike: React.FC = () => {
    const {
        users,
        selectedUsersIds,
        toggleUserSelection,
        selectedMovie,
        openMoviePopup,
        closeMoviePopup,
        groupedMovies,
        swiped,
        selectedGroup,
    } = useGroupLikeLogic();

    return (
        <div className="groupLikePage">
            <h1>{selectedGroup.name}</h1>
            <h1>
                le code pour rejoindre le groupe est <br/>
                <span
                    onClick={() => copyToClipboard(selectedGroup.groupId)}
                    style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}
                >
                    {selectedGroup.groupId}
                </span>
            </h1>

            <UserList
                users={users}
                toggleUserSelection={toggleUserSelection}
                selectedUsers={selectedUsersIds}
            />

            <h2>Films et likes du groupe</h2>
            <ul>
                {Object.entries(groupedMovies)
                    .sort(([a], [b]) => parseInt(b) - parseInt(a))
                    .map(([count, movies]) => (
                        <li key={count} className="sectionItem">
                            <h2>
                                {Array.from({length: parseInt(count)}).map((_, index) => (
                                    <span key={index}>❤️</span>
                                ))}
                            </h2>
                            <ul>
                                {movies.map((movie) => (
                                    <li key={movie.id} className="movieItem">
                                        <CardContainer
                                            firstBackgroundImage={movie.imagePath}
                                            onSwipe={(liked) => swiped(liked, movie.id)}
                                            onClick={() => openMoviePopup(movie)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>

            {selectedMovie && (
                <div className="popupOverlay" onClick={closeMoviePopup}>
                    <div className="popupContent">
                        <MovieDisplay
                            movie1={selectedMovie}
                            onSwipe={(liked) => {
                                swiped(liked, selectedMovie.id);
                                closeMoviePopup();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupLike;
