from pydantic import BaseModel
from typing import List, Optional

# 강의실 모델
class Classroom(BaseModel):
    buildingName: str
    classroomNumber: str
    capacity: int
    group: int
    forGrad: Optional[int] = 0  # 기본값 0

# 교수 모델
class Professor(BaseModel):
    professorCode: str
    professorName: str
    isProfessor: Optional[bool] = False
    lectureCnt: Optional[int] = 0
    offTimes: Optional[List[List[int]]] = []  # 빈 리스트로 수정
    hopeTimes: Optional[List[List[int]]] = []  # 빈 리스트로 수정

# 강의 모델
class Lecture(BaseModel):
    lectureCode: str
    divisionNumber: int
    TPNumber: int
    lectureName: str
    year: int
    majorRequired: bool
    group: int
    duration: int
    capacity: int
    professorCode: str
    isTPGroup: Optional[bool] = False
    isGrad: Optional[bool] = False
    gradClassrooms: Optional[List[str]] = []
    atNight: Optional[bool] = False
    isFixedTime: Optional[bool] = False
    FixedTime: Optional[List[List[int]]] = []  # 빈 리스트로 수정
    isFixedSpace: Optional[bool] = False
    FixedSpace: Optional[List[str]] = []  # 빈 리스트로 수정
    available: Optional[List] = []
    batched: Optional[List] = []

# 시간표 모델
class Timetable(BaseModel):
    id: str  # 시간표 ID
    timetableName: str  # 시간표 이름
    password: str  # 비밀번호
    timetableDescription: Optional[str] = None  # 설명
    lectures: List[Lecture] = []  # 강의 목록
    classrooms: List[Classroom] = []  # 강의실 목록
    professors: List[Professor] = []  # 교수 목록
    timetableResult: int = 1  # 시간표 결과 상태 (기본값 1)
    timetableLunchTimeConstraint: bool = True  # 점심시간 제약 조건 (기본값 True)
    timetable4daysConstraint: bool = True  # 4일제 수업 제약 조건 (기본값 True)
