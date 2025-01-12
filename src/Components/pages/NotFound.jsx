import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
            {/* عنوان خطا */}
            <h1 className="text-9xl font-bold text-yellow-400">404</h1>
            {/* پیام خطا */}
            <h2 className="text-4xl font-semibold mt-4">Oops! Page Not Found</h2>
            {/* توضیح بیشتر */}
            <p className="text-slate-400 mt-2 text-center">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            {/* دکمه بازگشت به صفحه‌ی اصلی */}
            <Link
                to="/"
                className="mt-8 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
            >
                Go Back to Home
            </Link>
        </div>
    );
}