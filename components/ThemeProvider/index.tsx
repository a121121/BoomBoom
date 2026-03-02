"use client";
import React, { createContext, useContext } from "react";

interface ThemeContextType {
    theme: "light";
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // No state, always light
    const toggleTheme = () => {
        // do nothing, no dark mode
    };

    return (
        <ThemeContext.Provider value={{ theme: "light", toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}