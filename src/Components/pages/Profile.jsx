import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import MovieCard from "../Movies/MovieCard"; // برای نمایش کارت فیلم‌ها

const API_KEY = "9eaf40859928744a7d9ffafd5b1f5261"; // API Key خود را اینجا قرار دهید

export default function Profile() {
    const { user, session } = useContext(UserContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && session) {
            // دریافت فیلم‌های مورد علاقه
            axios.get(`https://api.themoviedb.org/3/account/${user.id}/favorite/movies`, {
                params: {
                    api_key: API_KEY,
                    session_id: session,
                },
            })
                .then(response => setFavoriteMovies(response.data.results))
                .catch(error => console.error("Error fetching favorite movies:", error));

            // دریافت فیلم‌های واچ‌لیست
            axios.get(`https://api.themoviedb.org/3/account/${user.id}/watchlist/movies`, {
                params: {
                    api_key: API_KEY,
                    session_id: session,
                },
            })
                .then(response => setWatchlistMovies(response.data.results))
                .catch(error => console.error("Error fetching watchlist movies:", error));

            setLoading(false);
        }
    }, [user, session]);

    if (!user) {
        return <div className="text-white text-center py-8">Please log in to view your profile.</div>;
    }

    if (loading) {
        return <div className="text-white text-center py-8">Loading...</div>;
    }

    return (
        <div className="bg-slate-900 text-white min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8">Profile</h1>

            {/* اطلاعات کاربر */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <p className="text-slate-300">Username: {user.username}</p>
                <p className="text-slate-300">Email: {user.email}</p>
                <p className="text-slate-300">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            {/* لیست فیلم‌های واچ‌لیست */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
                {watchlistMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {watchlistMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-300">You have no movies in your watchlist yet.</p>
                )}
            </div>

            {/* لیست فیلم‌های مورد علاقه */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Favorite Movies</h2>
                {favoriteMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favoriteMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-300">You have no favorite movies yet.</p>
                )}
            </div>
        </div>
    );
}