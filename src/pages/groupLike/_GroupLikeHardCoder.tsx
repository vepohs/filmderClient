const movies = [
    {"title": "Inception", "count": 3},
    {"title": "The Dark Knight", "count": 3},
    {"title": "Interstellar", "count": 2},
    {"title": "Tenet", "count": 4},
    {"title": "Dunkirk", "count": 1},
    {"title": "Memento", "count": 7},
    {"title": "The Prestige", "count": 6},
    {"title": "Following", "count": 7}
];

export function GroupLikeHardCoder() {
    // Trier les films par nombre de likes décroissant
    const sortedMovies = [...movies].sort((a, b) => b.count - a.count);

    // Regrouper les films par nombre de likes
    const groupedMovies = sortedMovies.reduce((acc, movie) => {
        if (!acc[movie.count]) {
            acc[movie.count] = [];
        }
        acc[movie.count].push(movie.title);
        return acc;
    }, {} as Record<number, string[]>);

    return (
        <div className="groupLikePage">
            <h1>Films et likes du groupe</h1>
            <ul>
                {Object.entries(groupedMovies)
                    .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Trier les sections par likes décroissants
                    .map(([count, titles]) => (
                        <li key={count} className="sectionItem">
                            <h2>
                                {Array.from({length: parseInt(count)}).map((_, index) => (
                                    <span key={index}>❤️</span>
                                ))}
                            </h2>
                            <ul>
                                {titles.map((title, index) => (
                                    <li key={index}>{title}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
