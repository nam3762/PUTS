import React from "react";
import "./Mainpage.css"; // Ensure the CSS file path is correct
import "./Footer.css";

const Footer = () => (
  <footer className="home-footer">
    <div className="home-header4">
      <span className="home-branding2"></span>
      <div className="home-socials">
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link03"
        >
          <img
            alt="Facebook"
            src="/facebook%20-%20negative.svg"
            className="social"
          />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link04"
        >
          <img
            alt="Twitter"
            src="/twitter%20-%20negative.svg"
            className="social"
          />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link05"
        >
          <img
            alt="Dribbble"
            src="/dribbble%20-%20negative.svg"
            className="social"
          />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link06"
        >
          <img
            alt="Instagram"
            src="/instagram%20-%20negative.svg"
            className="social"
          />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link07"
        >
          <img
            alt="LinkedIn"
            src="/linkedin%20-%20negative.svg"
            className="social"
          />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link08"
        >
          <img
            alt="YouTube"
            src="/youtube%20-%20negative.svg"
            className="social"
          />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link09"
        >
          <img
            alt="Telegram"
            src="/telegram%20-%20negative.svg"
            className="social"
          />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="home-link10"
        >
          <img
            alt="Medium"
            src="/medium%20-%20negative.svg"
            className="social"
          />
        </a>
      </div>
    </div>
    <div className="home-content2">
      <div className="home-contact">
        <span className="home-email">PUTS</span>
        <span className="home-number">+82-4824-8876</span>
      </div>
      <div className="home-links-row">
        <div className="home-links-column">
          <span className="home-link11">Responsive Web Design</span>
          <span className="home-link12">Design to Code</span>
          <span className="home-link13">Static Website Designer</span>
          <span className="home-link14">Static Website Generator</span>
        </div>
        <div className="home-links-column1">
          <span className="home-link15">About</span>
          <span className="home-link16">Team</span>
          <span className="home-link17">News</span>
          <span className="home-link18">Partners</span>
          <span className="home-link19">Careers</span>
          <span className="home-link20">Press & Media</span>
        </div>
      </div>
    </div>

    <div className="home-locations">
      <div className="home-location">
        <span className="home-title08">United States</span>
        <span className="home-details07">
          <span>충북대 S4-1 108호</span>
          <br />
          <span>We are PUTS</span>
          <br />
          <br />
          <span>PUTS</span>
        </span>
      </div>
      <div className="home-location1">
        <span className="home-title09">Romania</span>
        <span className="home-details08">
          <span>115 Turzii Road</span>
          <br />
          <span>Cluj Napoca</span>
          <br />
          <br />
          <span>puts@gmail.com</span>
        </span>
      </div>
      <div className="home-location2">
        <span className="home-title10">United Kingdom</span>
        <span className="home-details09">
          <span>87–135 Brompton Road</span>
          <br />
          <span>London</span>
          <br />
          <br />
          <span>puts@gmail.com</span>
        </span>
      </div>
      <div className="home-location3">
        <span className="home-title11">Spain</span>
        <span className="home-details10">
          <span>34-36 Carrer de Tele</span>
          <br />
          <span>Barcelona</span>
          <br />
          <br />
          <span>puts@gmail.com</span>
        </span>
      </div>
    </div>

    <div className="home-socials1">
      <div className="home-row4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href="https://example.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              alt="Social Icon"
              src={`/public/${link.image}`}
              className="social"
            />
          </a>
        ))}
      </div>
      <div className="home-row5">
        {/* Similar mapping for additional social links if necessary */}
      </div>
    </div>
  </footer>
);

const socialLinks = [
  { image: "facebook%20-%20negative.svg" },
  { image: "twitter%20-%20negative.svg" },
  { image: "dribbble%20-%20negative.svg" },
  { image: "instagram%20-%20negative.svg" },
  // Add more links as necessary
];

export default Footer;
