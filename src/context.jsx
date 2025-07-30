import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const getInitialTheme = () => {
  const preferedTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const storedTheme = localStorage.getItem('darkTheme');
  if (storedTheme === null) {
    return preferedTheme;
  }
  return storedTheme === 'true';
};

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkMode;
    setIsDarkMode(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);

  return (
    <AppContext.Provider
      value={{ isDarkMode, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
