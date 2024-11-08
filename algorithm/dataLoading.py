# # dataLoading.py

# import json
# from datetime import datetime
# import time
# from config.config import db  # config.py에서 MongoDB 연결 설정을 가져옵니다.
# import algorithm.common as common
# from bson import ObjectId

# error = common.error

# ##### 데이터 정의 #####
# days = list(range(5))     # 0부터 4까지: 월(0)~금(4)
# hours = list(range(13))   # 0부터 12까지: 1교시(0)~13교시(12)

# # Option 클래스
# class Option:
#     def __init__(self, result_number=10, isWeek=False, isLunch=False):
#         self.result_number = result_number
#         self.isWeek = isWeek
#         self.isLunch = isLunch

# # Classroom 클래스: 강의실
# class Classroom:
#     def __init__(self, building, classroomNo, capacity, group, forGrad=0):
#         self.building = building        # 건물명
#         self.classroomNo = classroomNo  # 강의실 번호
#         self.capacity = capacity        # 수용 인원
#         self.group = group              # 강의실 구분(0:이론, 1:실습, 2:대형, 3:기타)
#         self.forGrad = forGrad          # 기본:0, 대학원 가능: 1, 대학원만 가능: 2

#     def __str__(self):
#         return json.dumps(vars(self), indent=2, ensure_ascii=False)

# # Professor 클래스: 교수
# class Professor:
#     def __init__(self, profCode, name, isprof=False, free=None, hope=None, lectureCnt=0):
#         self.profCode = profCode        # 교번
#         self.name = name                # 교수(강사)명
#         self.isprof = isprof            # 교수인지 강사인지 (주 4일 근무 필요한가)
#         self.lectureCnt = lectureCnt    # 강의 개수

#         # 쉬는 날짜 (True이면 해당 시간에 강의를 배정할 수 없음)
#         if free is None:
#             self.free = [[False for _ in hours] for _ in days]  # 기본값으로 모든 시간이 가능함
#         else:
#             self.free = free

#         # 희망 날짜 (True이면 해당 시간에 강의를 배정하기를 희망함)
#         if hope is None:
#             self.hope = [[False for _ in hours] for _ in days]  # 기본값으로 희망 시간이 없음
#         else:
#             self.hope = hope

#     def __str__(self):
#         return json.dumps(vars(self), indent=2, ensure_ascii=False)

# # Lecture 클래스: 강의
# class Lecture:
#     def __init__(self, lectureCode, division, TP, name, year, MR,
#                  group, duration, capacity, profCode, isTPGroup=False,
#                  isgrad=False, gradClassrooms=None, atNight=False,
#                  isFixedTime=False, FixedTime=None, isFixedSpace=False, FixedSpace=None,
#                  available=None, batched=None):
#         self.lectureCode = lectureCode          # 강의 코드
#         self.division = division                # 강의 분반
#         self.TP = TP                            # 강의 분할 번호
#         self.name = name                        # 강의명
#         self.year = year                        # 학년 (0: 학년 구분 없음)
#         self.MR = MR                            # 전공필수 여부 (True/False)
#         self.group = group                      # 수용 가능한 강의실 구분
#         self.duration = duration                # 강의 시간
#         self.capacity = capacity                # 수용 인원
#         self.profCode = profCode                # 강의 담당자 코드
#         self.isTPGroup = isTPGroup              # 분할 강의 그룹 여부
#         self.isgrad = isgrad                    # 대학원 강의 여부
#         self.gradClassrooms = gradClassrooms if gradClassrooms is not None else []
#         self.atNight = atNight                  # 야간 강의 여부
#         self.isFixedTime = isFixedTime          # 시간 고정 여부
#         self.FixedTime = FixedTime if FixedTime is not None else []
#         self.isFixedSpace = isFixedSpace        # 공간 고정 여부
#         self.FixedSpace = FixedSpace if FixedSpace is not None else []
#         self.available = available              # 가능한 시공간 리스트
#         self.batched = batched                  # 배치된 시공간

#     def __str__(self):
#         # available이 set일 경우 list로 변환
#         if isinstance(self.available, set):
#             available_list = list(self.available)
#         else:
#             available_list = self.available

#         # JSON 형식으로 보기 좋게 출력
#         data = vars(self)
#         data['available'] = available_list  # 변환된 available을 사용
#         return json.dumps(data, ensure_ascii=False)

