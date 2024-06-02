import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleLogo from "./public/google-logo.png"; // Ensure you have this image in your project

function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/signupProcess", {
          email,
          nickname,
          password,
      });
      setMessage("회원가입 성공!");
      navigate("/login");
    } catch (error) { 
        if (error.response.status === 400) {
            setMessage("해당 이메일은 이미 사용 중입니다.");
        } else {
            setMessage("회원가입 실패");
        }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">Sign Up</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
          <div className="flex items-center justify-center my-6">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <button
            type="button"
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-200"
          >
            <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
