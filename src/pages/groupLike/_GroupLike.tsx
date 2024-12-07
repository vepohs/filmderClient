import React, {useEffect, useState} from "react";
import UserList from "./components/UserList.tsx";
import axiosWithAuth from "../../axiosUtils/axiosConfig.ts";
import {useSelectedGroup} from "../../context/SelectedGroupContext.tsx";

// Fonction utilitaire pour mapper un film
const mapMovie = (item: any) => ({
    id: item.movie.id,
    title: item.movie.title,
    imagePath: item.movie.imagePath,
    count: item.count,
    synopsis: item.movie.synopsis,
    averageGrade: item.movie.averageGrade,
    duration: item.movie.duration,
    releaseDate: item.movie.releaseDate,
    votes: item.movie.votes,
    providers: item.movie.providers.map((provider: any) => ({
        id: provider.id,
        name: provider.name,
        logoPath: provider.logoPath,
    })),
    genres: item.movie.genres.map((genre: any) => ({
        id: genre.id,
        name: genre.name,
        imagePath: genre.imagePath,
    })),
});

interface Movie {
    id: number;
    title: string;
    imagePath: string;
    count: number;
    synopsis: string;
    averageGrade: number;
    duration: number;
    releaseDate: string;
    votes: number;
    providers: { id: number; name: string; logoPath: string }[];
    genres: { id: number; name: string; imagePath: string }[];
}

const GroupLike: React.FC = () => {
    const {selectedGroup} = useSelectedGroup();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchGroupUsers = async () => {
        try {
            const response = await axiosWithAuth.post("group/protected/getGroupUsers", selectedGroup);
            console.log("les usersssssss")
            console.log(response.data)
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
    }, {} as Record<number, Movie[]>);

    return (
        <div style={{padding: "20px"}}>
            <h1>Group Users</h1>
            <UserList users={users} toggleUserSelection={toggleUserSelection} selectedUsers={selectedUsers}/>

            <h2>Films et likes du groupe</h2>
            <div className="groupLikePage">
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
                                <ul style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
                                    {movies.map((movie) => (
                                        <li key={movie.id} style={{listStyle: "none"}}>
                                            <img
                                                src={movie.imagePath}
                                                alt={movie.title}
                                                style={{
                                                    width: "100px",
                                                    height: "150px",
                                                    borderRadius: "8px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupLike;