# ##### 데이터 초기화 #####
# lectures = []
# professors = []
# classrooms = []

# option = Option(10, True, True)

# ##### 데이터베이스에서 시간표 데이터 불러오기 및 매핑 #####
# def load_and_map_data(timetable_id):
#     timetables_collection = db['Timetables']
#     timetable_data = timetables_collection.find_one({"id": timetable_id})
#     if not timetable_data:
#         raise Exception(f"시간표 ID {timetable_id}를 찾을 수 없습니다.")

#     # 강의실 데이터 매핑
#     classrooms = []
#     for classroom_data in timetable_data.get('classrooms', []):
#         classroom = Classroom(
#             building=classroom_data['buildingName'],
#             classroomNo=classroom_data['classroomNumber'],
#             capacity=classroom_data['capacity'],
#             group=classroom_data['group'],
#             forGrad=classroom_data.get('forGrad', 0)
#         )
#         classrooms.append(classroom)

#     # 교수 데이터 매핑
#     professors = []
#     for professor_data in timetable_data.get('professors', []):
#         # 'offTimes'를 기반으로 'free' 배열 생성
#         free = [[False for _ in hours] for _ in days]  # 기본값: 모든 시간이 가능
#         offTimes = professor_data.get('offTimes', [])
#         for time_slot in offTimes:
#             # time_slot이 "요일_교시" 형식이라고 가정 (예: "0_3"은 월요일 4교시)
#             try:
#                 day_str, period_str = time_slot.split('_')
#                 day = int(day_str)
#                 period = int(period_str)
#                 if 0 <= day < 5 and 0 <= period < 13:
#                     free[day][period] = True  # 해당 시간에 강의 불가
#                 else:
#                     print(f"교수 '{professor_data['professorName']}'의 offTime '{time_slot}'이 올바르지 않습니다.")
#             except ValueError:
#                 print(f"교수 '{professor_data['professorName']}'의 offTime '{time_slot}' 형식이 올바르지 않습니다.")

#         # 'hopeTimes'를 기반으로 'hope' 배열 생성
#         hope = [[False for _ in hours] for _ in days]  # 기본값: 희망 시간이 없음
#         hopeTimes = professor_data.get('hopeTimes', [])
#         for time_slot in hopeTimes:
#             # time_slot이 "요일_교시" 형식이라고 가정
#             try:
#                 day_str, period_str = time_slot.split('_')
#                 day = int(day_str)
#                 period = int(period_str)
#                 if 0 <= day < 5 and 0 <= period < 13:
#                     hope[day][period] = True  # 해당 시간에 강의 희망
#                 else:
#                     print(f"교수 '{professor_data['professorName']}'의 hopeTime '{time_slot}'이 올바르지 않습니다.")
#             except ValueError:
#                 print(f"교수 '{professor_data['professorName']}'의 hopeTime '{time_slot}' 형식이 올바르지 않습니다.")

#         professor = Professor(
#             profCode=professor_data['professorCode'],
#             name=professor_data['professorName'],
#             isprof=professor_data.get('isProfessor', False),
#             free=free,
#             hope=hope,
#             lectureCnt=professor_data.get('lectureCnt', 0)
#         )
#         professors.append(professor)

#     # 강의 데이터 매핑
#     lectures = []
#     for lecture_data in timetable_data.get('lectures', []):
#         lecture = Lecture(
#             lectureCode=lecture_data['lectureCode'],
#             division=lecture_data['divisionNumber'],
#             TP=lecture_data['TPNumber'],
#             name=lecture_data['lectureName'],
#             year=lecture_data['year'],
#             MR=lecture_data['majorRequired'],
#             group=lecture_data['group'],
#             duration=lecture_data['duration'],
#             capacity=lecture_data['capacity'],
#             profCode=lecture_data['professorCode'],
#             isTPGroup=lecture_data.get('isTPGroup', False),
#             isgrad=lecture_data.get('isGrad', False),
#             gradClassrooms=lecture_data.get('gradClassrooms', []),
#             atNight=lecture_data.get('atNight', False),
#             isFixedTime=lecture_data.get('isFixedTime', False),
#             FixedTime=lecture_data.get('FixedTime', []),
#             isFixedSpace=lecture_data.get('isFixedSpace', False),
#             FixedSpace=lecture_data.get('FixedSpace', []),
#             available=lecture_data.get('available', []),
#             batched=lecture_data.get('batched', [])
#         )
#         lectures.append(lecture)

