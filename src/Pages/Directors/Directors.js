import React, { useState, useEffect } from 'react';

function Directors() {
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Directors List";
        async function fetchData() {
            try {
                setLoading(true);
                fetch('http://localhost:8080/directors')
                    .then(response => response.json())
                    .then(data => setDirectors(data))
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
                    {directors.map((director, index) => (
                        <li key={index}>
                            {director.id} : {director.firstName} {director.lastName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Directors;