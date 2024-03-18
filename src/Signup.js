import React from "react";
import "./Mainpage.css"; // Adjust the path as needed
import "./Signup.css"; // Adjust the path as needed
import googleLogo from "./public/google-logo.png"; // Ensure you have this image in your project

function SignupPage() {
  // Example function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="home-container">
      <div className="home-signup">
        <div className="home-header">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-field">
              {/* Adjusted button logic for React */}
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </div>
            <div className="form-divider"></div>
            <div className="form-field google-signup">
              <button type="button" className="google-signup-button">
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  className="google-logo"
                />
                Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
