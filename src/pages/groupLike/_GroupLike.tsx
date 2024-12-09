import React, {useEffect, useState} from "react";
import UserList from "./components/UserList.tsx";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {useSelectedGroup} from "../../context/SelectedGroupContext.tsx";


// @ts-ignore
import "./_GroupKike.sass"
import {MovieDisplay} from "../mainPage/components/MovieDisplay.tsx";
import {CardContainer} from "../mainPage/components/CardContainer.tsx";
import {Genre, Movie, Provider} from "../../types/MovieAndProviders.ts";

export interface MovieWithCount extends Movie {
    count: number;
}


// Fonction utilitaire pour mapper un film
const mapMovie = (item: any): MovieWithCount => ({
    id: item.movie.id,
    title: item.movie.title,
    imagePath: item.movie.imagePath,
    count: item.count,
    synopsis: item.movie.synopsis,
    averageGrade: item.movie.averageGrade,
    duration: item.movie.duration,
    releaseDate: item.movie.releaseDate,
    votes: item.movie.votes,
    providers: item.movie.providers.map((provider: Provider) => ({
        id: provider.id,
        name: provider.name,
        logoPath: provider.logoPath,
    })),
    genres: item.movie.genres.map((genre: Genre) => ({
        id: genre.id,
        name: genre.name,
        imagePath: genre.imagePath,
    })),
});


const GroupLike: React.FC = () => {
    const {selectedGroup} = useSelectedGroup();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [movies, setMovies] = useState<MovieWithCount[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieWithCount | null>(null); // État pour la popup

    const fetchGroupUsers = async () => {
        try {
            const response = await axiosWithAuth.post("group/protected/getGroupUsers", {groupId: selectedGroup});
            setUsers(response.data);
            setSelectedUsers(response.data.map((user: { id: string }) => user.id));
        } catch (error) {
            console.error("Error fetching group users:", error);
        }
    };

    const fetchGroupCommonMovies = async () => {
        try {
            const response = await axiosWithAuth.post("group/protected/getGroupMoviesCommon", {
                usersId: selectedUsers,
            });

            const moviesWithDetails = response.data.map(mapMovie); // Utilise mapMovie
            setMovies(moviesWithDetails);
        } catch (error) {
            console.error("Error fetching group common movies:", error);
        }
    };

    const toggleUserSelection = (id: string) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((userId) => userId !== id)
                : [...prevSelected, id]
        );
    };

    const openMoviePopup = (movie: MovieWithCount) => {
        setSelectedMovie(movie);
    };

    const closeMoviePopup = () => {
        setSelectedMovie(null);
    };

    useEffect(() => {
        fetchGroupUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            fetchGroupCommonMovies();
        }
    }, [selectedUsers]);

    // Trier les films par nombre de likes décroissant
    const sortedMovies = [...movies].sort((a, b) => b.count - a.count);

    // Regrouper les films par nombre de likes
    const groupedMovies = sortedMovies.reduce((acc, movie) => {
        if (!acc[movie.count]) {
            acc[movie.count] = [];
        }
        acc[movie.count].push(movie);
        return acc;
    }, {} as Record<number, MovieWithCount[]>);

    async function sendSwipeResponse(movieId: number, liked: boolean) {
        try {
            await axiosWithAuth.post("group/protected/swipeMovieGroup", {
                movieId,
                liked,
                group: selectedGroup
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi de la réponse :", error);
        }
    }

    function swiped(liked: boolean, movieId: number) {
        sendSwipeResponse(movieId, liked).then(() => {
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
        });
    }

    return (
        <div className="groupLikePage">
            <h1>Group Users</h1>
            <h1> le code pour rejoindre le groupe est <br/> {selectedGroup}</h1>
            <UserList users={users} toggleUserSelection={toggleUserSelection} selectedUsers={selectedUsers}/>

            <h2>Films et likes du groupe</h2>
            <ul>
                {Object.entries(groupedMovies)
                    .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Trier les sections par likes décroissants
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
                                            onSwipe={(liked) => {
                                                swiped(liked, movie.id)
                                            }}
                                            onClick={() => openMoviePopup(movie)}>
                                        </CardContainer>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>

            {selectedMovie && ( // Affiche la popup si un film est sélectionné
                <div className="popupOverlay" onClick={closeMoviePopup}>
                    <div className="popupContent">
                        <MovieDisplay
                            movie1={selectedMovie}
                            onSwipe={(liked) => {
                                swiped(liked, selectedMovie.id)
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
