import React, { useState, useEffect } from 'react';

function Genres() {
    const [genre, setGenre] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Genre List";
        async function fetchData() {
            try {
                setLoading(true);
                fetch('http://localhost:8080/genres')
                    .then(response => response.json())
                    .then(data => setGenre(data))
                    .finally(() => setLoading(false));
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {genre.map((genre, index) => (
                        <li key={index}>
                            {genre.id} : {genre.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Genres;