import React from 'react';
import { useGlobalContext } from './context';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkTheme } = useGlobalContext();

  return (
    <section className="toggle-container">
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    </section>
  );
};

export default ThemeToggle;
