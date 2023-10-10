import React from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navs from "./Navs";
import '../css/home.css';

function Home() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <div>
      <Navs />
      <div>
        {isHome && (
          <div className="homepage-description">
          <h2>Welcome to My Cinema</h2>
          <p>
            Explore the latest movies and book your favorite seats at our
            state-of-the-art theatres. Discover a world of entertainment and
            enjoy an unforgettable cinema experience with us.
          </p>
          <div className="advertisement">
            <h2>Special Offers</h2>
              <div id="advertisementCarousel" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="image-container">
                      <img
                        src={process.env.PUBLIC_URL + '/images/pw1.jpg'}
                        className="d-block w-100"
                        alt="Disney & Pixar Movies"
                      />
                      <div className="image-name">Disney & Pixar Movies</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="image-container">
                      <img
                        src={process.env.PUBLIC_URL + '/images/pw2.jpg'}
                        className="d-block w-100"
                        alt="Spider-Man Into The Spider Verse"
                      />
                      <div className="image-name">Spider-Man Into The Spider Verse</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="image-container">
                      <img
                        src={process.env.PUBLIC_URL + '/images/pw3.jpg'}
                        className="d-block w-100"
                        alt="John Wick Chapter3"
                      />
                      <div className="image-name">John Wick Chapter3</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="image-container">
                      <img
                        src={process.env.PUBLIC_URL + '/images/dune.jpg'}
                        className="d-block w-100"
                        alt="DUNE"
                      />
                      <div className="image-name">DUNE</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="image-container">
                      <img
                        src={process.env.PUBLIC_URL + '/images/godz.jpg'}
                        className="d-block w-100"
                        alt="Godzilla"
                      />
                      <div className="image-name">Godzilla</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="image-container">
                      <img
                        src={process.env.PUBLIC_URL + '/images/bee.jpg'}
                        className="d-block w-100"
                        alt="BumbleBee"
                      />
                      <div className="image-name">BumbleBee</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="image-container">
                      <img
                        src={process.env.PUBLIC_URL + '/images/snw.jpg'}
                        className="d-block w-100"
                        alt="Spider-Man No Way Home"
                      />
                      <div className="image-name">Spider-Man No Way Home</div>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#advertisementCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#advertisementCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <p>Don't miss out on our amazing deals and discounts!</p>
            <p>Book now and get a free popcorn with your ticket!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
