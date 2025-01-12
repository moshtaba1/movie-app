import React, { useEffect, useState } from "react";
import axios from "axios";
import MoviesListSlider from "../Main/MoviesListSlider";

const API_KEY = "9eaf40859928744a7d9ffafd5b1f5261"; // API Key خود را اینجا قرار دهید

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [activeFilter, setActiveFilter] = useState("streaming"); // فیلتر پیش‌فرض
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovies() {
            try {
                // دریافت فیلم‌های محبوب
                const popular = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
                );
                setPopularMovies(popular.data.results);
                setFilteredMovies(popular.data.results); // ابتدا همه فیلم‌ها را نمایش دهید

                // دریافت فیلم‌های با امتیاز بالا
                const topRated = await axios.get(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
                );
                setTopRatedMovies(topRated.data.results);

                // دریافت فیلم‌های آینده
                const upcoming = await axios.get(
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
                );
                setUpcomingMovies(upcoming.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    // تابع برای فیلتر کردن فیلم‌ها
    const handleFilter = (filter) => {
        setActiveFilter(filter);
        let filtered = [];

        switch (filter) {
            case "streaming":
                // فیلتر بر اساس تاریخ انتشار (مثال: فیلم‌های منتشر شده در سال جاری)
                filtered = popularMovies.filter((movie) => {
                    const releaseYear = new Date(movie.release_date).getFullYear();
                    return releaseYear === new Date().getFullYear();
                });
                break;
            case "onTv":
                // فیلتر بر اساس محبوبیت (مثال: فیلم‌های با امتیاز بالا)
                filtered = popularMovies.filter((movie) => movie.vote_average >= 7.5);
                break;
            case "forRent":
                // فیلتر بر اساس تاریخ انتشار (مثال: فیلم‌های قدیمی)
                filtered = popularMovies.filter((movie) => {
                    const releaseYear = new Date(movie.release_date).getFullYear();
                    return releaseYear < new Date().getFullYear();
                });
                break;
            case "inTheaters":
                // فیلتر بر اساس تاریخ انتشار (مثال: فیلم‌های منتشر شده در ماه جاری)
                filtered = popularMovies.filter((movie) => {
                    const releaseDate = new Date(movie.release_date);
                    const currentDate = new Date();
                    return (
                        releaseDate.getMonth() === currentDate.getMonth() &&
                        releaseDate.getFullYear() === currentDate.getFullYear()
                    );
                });
                break;
            default:
                filtered = popularMovies;
        }

        setFilteredMovies(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            {/* What's Popular Section */}
            <div className="my-8">
                <div className="md:flex gap-8 items-center md:mb-4">
                    <h2 className="text-slate-300 text-2xl">What's Popular</h2>
                    <ul className="my-6 flex flex-col gap-4 md:gap-8 text-yellow-200 md:flex-row">
                        <li>
                            <button
                                onClick={() => handleFilter("streaming")}
                                className={activeFilter === "streaming" ? "text-yellow-400" : "hover:text-white"}
                            >
                                Streaming
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleFilter("onTv")}
                                className={activeFilter === "onTv" ? "text-yellow-400" : "hover:text-white"}
                            >
                                On TV
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleFilter("forRent")}
                                className={activeFilter === "forRent" ? "text-yellow-400" : "hover:text-white"}
                            >
                                For Rent
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleFilter("inTheaters")}
                                className={activeFilter === "inTheaters" ? "text-yellow-400" : "hover:text-white"}
                            >
                                In Theaters
                            </button>
                        </li>
                    </ul>
                </div>
                {filteredMovies.length > 0 ? (
                    <MoviesListSlider movies={filteredMovies} />
                ) : (
                    <div className="text-slate-300 text-center">No movies available.</div>
                )}
            </div>

            {/* Top Rated Movies Section */}
            <div className="my-8">
                <div className="md:flex gap-8 items-center md:mb-4">
                    <h2 className="text-slate-300 text-2xl">Top Rated Movies</h2>
                </div>
                <MoviesListSlider movies={topRatedMovies} />
            </div>

            {/* Upcoming Movies Section */}
            <div className="my-8">
                <div className="md:flex gap-8 items-center md:mb-4">
                    <h2 className="text-slate-300 text-2xl">Upcoming Movies</h2>
                </div>
                <MoviesListSlider movies={upcomingMovies} />
            </div>
        </div>
    );
}