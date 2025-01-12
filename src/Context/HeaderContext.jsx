import React, { createContext, useContext, useState } from "react";

// ایجاد Context
const HeaderContext = createContext();

// ایجاد یک هوک برای استفاده راحت‌تر از Context
export const useHeader = () => useContext(HeaderContext);

// ایجاد Provider برای Context
export const HeaderProvider = ({ children }) => {
    const [backdropPath, setBackdropPath] = useState(null);

    return (
        <HeaderContext.Provider value={{ backdropPath, setBackdropPath }}>
            {children}
        </HeaderContext.Provider>
    );
};