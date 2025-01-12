import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Components/pages/Home";
import LogIn from "./Components/pages/LogIn";
import Movie from "./Components/pages/Movie";
import Movies from "./Components/pages/Movies";
import UserProvider from "./Context/UserContext";
import SearchResults from "./Components/Header/SearchResults";
import SignUp from "./Components/pages/Signup";
import TVShows from "./Components/pages/TvShow";
import Peoples from "./Components/pages/Peoples";
import Person from "./Components/pages/Person";
import Profile from "./Components/pages/Profile";
import NotFound from "./Components/pages/NotFound"; // صفحه‌ی 404

export const router = createBrowserRouter([
    {
        element: (
            <UserProvider>
                <App />
            </UserProvider>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/movies/:id",
                element: <Movie />,
            },
            {
                path: "/tv",
                element: <TVShows />,
            },
            {
                path: "/peoples",
                element: <Peoples />,
            },
            {
                path: "/more",
                element: <Movies />,
            },
            {
                path: "/login",
                element: <LogIn />,
            },
            {
                path: "/sign-up",
                element: <SignUp />,
            },
            {
                path: "/search",
                element: <SearchResults />,
            },
            {
                path: "/people/:id",
                element: <Person />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "*",
                element: <NotFound />, // صفحه‌ی 404
            },
        ],
    },
]);