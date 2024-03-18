import React from "react";
import { Link } from "react-router-dom";
import "./Mainpage.css"; // Ensure the CSS file path is correct
import mouseIcon from "./public/mouse.svg"; // 실제 이미지 파일 경로에 맞게 조정하세요
import messageIcon from "./public/message.svg"; // 실제 이미지 파일 경로에 맞게 조정하세요
import previewIcon from "./public/preview.svg"; // 실제 이미지 파일 경로에 맞게 조정하세요
import videoPoster from "./public/video.svg"; // 실제 이미지 파일 경로에 맞게 조정하세요
import userImage from "./public/fulltimetable.png";
import apostropheIcon from "./public/apostrophe.svg";

const MainPage = () => (
  <div className="home-container">
    {/* Navbar */}

    {/* Hero Section */}
    <div className="home-hero">
      <div className="home-header">
        <h1 className="home-text005">
          Creating visual identity
          <br />
          University timetable
          <br />
          You don't need to schedule.
          <br />
          PUTS can help you.
        </h1>
        <img alt="Mouse icon" src={mouseIcon} className="home-image02" />
      </div>
      <div className="home-hero-image">
        <img src={userImage} alt="User" className="home-image03" />
      </div>
    </div>

    {/* Who We Are Section */}
    <div className="home-who">
      <div className="home-header1">
        <div className="home-heading">
          <h2 className="home-text006">Easy & Powerful</h2>
          <h2 className="home-text006">Performance</h2>
          <span className="home-text007">
            간단한 정보만 입력하세요. 즉시, 사용 가능한 시간표를 생성해
            드립니다.
          </span>
        </div>
        <button className="home-button1 button">Let’s start</button>
      </div>
      <div className="home-preview">
        <div className="home-image04">
          <img alt="Preview" src={previewIcon} className="home-image05" />
        </div>
        <div className="home-video">
          <video src="" poster={videoPoster} className="home-video1"></video>
        </div>
      </div>
    </div>

    {/* Testimonials Section - Simplified for demonstration */}
    <div className="home-section">
      <div className="home-testimonials">
        <div className="home-header2">
          <span className="home-caption3">What our clients say</span>
          <div className="home-controls">
            {/* SVG inline 사용 예시입니다. 실제로는 외부 컴포넌트나 이미지로 관리하는 것이 좋습니다. */}
            <svg
              id="quote-previous"
              viewBox="0 0 1024 1024"
              className="home-icon2"
            >
              <path d="M670.165 737.835l-225.835-225.835 225.835-225.835c16.683-16.683 16.683-43.691 0-60.331s-43.691-16.683-60.331 0l-256 256c-16.683 16.683-16.683 43.691 0 60.331l256 256c16.683 16.683 43.691 16.683 60.331 0s16.683-43.691 0-60.331z"></path>
            </svg>
            <span className="home-text064">——</span>
            <svg id="quote-next" viewBox="0 0 1024 1024" className="home-icon4">
              <path d="M414.165 798.165l256-256c16.683-16.683 16.683-43.691 0-60.331l-256-256c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331l225.835 225.835-225.835 225.835c-16.683 16.683-16.683 43.691 0 60.331s43.691 16.683 60.331 0z"></path>
            </svg>
          </div>
        </div>
        <div className="home-row3">
          {/* 각 testimonial item 반복 */}
          <div className="quote">
            <div className="testimonial-testimonial testimonial-root-class-name">
              <div className="testimonial-content">
                <img
                  alt="Apostrophe"
                  src={apostropheIcon}
                  className="testimonial-icon"
                />
                <span className="testimonial-text">
                  <span>남재홍 입니다.</span>
                </span>
              </div>
              <div className="testimonial-author">
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDl8fHBvdHJhaXR8ZW58MHx8fHwxNjY5NTY3NDE5&ixlib=rb-4.0.3&w=200"
                  className="testimonial-author1"
                />
                <div className="testimonial-details">
                  <span className="testimonial-name">
                    <span>남재홍</span>
                  </span>
                  <span className="testimonial-origin">
                    <span>@JHNAM</span>
                  </span>
                </div>
              </div>
              <div className="testimonial-divider"></div>
            </div>
          </div>
          <div className="quote">
            <div className="testimonial-testimonial testimonial-root-class-name">
              <div className="testimonial-content">
                <img
                  alt="Apostrophe"
                  src={apostropheIcon}
                  className="testimonial-icon"
                />
                <span className="testimonial-text">
                  <span>나광호 입니다.</span>
                </span>
              </div>
              <div className="testimonial-author">
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDl8fHBvdHJhaXR8ZW58MHx8fHwxNjY5NTY3NDE5&ixlib=rb-4.0.3&w=200"
                  className="testimonial-author1"
                />
                <div className="testimonial-details">
                  <span className="testimonial-name">
                    <span>나광호</span>
                  </span>
                  <span className="testimonial-origin">
                    <span>@Nah</span>
                  </span>
                </div>
              </div>
              <div className="testimonial-divider"></div>
            </div>
          </div>
          <div className="quote">
            <div className="testimonial-testimonial testimonial-root-class-name">
              <div className="testimonial-content">
                <img
                  alt="Apostrophe"
                  src={apostropheIcon}
                  className="testimonial-icon"
                />
                <span className="testimonial-text">
                  <span>이지형 입니다.</span>
                </span>
              </div>
              <div className="testimonial-author">
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDl8fHBvdHJhaXR8ZW58MHx8fHwxNjY5NTY3NDE5&ixlib=rb-4.0.3&w=200"
                  className="testimonial-author1"
                />
                <div className="testimonial-details">
                  <span className="testimonial-name">
                    <span>이지형</span>
                  </span>
                  <span className="testimonial-origin">
                    <span>@Ezbro</span>
                  </span>
                </div>
              </div>
              <div className="testimonial-divider"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Contact Section */}

    {/* About Us Section */}

    {/* Footer */}
  </div>
);

export default MainPage;
