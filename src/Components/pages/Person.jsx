import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_KEY = "9eaf40859928744a7d9ffafd5b1f5261"; // API Key خود را اینجا قرار دهید

export default function Person() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);

    useEffect(() => {
        async function fetchPerson() {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`
                );
                setPerson(data);
            } catch (error) {
                console.error("Error fetching person details:", error);
            }
        }
        fetchPerson();
    }, [id]);

    if (!person) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        alt={person.name}
                        className="w-48 h-48 rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{person.name}</h1>
                        <p className="text-slate-300 mb-2">
                            Known for: {person.known_for_department}
                        </p>
                        <p className="text-slate-300 mb-2">Birthday: {person.birthday}</p>
                        <p className="text-slate-300 mb-2">Place of Birth: {person.place_of_birth}</p>
                        <p className="text-slate-300 mb-4">{person.biography}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}