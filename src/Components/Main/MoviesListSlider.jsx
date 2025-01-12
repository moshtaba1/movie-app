import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import MovieCard from "../Movies/MovieCard";

export default function MoviesListSlider({ movies }) {
    // بررسی کنید که movies وجود دارد و آرایه‌ای خالی نیست
    if (!movies || movies.length === 0) {
        return <div>No movies available.</div>; // یا یک پیام خطا یا اسکلتون نمایش دهید
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{
                clickable: true,
                el: ".custom-pagination",
            }}
            autoplay={{ delay: 3000 }}
            loop={true}
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 25,
                },
                1280: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                },
            }}
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <MovieCard movie={movie} />
                </SwiperSlide>
            ))}
            <div className="custom-pagination mt-4 flex justify-center space-x-2"></div>
        </Swiper>
    );
}