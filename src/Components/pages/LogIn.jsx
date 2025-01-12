import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LogIn() {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await login(username, password);
            toast.success("Login successful!");
            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid username or password. Please try again.");
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700 -mt-80">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Welcome Back!
                    </h2>
                    <p className="text-slate-400 mb-6">
                        Log in to your account to continue exploring movies and TV shows.
                    </p>
                </div>

                {/* نمایش خطا */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 text-red-500 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 placeholder:text-md"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 placeholder:text-md"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all"
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-slate-400">
                    <p>
                        Don't have an account?{" "}
                        <a
                            href="/sign-up"
                            className="text-yellow-500 hover:text-yellow-400 font-semibold"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}