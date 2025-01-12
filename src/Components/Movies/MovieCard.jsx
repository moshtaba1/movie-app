import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    // بررسی کنید که movie وجود دارد
    if (!movie) {
        return <div>Loading...</div>; // یا یک پیام خطا یا اسکلتون نمایش دهید
    }

    const imageBaseUrl = "https://image.tmdb.org/t/p/w780";

    return (
        <Link to={`/movies/${movie.id}`}>
            <div className="bg-gray-300 aspect-[2/3] relative rounded overflow-hidden cursor-pointer">
                <img
                    className="object-cover w-full h-auto"
                    src={`${imageBaseUrl}${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="flex flex-col justify-end p-4 absolute w-full h-full bottom-0 bg-gradient-to-t from-[#111a2fc3] to-[#0f172a00] hover:to-[#111a2fc3]">
                    <h3 className="uppercase">{movie.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-star-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </span>
                        <span>{movie.vote_average}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}