import React, { useContext, useEffect, useState } from "react";
import { useHeader } from "../../Context/HeaderContext"; // استفاده از HeaderContext
import FollowUs from "./FollowUs";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox";
import HeaderSlider from "./HeaderSlider";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const orgBg = "/bg.jpg";
    const [bg, setBg] = useState(orgBg);
    const { backdropPath } = useHeader(); // دریافت backdropPath از HeaderContext

    useEffect(() => {
        if (backdropPath) {
            setBg(`https://image.tmdb.org/t/p/w1280${backdropPath}`); // آپدیت پس‌زمینه
        } else {
            setBg(orgBg); // اگر backdropPath وجود نداشت، از پس‌زمینه‌ی پیش‌فرض استفاده کن
        }
    }, [backdropPath]);

    return (
        <header
            className={`flex justify-center py-6 lg:py-12 ${
                location.pathname !== "/" ? "h-[500px]" : ""
            }`}
            style={{
                backgroundImage: `linear-gradient(rgb(1 1 1 / 90%), rgb(0 0 0 / 50%)), url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
            }}
        >
            <div className="container">
                <Navigation />
                <SearchBox />
                <div className={`${location.pathname !== "/" ? "hidden" : ""}`}>
                    <FollowUs />
                    <HeaderSlider setBg={setBg} />
                </div>
            </div>
        </header>
    );
}