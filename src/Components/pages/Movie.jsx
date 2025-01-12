import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useHeader } from "../../Context/HeaderContext";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

const API_KEY = "9eaf40859928744a7d9ffafd5b1f5261"; // API Key خود را اینجا قرار دهید

export default function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null); // بازیگران و عوامل فیلم
    const [videos, setVideos] = useState([]); // تریلرها
    const [reviews, setReviews] = useState([]); // نظرات کاربران
    const { setBackdropPath } = useHeader();
    const { user, session } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                // دریافت جزئیات فیلم
                const { data: movieData } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
                );
                setMovie(movieData);
                setBackdropPath(movieData.backdrop_path);

                // دریافت بازیگران و عوامل فیلم
                const { data: creditsData } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
                );
                setCredits(creditsData);

                // دریافت تریلرها
                const { data: videosData } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
                );
                setVideos(videosData.results);

                // دریافت نظرات کاربران
                const { data: reviewsData } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
                );
                setReviews(reviewsData.results);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }
        fetchMovieDetails();
    }, [id, setBackdropPath]);

    // تابع برای اضافه کردن فیلم به واچ‌لیست
    const addToWatchlist = async () => {
        if (!user || !session) {
            toast.error("Please log in to add to watchlist.");
            navigate("/login");
            return;
        }

        try {
            await axios.post(
                `https://api.themoviedb.org/3/account/${user.id}/watchlist`,
                {
                    media_type: "movie",
                    media_id: movie.id,
                    watchlist: true,
                },
                {
                    params: {
                        api_key: API_KEY,
                        session_id: session,
                    },
                }
            );
            toast.success("Added to watchlist!");
        } catch (error) {
            console.error("Error adding to watchlist:", error);
            toast.error("Failed to add to watchlist.");
        }
    };

    // تابع برای اضافه کردن فیلم به فیوریت‌ها
    const addToFavorites = async () => {
        if (!user || !session) {
            toast.error("Please log in to add to favorites.");
            navigate("/login");
            return;
        }

        try {
            await axios.post(
                `https://api.themoviedb.org/3/account/${user.id}/favorite`,
                {
                    media_type: "movie",
                    media_id: movie.id,
                    favorite: true,
                },
                {
                    params: {
                        api_key: API_KEY,
                        session_id: session,
                    },
                }
            );
            toast.success("Added to favorites!");
        } catch (error) {
            console.error("Error adding to favorites:", error);
            toast.error("Failed to add to favorites.");
        }
    };

    if (!movie || !credits) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* بخش اصلی فیلم */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    {/* پستر فیلم */}
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-48 h-48 rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
                    />
                    <div>
                        {/* عنوان و اطلاعات کلی */}
                        <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
                        <p className="text-slate-300 mb-2">{movie.overview}</p>
                        <p className="text-slate-300 mb-2">Rating: {movie.vote_average}</p>
                        <p className="text-slate-300 mb-2">Release Date: {movie.release_date}</p>
                        <p className="text-slate-300 mb-2">Runtime: {movie.runtime} minutes</p>
                        <p className="text-slate-300 mb-2">
                            Genres: {movie.genres.map(genre => genre.name).join(", ")}
                        </p>
                        <p className="text-slate-300 mb-2">
                            Production Companies: {movie.production_companies.map(company => company.name).join(", ")}
                        </p>

                        {/* دکمه‌های Add to Watchlist و Add to Favorites */}
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={addToWatchlist}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                            >
                                Add to Watchlist
                            </button>
                            <button
                                onClick={addToFavorites}
                                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                            >
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* بخش بازیگران و عوامل فیلم */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {credits.cast.slice(0, 8).map(actor => (
                        <div key={actor.id} className="bg-slate-700 rounded-lg p-4">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                                className="w-full h-48 object-cover rounded-lg mb-2"
                            />
                            <p className="text-white font-semibold">{actor.name}</p>
                            <p className="text-slate-300">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* بخش تریلرها */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Trailers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {videos
                        .filter(video => video.site === "YouTube" && video.type === "Trailer")
                        .map(video => (
                            <div key={video.id} className="relative aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    className="w-full h-full rounded-lg"
                                    allowFullScreen
                                />
                            </div>
                        ))}
                </div>
            </div>

            {/* بخش نظرات کاربران */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">User Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="bg-slate-700 rounded-lg p-4 mb-4">
                            <p className="text-white font-semibold">{review.author}</p>
                            <p className="text-slate-300">{review.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-300">No reviews available.</p>
                )}
            </div>
        </div>
    );
}