#     # Option 객체 생성
#     option = Option(
#         result_number=timetable_data.get('timetableResult', 1),
#         isWeek=timetable_data.get('timetable4daysConstraint', False),
#         isLunch=timetable_data.get('timetableLunchTimeConstraint', False)
#     )

#     return lectures, professors, classrooms, option

# ##### 데이터 확인 함수 (필요한 경우) #####
# def display_data(lectures, professors):
#     print("※ 본 프로그램은 시간표가 생성 가능한가에 대한 보장 여부를 갖지 않습니다.")
#     print(f"실행시간: {datetime.now().strftime('%H시 %M분 %S초')}")

#     print("교수별 총 강의 수를 확인중입니다...")
#     for professor in professors:
#         professor.lectureCnt = sum(1 for lecture in lectures if lecture.profCode == professor.profCode)

#     for professor in professors:
#         if professor.isprof:
#             print(f"{professor.name}: {professor.lectureCnt}", end=" / ")
#     print()

#     print("미리 고정된 강의 개수를 확인합니다...", end=" ")
#     fixedLectureCnt = sum(1 for lecture in lectures if lecture.isFixedTime)
#     print(f"총 {fixedLectureCnt}개의 강의가 고정되었습니다.")



import json
from datetime import datetime
from config.config import db  # config.py에서 MongoDB 연결 설정을 가져옵니다.
import algorithm.common as common
from bson import ObjectId

error = common.error

# Option 클래스
class Option:
    def __init__(self, result_number=10, isWeek=False, isLunch=False):
        self.result_number = result_number
        self.isWeek = isWeek
        self.isLunch = isLunch

# Classroom 클래스: 강의실
class Classroom:
    def __init__(self, building, classroomNo, capacity, group, forGrad=0):
        self.building = building        # 건물명
        self.classroomNo = classroomNo  # 강의실 번호
        self.capacity = capacity        # 수용 인원
        self.group = group              # 강의실 구분(0:이론, 1:실습, 2:대형, 3:기타)
        self.forGrad = forGrad          # 기본:0, 대학원 가능: 1, 대학원만 가능: 2

    def __str__(self):
        return json.dumps(vars(self), indent=2, ensure_ascii=False)

# Professor 클래스: 교수
class Professor:
    def __init__(self, profCode, name, isprof=False, free=None, hope=None, lectureCnt=0):
        self.profCode = profCode        # 교번
        self.name = name                # 교수(강사)명
        self.isprof = isprof            # 교수인지 강사인지 (주 4일 근무 필요한가)
        self.lectureCnt = lectureCnt    # 강의 개수
        self.free = free if free is not None else [[False] * 13 for _ in range(5)]  # 기본값으로 모든 시간이 가능함
        self.hope = hope if hope is not None else [[False] * 13 for _ in range(5)]  # 기본값으로 희망 시간이 없음

    def __str__(self):
        return json.dumps(vars(self), indent=2, ensure_ascii=False)

# Lecture 클래스: 강의
class Lecture:
    def __init__(self, lectureCode, division, TP, name, year, MR,
                 group, duration, capacity, profCode, isTPGroup=False,
                 isgrad=False, gradClassrooms=None, atNight=False,
                 isFixedTime=False, FixedTime=None, isFixedSpace=False, FixedSpace=None,
                 available=None, batched=None):
        self.lectureCode = lectureCode          # 강의 코드
        self.division = division                # 강의 분반
        self.TP = TP                            # 강의 분할 번호
        self.name = name                        # 강의명
        self.year = year                        # 학년 (0: 학년 구분 없음)
        self.MR = MR                            # 전공필수 여부 (True/False)
        self.group = group                      # 수용 가능한 강의실 구분
        self.duration = duration                # 강의 시간
        self.capacity = capacity                # 수용 인원
        self.profCode = profCode                # 강의 담당자 코드
        self.isTPGroup = isTPGroup              # 분할 강의 그룹 여부
        self.isgrad = isgrad                    # 대학원 강의 여부
        self.gradClassrooms = gradClassrooms if gradClassrooms is not None else []
        self.atNight = atNight                  # 야간 강의 여부
        self.isFixedTime = isFixedTime          # 시간 고정 여부
        self.FixedTime = FixedTime if FixedTime is not None else []
        self.isFixedSpace = isFixedSpace        # 공간 고정 여부
        self.FixedSpace = FixedSpace if FixedSpace is not None else []
        self.available = available              # 가능한 시공간 리스트
        self.batched = batched                  # 배치된 시공간

    def __str__(self):
        # available이 set일 경우 list로 변환
        available_list = list(self.available) if isinstance(self.available, set) else self.available
        data = vars(self)
        data['available'] = available_list  # 변환된 available을 사용
        return json.dumps(data, ensure_ascii=False)

