import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/header.css";

const SLIDES = [
  { src: `${process.env.PUBLIC_URL}/images/pw1.jpg`, title: "Disney & Pixar Movies" },
  { src: `${process.env.PUBLIC_URL}/images/pw2.jpg`, title: "Spider-Man: Into the Spider-Verse" },
  { src: `${process.env.PUBLIC_URL}/images/pw3.jpg`, title: "John Wick: Chapter 3" },
  { src: `${process.env.PUBLIC_URL}/images/dune.jpg`, title: "Dune" },
  { src: `${process.env.PUBLIC_URL}/images/godz.jpg`, title: "Godzilla" },
  { src: `${process.env.PUBLIC_URL}/images/bee.jpg`, title: "Bumblebee" },
  { src: `${process.env.PUBLIC_URL}/images/snw.jpg`, title: "Spider-Man: No Way Home" },
];

const SLIDE_DURATION_MS = 5000;

function Header() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const active = SLIDES[index];

  return (
    <header className="overlay">
      {SLIDES.map((slide, slideIndex) => (
        <div
          key={slide.src}
          className={`hero-slide${slideIndex === index ? " active" : ""}`}
          style={{ backgroundImage: `url(${slide.src})` }}
        />
      ))}

      <div className="hero">
        <div className="info">
          <span className="hero-tag">Now Showing</span>
          <h1>{active.title}</h1>
          <p className="fs-6">
            Reserve seats and grab your favorite snacks for the latest blockbusters, all in
            one place.
          </p>
          <NavLink to="/home/reserveSeats" className="btn btn-primary-accent hero-cta">
            Browse Movies
          </NavLink>
        </div>
      </div>

      <div className="hero-dots">
        {SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.src}
            className={`hero-dot${slideIndex === index ? " active" : ""}`}
            onClick={() => setIndex(slideIndex)}
            aria-label={`Show ${slide.title}`}
          />
        ))}
      </div>
    </header>
  );
}

export default Header;
