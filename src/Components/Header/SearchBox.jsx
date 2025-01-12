import { useNavigate } from "react-router-dom";

export default function SearchBox() {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.value;
        navigate(`/search?q=${query}`);
    };

    return (
        <section className="mt-4 text-slate-200">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for a movie, tv show or celebrity that you are looking for"
                    className="w-full bg-slate-600 text-sm md:text-xl p-2 md:p-3 border-slate-900 border-4 rounded-md outline-none placeholder:text-slate-500 placeholder:text-md"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                        }
                    }}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="white"
                    className="bi bi-search hidden md:block absolute right-4 top-1/2 -translate-y-1/2"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
        </section>
    );
}