# 데이터베이스에서 시간표 데이터 불러오기 및 매핑
def load_and_map_data(timetable_id):
    timetables_collection = db['Timetables']
    timetable_data = timetables_collection.find_one({"id": timetable_id})
    if not timetable_data:
        raise Exception(f"시간표 ID {timetable_id}를 찾을 수 없습니다.")

    # 강의실 데이터 매핑
    classrooms = [
        Classroom(
            building=classroom_data['buildingName'],
            classroomNo=classroom_data['classroomNumber'],
            capacity=classroom_data['capacity'],
            group=classroom_data['group'],
            forGrad=classroom_data.get('forGrad', 0)
        ) for classroom_data in timetable_data.get('classrooms', [])
    ]

    # 교수 데이터 매핑
    professors = []
    for professor_data in timetable_data.get('professors', []):
        # 'offTimes'와 'hopeTimes' 배열 크기를 확인하고 맞추기
        def expand_schedule(schedule):
            if len(schedule) == 5 and all(len(day) == 8 for day in schedule):
                # Expand each day to length 13, filling with False
                return [day + [False] * (13 - len(day)) for day in schedule]
            return schedule

        free = expand_schedule(professor_data.get('offTimes', [[False] * 13 for _ in range(5)]))
        hope = expand_schedule(professor_data.get('hopeTimes', [[False] * 13 for _ in range(5)]))

        professor = Professor(
            profCode=professor_data['professorCode'],
            name=professor_data['professorName'],
            isprof=professor_data.get('isProfessor', False),
            free=free,
            hope=hope,
            lectureCnt=professor_data.get('lectureCnt', 0)
        )
        professors.append(professor)

    # 강의 데이터 매핑
    lectures = [
        Lecture(
            lectureCode=lecture_data['lectureCode'],
            division=lecture_data['divisionNumber'],
            TP=lecture_data['TPNumber'],
            name=lecture_data['lectureName'],
            year=lecture_data['year'],
            MR=lecture_data['majorRequired'],
            group=lecture_data['group'],
            duration=lecture_data['duration'],
            capacity=lecture_data['capacity'],
            profCode=lecture_data['professorCode'],
            isTPGroup=lecture_data.get('isTPGroup', False),
            isgrad=lecture_data.get('isGrad', False),
            gradClassrooms=lecture_data.get('gradClassrooms', []),
            atNight=lecture_data.get('atNight', False),
            isFixedTime=lecture_data.get('isFixedTime', False),
            FixedTime=lecture_data.get('FixedTime', []),
            isFixedSpace=lecture_data.get('isFixedSpace', False),
            FixedSpace=lecture_data.get('FixedSpace', []),
            available=lecture_data.get('available', []),
            batched=lecture_data.get('batched', [])
        ) for lecture_data in timetable_data.get('lectures', [])
    ]

    # Option 객체 생성
    option = Option(
        result_number=timetable_data.get('timetableResult', 1),
        isWeek=timetable_data.get('timetable4daysConstraint', False),
        isLunch=timetable_data.get('timetableLunchTimeConstraint', False)
    )

    return lectures, professors, classrooms, option
##### 데이터 확인 함수 (필요한 경우) #####
def display_data(lectures, professors):
    print("※ 본 프로그램은 시간표가 생성 가능한가에 대한 보장 여부를 갖지 않습니다.")
    print(f"실행시간: {datetime.now().strftime('%H시 %M분 %S초')}")

    print("교수별 총 강의 수를 확인중입니다...")
    for professor in professors:
        professor.lectureCnt = sum(1 for lecture in lectures if lecture.profCode == professor.profCode)

    for professor in professors:
        if professor.isprof:
            print(f"{professor.name}: {professor.lectureCnt}", end=" / ")
    print()

    print("미리 고정된 강의 개수를 확인합니다...", end=" ")
    fixedLectureCnt = sum(1 for lecture in lectures if lecture.isFixedTime)
    print(f"총 {fixedLectureCnt}개의 강의가 고정되었습니다.")
