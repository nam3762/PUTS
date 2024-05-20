import React from "react";
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

function App() {
  return (
    <Router>
      <Navbar />
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
        {/* 추가 경로 정의 가능 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
