import React from "react";
import "./Mainpage.css"; // Ensure the CSS file path is correct
import { Link } from "react-router-dom";
import hamburgerIcon from "./public/hamburger.svg"; // 이미지 경로 확인

const Navbar = () => (
  <div className="home-navbar">
    <header className="home-navbar-interactive">
      <div className="home-branding">
        <span className="home-text">
          <Link to="/">PUTS</Link>
        </span>
      </div>
      <div className="home-desktop-menu">
        <nav className="home-nav">
          <div className="home-right">
            <div className="nav-links-links">
              <span className="navLink">
                <span>work</span>
              </span>
              <span className="navLink">
                <span>services</span>
              </span>
              <span className="navLink">
                <Link to="/mypage">My Page</Link>
              </span>
            </div>
            <div className="home-button">
              <button className="home-work-with-us button">
                <span className="home-text001">
                  <Link to="/signup">Sign Up</Link>
                </span>
                <img
                  alt="Hamburger"
                  src={hamburgerIcon}
                  className="home-image"
                />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="home-burger-menu">
        <button className="home-work-with-us1 button">
          <span className="home-text002">work with us</span>
          <img alt="Hamburger" src={hamburgerIcon} className="home-image01" />
        </button>
      </div>
      {/* Mobile menu omitted for brevity */}
    </header>
  </div>
);

export default Navbar;
