// 추가 삭제용 버튼 컴포넌트

export default function Button({ onClick, style = "", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn mb-4 max-w-28 ${style}`}
    >
      {children}
    </button>
  );
}
