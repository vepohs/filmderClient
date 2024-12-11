// GroupLike.tsx
import React from "react";
import UserList from "./components/UserList.tsx";
import {copyToClipboard} from "./components/groupLikeUtils.ts";

// @ts-ignore
import "./_GroupKike.sass";

import {useGroupLikeLogic} from "./components/useGroupLikeLogic.ts";
import {GroupMoviesSections} from "./components/GroupMoviesSections.tsx";
import {MoviePopup} from "./components/MoviePopup.tsx";

const GroupLike: React.FC = () => {
    const {
        users,
        selectedUsersIds,
        toggleUserSelection,
        selectedMovie,
        openMoviePopup,
        closeMoviePopup,
        moviesByCount,
        sortedCounts,
        swiped,
        selectedGroup,
    } = useGroupLikeLogic();

    console.log("yooooooooo")
    console.log(sortedCounts)
    console.log(moviesByCount)


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

            <GroupMoviesSections
                sortedCounts={sortedCounts}
                moviesByCount={moviesByCount}
                onMovieClick={openMoviePopup}
                onSwipe={swiped}
            />

            {selectedMovie && (
                <MoviePopup
                    movie={selectedMovie}
                    onClose={closeMoviePopup}
                    onSwipe={swiped}
                />
            )}
        </div>
    );
};

export default GroupLike;
