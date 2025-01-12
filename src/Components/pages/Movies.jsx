import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "9eaf40859928744a7d9ffafd5b1f5261"; // API Key خود را اینجا قرار دهید

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${currentPage}`
                );
                setMovies(data.results);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchMovies();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* عنوان صفحه */}
            <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>

            {/* گرید فیلم‌ها */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Link to={`/movies/${movie.id}`}>
                            <div className="w-full h-96 relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-white truncate">
                                    {movie.title}
                                </h2>
                                <p className="text-slate-300 mt-2">
                                    Rating: {movie.vote_average}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* صفحه‌بندی */}
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-yellow-400"
                >
                    Previous
                </button>
                <span className="text-white text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-yellow-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
}