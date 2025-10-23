import React, { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import { useNavigate } from "react-router-dom";
import "../styles/banner.css";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies();
        const data = res.data || res;
        if (Array.isArray(data)) {
          setMovies(data.slice(0, 5));
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 5);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!movies.length) return null;

  const movie = movies[currentIndex];

  const handleWatchNow = () => {
    navigate(`/play/${movie.id}`);
  };

  return (
    <div className="banner">
      <div className="banner-bg">
        <img
          className="banner-bg-img"
          src={`http://localhost:3000${
            movie?.logo || "/assets/posters/default.jpg"
          }`}
          alt={movie.name}
        />
      </div>

      <div className="banner-content">
        <div className="banner-left">
          <img
            className="banner-poster"
            src={`http://localhost:3000${
              movie?.logo || "/assets/posters/default.jpg"
            }`}
            alt={movie.name}
          />
          <div className="banner-info">
            <h1 className="banner-title">{movie.name}</h1>
            <p className="banner-overview">
              Experience the thrill of {movie.name}. A captivating cinematic
              experience.
            </p>
            <div className="banner-meta">
              <span>⭐ 8.{movie.id}</span>
              <span>|</span>
              <span>Released on: 202{movie.id}</span>
            </div>
          </div>
        </div>

        <div className="banner-right">
          <button className="btn-watch-later">
            <i className="fa-regular fa-clock"></i>
          </button>
          <button className="btn-watch-now" onClick={handleWatchNow}>
            ▶ Watch Now
          </button>
        </div>
      </div>

      <div className="banner-indicators">
        {movies.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Banner;
