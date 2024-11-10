# dataLoading.py
import json
from datetime import datetime
from config.config import db  # MongoDB 연결 설정을 가져옵니다.
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
        self.weekConstraint = False  # 주 4일 근무 제약 조건 적용 여부

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
        def expand_schedule(schedule_indices):
            expanded_schedule = [[False for _ in range(13)] for _ in range(5)]
            for day, period in schedule_indices:
                if 0 <= day < 5 and 0 <= period < 13:
                    expanded_schedule[day][period] = True
                else:
                    raise ValueError(f"Invalid day or period index: {day}, {period}")
            return expanded_schedule

        # 'offTimes'와 'hopeTimes' 가져오기
        off_times_indices = professor_data.get('offTimes', [])
        hope_times_indices = professor_data.get('hopeTimes', [])

        # 이미 인덱스의 리스트이므로 변환 없이 바로 사용
        free = expand_schedule(off_times_indices)
        hope = expand_schedule(hope_times_indices)
        
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

    # 각 교수의 강의 수 계산 및 주 4일 근무 제약 조건 조정
    for professor in professors:
        # 해당 교수의 총 강의 수 계산
        lecture_count = sum(1 for lecture in lectures if lecture.profCode == professor.profCode)
        professor.totalLectureCnt = lecture_count
        professor.lectureCnt = lecture_count  # 남은 강의 수 초기화

        # 주 4일 근무 제약 조건 설정
        if professor.isprof and professor.totalLectureCnt >= 4:
            professor.weekConstraint = True  # 교수이며 강의 수가 4개 이상인 경우 제약 조건 적용
        else:
            professor.weekConstraint = False  # 그 외의 경우 제약 조건 미적용

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
            if professor.lectureCnt < 4:
                print(f"{professor.name}의 과목이 4개 미만입니다. 주 4일 근무 제약 조건이 해제됩니다.", end=" / ")
    print()

    print("미리 고정된 강의 개수를 확인합니다...", end=" ")
    fixedLectureCnt = sum(1 for lecture in lectures if lecture.isFixedTime)
    print(f"총 {fixedLectureCnt}개의 강의가 고정되었습니다.")

# 추가적인 코드 및 시간표 생성 로직을 여기에 추가하시면 됩니다.
