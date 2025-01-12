import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MoviesListSlider from "../Main/MoviesListSlider";

export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchSearchResults() {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=9eaf40859928744a7d9ffafd5b1f5261&query=${query}`
            );
            setResults(data.results);
        }
        fetchSearchResults();
    }, [query]);

    return (
        <div className="container">
            <h1 className="text-2xl text-slate-300 my-4">Search Results for "{query}"</h1>
            <MoviesListSlider movies={results} />
        </div>
    );
}