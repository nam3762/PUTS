import React from "react";

export default function Help() {
  const helpContent1 = (
    <div className="flex flex-col gap-4 text-sm">
      <p>
        <span className="font-bold">
          1. 시간표 이름과 비밀번호를 설정하면 추후 시간표에 접근할 수 있습니다.
        </span>
      </p>
      <p>
        <span className="font-bold">
          2. 시간표 설명에는 시간표에 대한 간단한 설명을 적어주세요.
        </span>
      </p>
    </div>
  );

  const helpContent2 = (
    <div className="flex flex-col gap-4 text-sm">
      <p>
        <span className="font-bold">
          1. 교원 이름과 번호를 설정할 수 있습니다.
        </span>
      </p>
      <p>
        <span className="font-bold">
          2. 전임교원 여부를 구분하기 위해 체크를 진행합니다.
        </span>
      </p>
      <p>
        <span className="font-bold">
          3. 강의 불가능한 시간과 강의 선호시간을 요일과 시간별로 설정할 수
          있습니다.
        </span>
      </p>
      <p>
        <span className="font-bold">
          4. 드롭다운 메뉴로 입력한 교원을 이동할 수 있으며, 추가/삭제가
          가능합니다.
        </span>
      </p>
    </div>
  );

  const helpContent = (
    <div className="flex flex-col gap-4 text-sm">
      <p>
        <span className="font-bold">
          1. 건물 이름과 강의실 번호를 설정합니다.
        </span>
        <p className="indent-2">• 건물 이름 - "S4-1", 강의실 번호 - "101"</p>
      </p>
      <p>
        <span className="font-bold">
          2. 대학원 강의 여부를 구분하기 위해 체크를 진행합니다.
        </span>
        <p className="indent-2">• 일반 강의만 가능 - 일반 강의 ✓ </p>
        <p className="indent-2">• 대학원 강의만 가능 - 대학원 강의 ✓</p>
        <p className="indent-2">• 둘 다 가능 - 일반 + 대학원 ✓</p>
      </p>
      <p>
        <span className="font-bold">
          3. 강의실의 용도를 구분하기 위해 체크를 진행합니다.
        </span>
        <p className="indent-2">
          • 같은 그룹 내의 강의실을 그룹으로 묶어 추후 강의에 강의실 그룹을
          배정합니다.
        </p>
        <p className="indent-2">
          • 상관 없음에 지정되면 모든 강의실 그룹에 포함됩니다.
        </p>
        <p className="indent-2">• 이론 강의 - 이론 ✓ </p>
        <p className="indent-2">• 실습 강의 - 실습 ✓</p>
        <p className="indent-2">• 대형 강의 - 대형 ✓</p>
        <p className="indent-2">• 기타 강의 - 기타 ✓</p>
        <p className="indent-2">• 상관 없음 - 상관 없음 ✓</p>
      </p>
      <p>
        <span className="font-bold">
          4. 드롭다운 메뉴로 입력한 강의실을 이동할 수 있으며, 추가/삭제가
          가능합니다.
        </span>
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-4xl p-5">
      <h1 className="text-2xl font-bold mb-8 text-base-content">도움말</h1>

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
