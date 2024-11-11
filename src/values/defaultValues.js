export const defaultValues = {
  // 정확하게는 이 데이터는 사용자가 시간표를 생성하기 위해 입력하는 모든 데이터들을 하나로 묶은 것.
  // 이 입력으로 여러 시간표가 생성될 수 있음.

  // 시간표 id (MongoDB에서 사용하는 _id와 다른 값이며 UUID를 생성한 값을 사용)
  id: "6666",
  // 시간표 이름
  timetableName: "2024-2",
  // 시간표 비밀번호 (시간표 id와 password로 식별)
  password: "1234",
  // 시간표 설명
  timetableDescription: "12341234",
  // 시간표 결과값 갯수
  timetableResult: 1,
  // 시간표 점심시간 제약조건 설정
  timetableLunchTimeConstraint: true,
  // 시간표 교수 주 4일 강의 여부 제약조건 설정
  timetable4daysConstraint: true,
  // 전임교원 정보
  professors: [
    {
      // 전임 교원 이름
      professorName: "최경주",
      // 전임 교원 코드
      professorCode: "P-001",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 6교시
      offTimes: [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 6교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "이종연",
      // 전임 교원 코드
      professorCode: "P-002",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "김정훈",
      // 전임 교원 코드
      professorCode: "P-003",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "이건명",
      // 전임 교원 코드
      professorCode: "P-004",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
        [3, 7],
        [3, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "홍장의",
      // 전임 교원 코드
      professorCode: "P-005",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
        [2, 6],
        [2, 7],
        [2, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "류관희",
      // 전임 교원 코드
      professorCode: "P-006",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "이재성",
      // 전임 교원 코드
      professorCode: "P-007",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "Aziz",
      // 전임 교원 코드
      professorCode: "P-009",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "조오현",
      // 전임 교원 코드
      professorCode: "P-010",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "노서영",
      // 전임 교원 코드
      professorCode: "P-011",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
        [3, 7],
        [3, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "조희승",
      // 전임 교원 코드
      professorCode: "P-012",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "이의종",
      // 전임 교원 코드
      professorCode: "P-013",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "정지훈",
      // 전임 교원 코드
      professorCode: "P-014",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "신임교원",
      // 전임 교원 코드
      professorCode: "P-015",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "박정희",
      // 전임 교원 코드
      professorCode: "P-016",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "김세민",
      // 전임 교원 코드
      professorCode: "P-017",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "이병훈",
      // 전임 교원 코드
      professorCode: "P-018",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "안광모",
      // 전임 교원 코드
      professorCode: "P-019",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "김윤석",
      // 전임 교원 코드
      professorCode: "P-020",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "장순선",
      // 전임 교원 코드
      professorCode: "P-021",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "정태은",
      // 전임 교원 코드
      professorCode: "P-022",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "김용채",
      // 전임 교원 코드
      professorCode: "P-023",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "강재구",
      // 전임 교원 코드
      professorCode: "P-024",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "신재혁",
      // 전임 교원 코드
      professorCode: "P-025",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "문현주",
      // 전임 교원 코드
      professorCode: "P-026",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "주영관",
      // 전임 교원 코드
      professorCode: "P-027",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "황경순",
      // 전임 교원 코드
      professorCode: "P-028",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "홍신",
      // 전임 교원 코드
      professorCode: "P-029",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: true,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
        [2, 6],
        [2, 7],
        [2, 8],
      ],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "김덕기",
      // 전임 교원 코드
      professorCode: "P-030",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
    {
      // 전임 교원 이름
      professorName: "우창우",
      // 전임 교원 코드
      professorCode: "P-031",
      // 전임교원의 교수 여부, 기본 값 true, true = 교수, false = 강사
      isProfessor: false,
      // 교수의 총 강의 갯수
      lectureCnt: 0,
      // 전임교원이 강의하지 못하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 8교시
      hopeTimes: [],
    },
  ],
  // 강의실 정보
  classrooms: [
    {
      // 건물명
      buildingName: "S4-1",
      // 강의실 번호
      classroomNumber: "101",
      // 수용 인원
      capacity: 60,
      // 0 = 일반 강의만 가능, 1 = 대학원 강의만 가능, 2 = 둘 다 가능
      forGrad: 2,
      // 0 = 이론, 1 = 실습, 2 = 대형, 3 = 기타, 4 = 해당 없음
      // forGrad 값이 2면 자동적으로 해당 없음으로 체크되도록 내부적으로 설정
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "102",
      capacity: 60,
      forGrad: 2,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "103",
      capacity: 60,
      forGrad: 2,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "104",
      capacity: 60,
      forGrad: 2,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "106",
      capacity: 60,
      forGrad: 2,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "201",
      capacity: 60,
      forGrad: 2,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "202",
      capacity: 60,
      forGrad: 2,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "203",
      capacity: 60,
      forGrad: 2,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "205",
      capacity: 60,
      forGrad: 2,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "206",
      capacity: 60,
      forGrad: 2,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "222",
      capacity: 40,
      forGrad: 1,
      group: 0,
    },
    {
      buildingName: "E8-7",
      classroomNumber: "101",
      capacity: 100,
      forGrad: 0,
      group: 2,
    },
    {
      buildingName: "E8-7",
      classroomNumber: "235",
      capacity: 100,
      forGrad: 0,
      group: 2,
    },
    {
      buildingName: "E8-7",
      classroomNumber: "440",
      capacity: 100,
      forGrad: 0,
      group: 2,
    },
    {
      buildingName: "E8-10",
      classroomNumber: "104",
      capacity: 100,
      forGrad: 0,
      group: 2,
    },
    {
      buildingName: "E9",
      classroomNumber: "105",
      capacity: 200,
      forGrad: 0,
      group: 2,
    },
    {
      buildingName: "E9",
      classroomNumber: "241",
      capacity: 100,
      forGrad: 0,
      group: 2,
    },
    {
      buildingName: "E9",
      classroomNumber: "271",
      capacity: 100,
      forGrad: 0,
      group: 2,
    },
    {
      buildingName: "E9",
      classroomNumber: "308",
      capacity: 100,
      forGrad: 0,
      group: 2,
    },
  ],
  classroomGroups: [
    {
      id: 0,
      groupName: "이론",
    },
    {
      id: 1,
      groupName: "실습",
    },
    {
      id: 2,
      groupName: "대형",
    },
    {
      id: 3,
      groupName: "기타",
    },
    {
      id: 4,
      groupName: "상관 없음",
    },
    {
      id: 5,
      groupName: "커스텀 1",
    },
    {
      id: 6,
      groupName: "커스텀 2",
    },
    {
      id: 7,
      groupName: "커스텀 3",
    },
    {
      id: 8,
      groupName: "커스텀 4",
    },
    {
      id: 9,
      groupName: "커스텀 5",
    },
  ],
  // 강의 정보
  lectures: [
    {
      lectureName: "컴퓨터시스템개론",
      lectureCode: "LN-001",
      year: 1,
      group: 0,
      majorRequired: true,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 1,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [[2, 1]],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [
                [3, 0],
                [3, 1],
              ],
            },
          ],
          capacity: 60,
          professor: "P-001",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-019",
        },
        {
          divisionNumber: 2,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-018",
        },
        {
          divisionNumber: 3,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-019",
        },
      ],
    },
    {
      lectureName: "오픈소스소프트웨어 이해와 실습",
      lectureCode: "LN-002",
      year: 1,
      group: 1,
      majorRequired: true,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-011",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-025",
        },
        {
          divisionNumber: 2,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-018",
        },
      ],
    },
    {
      lectureName: "미래설계준비",
      lectureCode: "LN-003",
      year: 1,
      group: 2,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [[1, 1]],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-001",
        },
      ],
    },
    {
      lectureName: "알고리즘",
      lectureCode: "LN-004",
      year: 2,
      group: 0,
      majorRequired: true,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: true,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-013",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: true,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-015",
        },
        {
          divisionNumber: 2,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: true,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-003",
        },
      ],
    },
    {
      lectureName: "프로그래밍언어론",
      lectureCode: "LN-005",
      year: 2,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-029",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-029",
        },
      ],
    },
    {
      lectureName: "시스템소프트웨어",
      lectureCode: "LN-006",
      year: 2,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-012",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-012",
        },
      ],
    },
    {
      lectureName: "창업탐색",
      lectureCode: "LN-007",
      year: 2,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-004",
        },
      ],
    },
    {
      lectureName: "오픈소스개발프로젝트",
      lectureCode: "LN-008",
      year: 2,
      group: 1,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-024",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-031",
        },
      ],
    },
    {
      lectureName: "확률및통계",
      lectureCode: "LN-009",
      year: 2,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-030",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-030",
        },
      ],
    },
    {
      lectureName: "컴퓨터그래픽스",
      lectureCode: "LN-010",
      year: 2,
      group: 0, // 이론 및 실습
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-006",
        },
      ],
    },
    {
      lectureName: "산학프로젝트(종합설계)",
      lectureCode: "LN-011",
      year: 3,
      group: 1,
      majorRequired: true,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-029",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-024",
        },
      ],
    },
    {
      lectureName: "창업설계",
      lectureCode: "LN-012",
      year: 3,
      group: 2,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-014",
        },
      ],
    },
    {
      lectureName: "데이터베이스시스템",
      lectureCode: "LN-013",
      year: 3,
      group: 0, // 이론 및 실습
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-002",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-011",
        },
      ],
    },
    {
      lectureName: "인공지능",
      lectureCode: "LN-014",
      year: 3,
      group: 0,
      majorRequired: true,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-004",
        },
      ],
    },
    {
      lectureName: "소프트웨어공학",
      lectureCode: "LN-015",
      year: 3,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-002",
        },
      ],
    },
    {
      lectureName: "정보검색",
      lectureCode: "LN-016",
      year: 3,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-007",
        },
      ],
    },
    {
      lectureName: "VR·AR·GAME 이론및실제",
      lectureCode: "LN-017",
      year: 3,
      group: 0, // 이론 및 실습 강의
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-006",
        },
      ],
    },
    {
      lectureName: "소프트웨어공학",
      lectureCode: "LN-018",
      year: 3,
      group: 0,
      majorRequired: true,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: true,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-005",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: true,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-013",
        },
      ],
    },
    {
      lectureName: "정보보호",
      lectureCode: "LN-019",
      year: 3,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-010",
        },
      ],
    },
    {
      lectureName: "인공지능",
      lectureCode: "LN-020",
      year: 3,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-014",
        },
      ],
    },
    {
      lectureName: "서버프로그래밍",
      lectureCode: "LN-021",
      year: 3,
      group: 1,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: true,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-012",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: true,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-015",
        },
      ],
    },
    {
      lectureName: "창업산학초청세미나II",
      lectureCode: "LN-023",
      year: 4,
      group: 2,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-006",
        },
      ],
    },
    {
      lectureName: "클라우드컴퓨팅",
      lectureCode: "LN-024",
      year: 4,
      group: 1,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-011",
        },
      ],
    },
    {
      lectureName: "자연언어처리",
      lectureCode: "LN-025",
      year: 4,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 1,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-007",
        },
      ],
    },
    {
      lectureName: "창업파일럿프로젝트(종합설계)",
      lectureCode: "LN-026",
      year: 4,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [[0, 0]],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-001",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: true,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-002",
        },
      ],
    },
    {
      lectureName: "빅데이터분석시각화",
      lectureCode: "LN-027",
      year: 4,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-003",
        },
      ],
    },
    {
      lectureName: "정보·컴퓨터교육론",
      lectureCode: "LN-028",
      year: 4,
      group: 0,
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-021",
        },
      ],
    },
  ],
  // 대학원 강의 정보
  postgraduateLectures: [
    {
      postgraduateLectureName: "연구윤리 및 연구과제 I",
      postgraduateLectureCode: "PG-01",
      gradClassrooms: ["S4-1-101", "S4-1-222"],
      isGrad: true,
      atNight: true,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-006",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: "",
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-004",
        },
        {
          divisionNumber: 2,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: "",
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-007",
        },
        {
          divisionNumber: 3,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: "",
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-011",
        },
      ], // 항상 최소 1개의 분반을 추가
    },
    {
      postgraduateLectureName: "연구윤리 및 연구과제 II",
      postgraduateLectureCode: "PG-02",
      gradClassrooms: ["S4-1-222"],
      isGrad: true,
      atNight: true,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-006",
        },
      ],
    },
    {
      postgraduateLectureName: "동물의료인공지능",
      postgraduateLectureCode: "PG-03",
      gradClassrooms: ["S4-1-222"],
      isGrad: true,
      atNight: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-014",
        },
      ],
    },
    {
      postgraduateLectureName: "컴퓨터과학특강",
      postgraduateLectureCode: "PG-04",
      gradClassrooms: ["S4-1-222"],
      isGrad: true,
      atNight: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-010",
        },
      ],
    },
    {
      postgraduateLectureName: "지식표현 및 의사결정추론",
      postgraduateLectureCode: "PG-05",
      gradClassrooms: ["S4-1-222"],
      isGrad: true,
      atNight: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 0,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-002",
        },
      ],
    },
    {
      postgraduateLectureName: "소프트웨어테스팅실전",
      postgraduateLectureCode: "PG-06",
      gradClassrooms: ["S4-1-222"],
      isGrad: true,
      atNight: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false, // 강의 시간 분리 그룹화2
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-029",
        },
      ],
    },
    {
      postgraduateLectureName: "시각인식특강",
      postgraduateLectureCode: "PG-07",
      gradClassrooms: ["S4-1-222"],
      isGrad: true,
      atNight: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              isFixedTime: false,
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              isFixedTime: false,
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-006",
        },
      ],
    },
  ],
};
