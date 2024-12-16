// GroupLike.tsx
import React from "react";
import UserList from "./components/UserList.tsx";

// @ts-ignore
import "./_GroupKike.sass";

import {useGroupLikeLogic} from "./components/useGroupLikeLogic.ts";
import {GroupMoviesSections} from "./components/GroupMoviesSections.tsx";
import {MoviePopup} from "./components/MoviePopup.tsx";
import {GroupHeader} from "./components/GroupHeader.tsx";

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

    return (
        <div className="groupLikePage">
            <GroupHeader selectedGroup={selectedGroup}/>

            <UserList
                users={users}
                toggleUserSelection={toggleUserSelection}
                selectedUsers={selectedUsersIds}
            />


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
