import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Layout.css";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Toggle a CSS class on the body element
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="layout">
      <nav>
        <h1>My Articles</h1>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
          Contact
        </NavLink>
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
      <main>{children}</main>
      <footer>
        <p>© 2025 My Articles. All rights reserved.</p>
      </footer>
    </div>
  );
}
