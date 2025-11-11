import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const themeValue = {
    isDark,
    setDark,
  };
  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeContext };
