import React, { useState, useEffect } from 'react';
import './Movies.css';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editMovie, setEditMovie] = useState(null);
    const [newMovie, setNewMovie] = useState({
        title: '',
        releaseYear: '',
        description: '',
        watched: false,
        regisseur: { id: null },
        genre: { id: null },
    });

    useEffect(() => {
        document.title = "Movie List";
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/movies');
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleEdit = (movie) => {
        setEditMovie(movie);
    };

    async function fetchDirectorName(directorId) {
        try {
            // URL mit der übergebenen ID erstellen
            const response = await fetch(`http://localhost/directors/${directorId}`);

            // Überprüfen, ob der Request erfolgreich war
            if (!response.ok) {
                throw new Error(`Fehler beim Fetch: ${response.status}`);
            }

            // JSON-Antwort parsen
            const directorData = await response.json();

            // Annahme: Die API gibt ein Objekt mit dem Attribut "name" zurück
            return directorData.name;
        } catch (error) {
            console.error("Fehler beim Laden des Regisseurs:", error);
            throw error; // Fehler weitergeben, falls benötigt
        }
    }

    const handleChange = (e, setState) => {
        const { name, value, type, checked } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/movies/${editMovie.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editMovie),
            });
            if (!response.ok) throw new Error('Failed to update movie');

            const updatedMovies = movies.map((movie) =>
                movie.id === editMovie.id ? editMovie : movie
            );
            setMovies(updatedMovies);
            setEditMovie(null);
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/movies/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete movie');

            const updatedMovies = movies.filter((movie) => movie.id !== id);
            setMovies(updatedMovies);
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const handleAddMovie = async () => {
        try {
            const response = await fetch('http://localhost:8080/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMovie),
            });
            if (!response.ok) throw new Error('Failed to add movie');

            const addedMovie = await response.json();
            setMovies([...movies, addedMovie]);
            setNewMovie({
                title: '',
                releaseYear: '',
                description: '',
                watched: false,
                regisseur: { id: null },
                genre: { id: null },
            });
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div>
            <div className="movies-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            {editMovie && editMovie.id === movie.id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        name="title"
                                        value={editMovie.title}
                                        onChange={(e) => handleChange(e, setEditMovie)}
                                        placeholder="Title"
                                    />
                                    <input
                                        type="number"
                                        name="releaseYear"
                                        value={editMovie.releaseYear}
                                        onChange={(e) => handleChange(e, setEditMovie)}
                                        placeholder="Release Year"
                                    />
                                    <textarea
                                        name="description"
                                        value={editMovie.description}
                                        onChange={(e) => handleChange(e, setEditMovie)}
                                        placeholder="Description"
                                    />
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="watched"
                                            checked={editMovie.watched}
                                            onChange={(e) => handleChange(e, setEditMovie)}
                                        />
                                        Watched
                                    </label>
                                    <input
                                        type="number"
                                        name="regisseur.id"
                                        value={editMovie.regisseur.id || ''}
                                        onChange={(e) =>
                                            setEditMovie((prev) => ({
                                                ...prev,
                                                regisseur: {id: parseInt(e.target.value, 10) || null},
                                            }))
                                        }
                                        placeholder="Regisseur ID"
                                    />
                                    <input
                                        type="number"
                                        name="genre.id"
                                        value={editMovie.genre.id || ''}
                                        onChange={(e) =>
                                            setEditMovie((prev) => ({
                                                ...prev,
                                                genre: {id: parseInt(e.target.value, 10) || null},
                                            }))
                                        }
                                        placeholder="Genre ID"
                                    />
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setEditMovie(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{movie.title}</h3>
                                    <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                                    <p><strong>Description:</strong> {movie.description}</p>
                                    <p><strong>Watched:</strong> {movie.watched ? 'Yes' : 'No'}</p>
                                    {movie.regisseur && (
                                        <p><strong>Regisseur ID:</strong> {movie.regisseur.id}</p>
                                    )}
                                    {movie.genre && (
                                        <p><strong>Genre ID:</strong> {movie.genre.id}</p>
                                    )}
                                    <button onClick={() => handleEdit(movie)}>Edit</button>
                                    <button onClick={() => handleDelete(movie.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="add-movie-form">
                <h3>Add New Movie</h3>
                <input
                    type="text"
                    name="title"
                    value={newMovie.title}
                    onChange={(e) => handleChange(e, setNewMovie)}
                    placeholder="Title"
                />
                <input
                    type="number"
                    name="releaseYear"
                    value={newMovie.releaseYear}
                    onChange={(e) => handleChange(e, setNewMovie)}
                    placeholder="Release Year"
                />
                <textarea
                    name="description"
                    value={newMovie.description}
                    onChange={(e) => handleChange(e, setNewMovie)}
                    placeholder="Description"
                />
                <label>
                    <input
                        type="checkbox"
                        name="watched"
                        checked={newMovie.watched}
                        onChange={(e) => handleChange(e, setNewMovie)}
                    />
                    Watched
                </label>
                <input
                    type="number"
                    name="regisseur.id"
                    value={newMovie.regisseur.id || ''}
                    onChange={(e) =>
                        setNewMovie((prev) => ({
                            ...prev,
                            regisseur: {id: parseInt(e.target.value, 10) || null},
                        }))
                    }
                    placeholder="Regisseur ID"
                />
                <input
                    type="number"
                    name="genre.id"
                    value={newMovie.genre.id || ''}
                    onChange={(e) =>
                        setNewMovie((prev) => ({
                            ...prev,
                            genre: {id: parseInt(e.target.value, 10) || null},
                        }))
                    }
                    placeholder="Genre ID"
                />
                <button onClick={handleAddMovie}>Add Movie</button>
            </div>
        </div>
    );
}

export default Movies;
