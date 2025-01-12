import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(UserContext);

    const menuItems = [
        {
            path: "/movies",
            text: "Movie",
        },
        {
            path: "/tv",
            text: "TV Show",
        },
        {
            path: "/peoples",
            text: "People",
        },
    ];

    function activeClass({ isActive }) {
        return isActive ? "text-yellow-300" : "hover:text-white";
    }

    return (
        <>
            <nav className="flex items-center text-slate-300 relative z-50">
                <div className="flex items-center">
                    <Link to="/">
                        <h1 className="text-3xl mr-12 text-rose-500">Movie</h1>
                    </Link>

                    {/* منوی اصلی برای صفحه‌های بزرگ */}
                    <ul className="hidden lg:flex gap-6 uppercase">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink to={item.path} className={activeClass}>
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* بخش کاربر و دکمه‌های لاگین/لاگ‌اوت */}
                <div className="hidden lg:flex ml-auto uppercase">
                    {user ? (
                        <div className="flex items-center">
                            <NavLink to="/profile" className="text-white hover:text-yellow-300">
                                {user.username}
                            </NavLink>
                            <button
                                onClick={logout}
                                className="text-red-700 ml-4 text-xl hover:text-red-500"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <ul className="flex gap-8 uppercase">
                            <li>
                                <NavLink to="/login" className="hover:text-yellow-300">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/sign-up"
                                    className="bg-rose-600 hover:bg-rose-500 px-6 py-3 rounded-2xl text-white"
                                >
                                    Sign up
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>

                {/* دکمه‌ی همبرگری برای صفحه‌های کوچک */}
                <div className="lg:hidden ml-auto">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-list"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* منوی همبرگری برای صفحه‌های کوچک */}
            {isMenuOpen && (
                <div className="lg:hidden p-3 rounded bg-slate-800 text-center transition-all duration-500 absolute z-50 w-full">
                    <ul className="flex flex-col gap-4">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={activeClass}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="flex border-t-2 border-slate-700 justify-around items-center mt-2 pt-2">
                        {user ? (
                            <>
                                <NavLink
                                    to="/profile"
                                    className="bg-slate-900 rounded-xl py-2 px-4 hover:bg-slate-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {user.username}
                                </NavLink>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="bg-rose-600 rounded-xl py-2 px-4 hover:bg-rose-500"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="bg-slate-900 rounded-xl py-2 px-4 hover:bg-slate-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/sign-up"
                                    className="bg-rose-600 rounded-xl py-2 px-4 hover:bg-rose-500"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}