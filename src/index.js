import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // 전역 CSS 스타일
import "./style.css"; // 전역 CSS 스타일
import App from "./App"; // App 컴포넌트 임포트
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);

// App 컴포넌트를 렌더링합니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
