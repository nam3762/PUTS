import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function usePreventBackNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 새로고침 또는 페이지 닫기 시 경고 메시지 표시
      const confirmationMessage =
        "이 페이지를 떠나면 변경 사항이 저장되지 않을 수 있습니다. 계속하시겠습니까?";
      event.preventDefault();
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handlePopState = () => {
      // 뒤로 가기 또는 앞으로 가기 시 경고창을 띄움
      const confirmationMessage =
        "이 페이지를 나가면 변경 사항이 저장되지 않을 수 있습니다. 계속하시겠습니까?";
      const confirmed = window.confirm(confirmationMessage);

      if (confirmed) {
        // 확인된 경우 홈 화면으로 리다이렉트
        navigate("/", { replace: true });
      } else {
        // 취소 시 history를 다시 현재 페이지로 유지
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    // 새로고침 또는 페이지 닫기 감지
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 뒤로 가기 또는 앞으로 가기 감지
    window.addEventListener("popstate", handlePopState);

    // popstate 이벤트로 현재 상태 푸시 (초기 상태 설정)
    window.history.pushState(null, null, window.location.pathname);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
}
