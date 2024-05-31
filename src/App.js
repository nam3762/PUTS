import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MainPage from "./Mainpage";
import SignupPage from "./Signup";
import MyPage from "./Mypage";
import EditProfile from "./EditProfile";
import TimetableManage from "./TimetableManage";
import Professor from "./Professor";
import Classroom from "./Classroom";
import ClassroomGroup from "./ClassroomGroup";
import Lecture from "./Lecture";
import FinishInsert from "./FinishInsert";
import FirstPage from "./Firstpage";
import LoginPage from "./Login";
import { FormProvider } from "./FormContext";
import FixedLecture from "./FixedLecture";
import ModifyTimetable from "./ModifyTimetable";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    setIsLoggedIn(false);
  };

  return (
    <FormProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Mypage" element={<MyPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/TimetableManage" element={<TimetableManage />} />
          <Route path="/Classroom" element={<Classroom />} />
          <Route path="/ClassroomGroup" element={<ClassroomGroup />} />
          <Route path="/Lecture" element={<Lecture />} />
          <Route path="/FinishInsert" element={<FinishInsert />} />
          <Route path="/Professor" element={<Professor />} />
          <Route path="/Firstpage" element={<FirstPage />} />
          <Route path="/Fixedlecture" element={<FixedLecture />} />
          <Route path="/ModifyTimetable" element={<ModifyTimetable />} />
          <Route path="/Login" element={<LoginPage onLogin={handleLogin} />} />
          {/* 추가 경로 정의 가능 */}
        </Routes>
        <Footer />
      </Router>
    </FormProvider>
  );
}

export default App;
