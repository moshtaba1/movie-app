import axios from "axios";
import { useEffect, useState, createContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({ user: {}, session: "" });

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(() =>
        localStorage.getItem("session")
    );

    const baseUrl = "https://api.themoviedb.org/3";
    const apiKey = "9eaf40859928744a7d9ffafd5b1f5261";

    async function getUserData() {
        try {
            const { data } = await axios.get(
                `${baseUrl}/account?api_key=${apiKey}&session_id=${session}`
            );
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data");
        }
    }

    useEffect(() => {
        if (session) {
            getUserData();
        }
    }, [session]);

    async function login(username, password) {
        try {
            const tokenResult = await axios.get(
                `${baseUrl}/authentication/token/new?api_key=${apiKey}`
            );

            const authorize = await axios.post(
                `${baseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`,
                {
                    username,
                    password,
                    request_token: tokenResult.data.request_token,
                }
            );

            const session = await axios.post(
                `${baseUrl}/authentication/session/new?api_key=${apiKey}`,
                { request_token: tokenResult.data.request_token }
            );

            setSession(session.data.session_id);
            localStorage.setItem("session", session.data.session_id);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Invalid username or password");
        }
    }

    function logout() {
        setSession(null);
        localStorage.removeItem("session");
        setUser({});
        navigate("/login", { replace: true });
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, session, logout }}>
            {children}
        </UserContext.Provider>
    );
}