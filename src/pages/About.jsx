import React from "react";

export default function About() {
  const developers = [
    {
      name: "남재홍",
      role: "프론트엔드 개발",
      description:
        "React 및 최신 프론트엔드 기술을 이용하여 디자인과 UI/UX를 구현했습니다.",
      image: "https://via.placeholder.com/150", // 대체 이미지 URL
    },
    {
      name: "나광호",
      role: "백엔드 개발",
      description: "Django와 MongoDB를 사용하여 서버 및 API를 구축하였습니다.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "이지형",
      role: "알고리즘 개발",
      description:
        "Python을 이용해 시간표 자동화 제작 알고리즘을 구현했습니다.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-4xl p-5">
      <h1 className="text-2xl font-bold mb-8 text-base-content">About Us</h1>

      {/* 개발자 소개 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base-content">
        {developers.map((dev, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={dev.image} alt={dev.name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{dev.name}</h2>
              <p className="text-gray-500">{dev.role}</p>
              <p>{dev.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 제작 과정 설명 섹션 */}
      <div className="card w-full bg-base-100 shadow-xl mt-8 text-base-content">
        <div className="card-body">
          <h2 className="card-title">웹페이지 제작 과정</h2>
          <p>
            이 웹페이지는 React와 JavaScript를 기반으로 만들어졌으며, 사용자
            경험을 극대화하기 위해 최신 프론트엔드 기술을 사용했습니다.
            프론트엔드 개발은 React 라이브러리를 사용하여 모듈화된 컴포넌트를
            작성하였고, TailwindCSS와 DaisyUI를 사용하여 빠르고 일관된 UI
            디자인을 적용했습니다.
          </p>
          <p>
            백엔드는 FastAPI로 구축되었으며, 데이터베이스는 MongoDB를
            사용했습니다. 서버와 클라이언트 간의 통신은 RESTful API를 통해
            이루어졌고, 페이지의 반응성과 안정성을 고려하여 설계되었습니다.
          </p>
          <p>
            알고리즘은 백트래킹, 브루트포스를 이용하여 8개 이상의 제약조건을
            고려하여 제작되었습니다. 대학원 강의, 야간 강의, 전임 교원/강사
            여부, 교수 별 선호시간, 연구일 등 시간표 생성 시 고려할 수 있는 많은
            선택지를 고려하여 최선의 시간표를 생성합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
