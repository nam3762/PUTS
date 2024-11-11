import React from "react";
import { helpContent1 } from "./Timetable/TimetableGenerator";
import { helpContent2 } from "./Timetable/Professors";
import { helpContent3 } from "./Timetable/Classrooms";
import { helpContent4 } from "./Timetable/Lectures";
import { helpContent5 } from "./Timetable/PostgraduateLectures";
import { helpContent6 } from "./Timetable/TimetableCustomizing";
import { helpContent7 } from "./Timetable/TimetableResult";

const warning = (
  <div className="flex flex-col gap-4 text-sm">
    <p className="font-bold">
      시간표 제작은 총 7단계의 입력으로 구성되며, 입력 도중 사이트를 이탈할 시
      입력한 내용이 저장되지 않습니다.
    </p>
    <p className="font-bold">
      컴퓨터(크롬 브라우저, 전체 화면)에서 입력을 권장합니다.
    </p>
  </div>
);

const constraints = (
  <div className="flex flex-col gap-2 text-sm">
    <p className="indent-2">• 한 교원이 한 시간에 여러 강의 불가</p>
    <p className="indent-2">
      • 한 강의실이 한 시간에 여러 교과목 중복 배치 불가
    </p>
    <p className="indent-2">• 전공 필수 교과목 간 같은 시간 배치 불가</p>
    <p className="indent-2">• 같은 학년의 교과목 같은 시간 배치 불가</p>
    <p className="indent-2">• 한 강의의 다른 시간대가 같은 요일에 배치 불가</p>
    <p className="indent-2">
      • 같은 강의의 다른 분반은 동시에 배치 가능 (강의 시간 분할 그룹화)
    </p>
    <p className="indent-2">• 교원의 최소 강의일 수 보장 (4일)</p>
    <p className="indent-2">
      • 각 학년의 점심시간은 11시부터 15시 사이에 배정하며, 1시간 이상 확보 보장
    </p>
  </div>
);

export default function Help() {
  // 각각의 도움말 내용을 변수로 할당
  const cardContents = [
    { title: "", content: warning },
    { title: "시간표가 만족하는 제약조건", content: constraints },
    { title: "시간표 제작 과정", content: helpContent1 },
    { title: "교원 정보", content: helpContent2 },
    { title: "강의실 정보", content: helpContent3 },
    { title: "교과목 정보", content: helpContent4 },
    { title: "대학원 교과목 정보", content: helpContent5 },
    { title: "시간표 커스터마이징", content: helpContent6 },
    { title: "최종 시간표 결과", content: helpContent7 },
  ];

  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-4xl p-5">
      <h1 className="text-2xl font-bold mb-8 text-base-content">도움말</h1>

      {/* 각각의 카드 생성 */}
      {cardContents.map((item, index) => (
        <div
          key={index}
          className="card w-full bg-base-100 shadow-xl mt-8 text-base-content"
        >
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
