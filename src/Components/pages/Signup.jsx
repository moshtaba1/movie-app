import React from "react";

export default function SignUp() {
    // آدرس سایت شما (برای بازگشت کاربر پس از ثبت‌نام)
    const redirectUrl = encodeURIComponent("https://yoursite.com/login"); // آدرس سایت خود را اینجا قرار دهید

    // آدرس صفحه ثبت‌نام TMDB با پارامتر redirect_to
    const tmdbSignUpUrl = `https://www.themoviedb.org/signup?redirect_to=${redirectUrl}`;

    return (
        <div className="flex items-center justify-center bg-slate-800">
            <div className="w-full max-w-lg bg-slate-700 p-8 rounded-lg shadow-lg -mt-80">
                <div>
                    <h2 className="text-center text-3xl font-bold text-white">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-300">
                        To create an account, you will be redirected to TMDB.
                    </p>
                </div>
                <div className="mt-6">
                    <a
                        href={tmdbSignUpUrl}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Sign Up on TMDB
                    </a>
                </div>
            </div>
        </div>
    );
}