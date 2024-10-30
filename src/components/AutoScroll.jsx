import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 자동 스크롤 컴포넌트 (GPT 사용, 이해 필요)
export default function AutoScroll() {
  const location = useLocation(); // 현재 경로 가져오기

  useEffect(() => {
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const startPosition = window.scrollY;
    const targetPosition = navbarHeight;
    const distance = targetPosition - startPosition;
    const duration = 500; // 애니메이션 지속 시간 (밀리초)
    let startTime = null;

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const smoothScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
    };

    requestAnimationFrame(smoothScroll);
  }, [location.pathname]); // 경로가 바뀔 때마다 effect 실행

  return null;
}
