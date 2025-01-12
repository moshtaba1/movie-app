import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import MovieCard from "../Movies/MovieCard";
import axios from "axios";
import { useHeader } from "../../Context/HeaderContext";

export default function HeaderSlider() {
    const [movies, setMovies] = useState([]);
    const { setBackdropPath } = useHeader();

    async function loadMovies() {
        const { data } = await axios.get(
            "https://api.themoviedb.org/3/movie/popular?api_key=9eaf40859928744a7d9ffafd5b1f5261"
        );
        setMovies(data.results);
    }

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <div className="relative mt-8 pb-6">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: true, el: ".custom-pagination" }}
                autoplay={{ delay: 2000 }}
                loop={true}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 15 },
                    1024: { slidesPerView: 4, spaceBetween: 15 },
                }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div
                            onMouseOver={() => setBackdropPath(movie.backdrop_path)}
                            className="relative"
                        >
                            <MovieCard movie={movie} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="custom-pagination absolute bottom-0 left-1 flex space-x-2"></div>
        </div>
    );
}