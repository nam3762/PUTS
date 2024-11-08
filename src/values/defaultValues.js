export const defaultValues = {
  // 정확하게는 이 데이터는 사용자가 시간표를 생성하기 위해 입력하는 모든 데이터들을 하나로 묶은 것.
  // 이 입력으로 여러 시간표가 생성될 수 있음.

  // 시간표 id (MongoDB에서 사용하는 _id와 다른 값이며 _id값을 이용하여 UUID를 생성한 값을 사용)
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
        [0, 0],
        [0, 1],
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
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 6교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 6교시
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
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 6교시
      offTimes: [],
      // 전임교원이 강의하기 희망하는 요일과 시간
      // 2차원 배열, ex: [0, 0] -> 월요일 1교시, [4, 7] -> 금요일 6교시
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
      // 0 = 일반 강의만 가능, 1 = 둘 다 가능, 2 = 대학원 강의만 가능
      forGrad: 1,
      // 0 = 이론, 1 = 실습, 2 = 대형, 3 = 기타, 4 = 해당 없음
      // forGrad 값이 2면 자동적으로 해당 없음으로 체크되도록 내부적으로 설정
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "102",
      capacity: 60,
      forGrad: 1,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "103",
      capacity: 60,
      forGrad: 1,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "104",
      capacity: 60,
      forGrad: 1,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "106",
      capacity: 60,
      forGrad: 1,
      group: 0,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "201",
      capacity: 60,
      forGrad: 1,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "202",
      capacity: 60,
      forGrad: 1,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "203",
      capacity: 60,
      forGrad: 1,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "205",
      capacity: 60,
      forGrad: 1,
      group: 1,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "206",
      capacity: 60,
      forGrad: 1,
      group: 1,
    },
    {
      buildingName: "E8-7",
      classroomNumber: "101",
      capacity: 100,
      forGrad: 2,
      group: 2,
    },
    {
      buildingName: "S4-1",
      classroomNumber: "301",
      capacity: 40,
      forGrad: 3,
      group: 4,
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
  ],
  // 강의 정보
  lectures: [
    {
      // 강의 이름
      lectureName: "자료구조",
      // 강의 코드
      lectureCode: "LN-001",
      // 학년
      year: 2,
      // 강의실 그룹
      group: 0,
      // 전공 필수 여부
      majorRequired: true,
      // 대학원 여부
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-001",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: true,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-001",
        },
      ], // 항상 최소 1개의 분반을 추가
    },
    {
      // 강의 이름
      lectureName: "컴퓨터구조",
      // 강의 코드
      lectureCode: "LN-002",
      // 학년
      year: 2,
      // 강의실 그룹
      group: 1,
      // 전공 필수 여부
      majorRequired: true,
      // 대학원 여부
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
            {
              sectionTime: 2,
              isTPGroup2: false,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
          ],
          capacity: 60,
          professor: "P-003",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 3,
              isTPGroup1: false,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
            {
              sectionTime: 1,
              isTPGroup2: false,
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
          ],
          capacity: 40,
          professor: "P-003",
        },
      ], // 항상 최소 1개의 분반을 추가
    },
  ],
  // 대학원 강의 정보
  postgraduateLectures: [
    {
      // 대학원 강의 이름
      postgraduateLectureName: "대학원 강의1",
      // 강의 코드
      postgraduateLectureCode: "LP-01",
      // 대학원 강의일 때 배치할 수 있는 강의실
      gradClassrooms: ["S4-1-101", "S4-1-103"],
      // 대학원 여부
      isGrad: true,
      // 야간 강의 여부 (대학원 강의일 때만 설정)
      atNight: true,
      divisionGroup: [
        {
          divisionNumber: 0,
          sectionGroup: [
            {
              sectionTime: 2,
              isTPGroup1: false, // 강의 시간 분리 그룹화1
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
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
          capacity: 60,
          professor: "P-002",
        },
        {
          divisionNumber: 1,
          sectionGroup: [
            {
              sectionTime: 4,
              isTPGroup1: false, // 강의 시간 분리 그룹화1
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
            {
              sectionTime: "",
              isTPGroup2: false, // 강의 시간 분리 그룹화2
              // 미리 배치된 강의인가 (커스터마이징 기능)
              isFixedTime: false,
              // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
              FixedTime: [],
            },
          ],
          capacity: 30,
          professor: "P-002",
        },
      ], // 항상 최소 1개의 분반을 추가
    },
  ],
};
