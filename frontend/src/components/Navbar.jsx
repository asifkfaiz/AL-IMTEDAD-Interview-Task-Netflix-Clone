import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

function Navbar({ setActivePage }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("Explore");
  const [menuOpen, setMenuOpen] = useState(false);


  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

   const handleClick = (page) => {
    setActive(page);
    // setActivePage(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      <div className="navbar-left">
        <img src="/netflixlogo.svg" alt="Netflix Logo" className="logo-img" />
      </div>

      
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      
      <div className={`navbar-center ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          {[
            "Explore",
            "Movies",
            "TV Shows",
            "Popular",
            "Top Rated",
            "Genres",
          ].map((page) => (
            <li
              key={page}
              className={active === page ? "active-link" : ""}
              onClick={() => handleClick(page)}
            >
              {page === "Genres" ? (
                <>
                  {page} <i className="fa-solid fa-angle-down"></i>
                </>
              ) : (
                page
              )}
            </li>
          ))}
        </ul>
      </div>

      
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <ul className="user-actions">
          <li>
            <button title="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
          <li>
            <button title="Watchlist">
              <i className="fa-regular fa-clock"></i>
            </button>
          </li>
          <li>
            <button title="Profile">
              <i className="fa-solid fa-user"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
