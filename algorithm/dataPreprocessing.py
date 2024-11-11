# dataPreprocessing.py
import json
import algorithm.common as common
from datetime import datetime

error = common.error

# 특정 강의별 담당 교수의 쉬는날과 주야간 여부에 의거하여 배치 가능한 날짜와 시간
class LectureByTime:
    def __init__(self, lectureCode, division, TP, available=None):
        self.lectureCode = lectureCode
        self.division = division
        self.TP = TP
        if available is None:
            self.available = [[True for _ in range(13)] for _ in range(5)]  # 기본값으로 모든 시간이 가능
        else:
            self.available = available

    def __str__(self):
        return json.dumps(vars(self), indent=2, ensure_ascii=False)

def get_lecturesByTime(lectures, professors):
    print("각 강의마다 배치가 가능한 시간을 확인하고 있습니다...")
    lecturesByTimes = []
    for lecture in lectures:
        lectureByTime = LectureByTime(lecture.lectureCode, lecture.division, lecture.TP)

        # 강의의 duration 값 검증
        if lecture.duration <= 0 or lecture.duration > 13:
            print(f"강의 '{lecture.name}'의 duration 값이 잘못되었습니다: {lecture.duration}")
            raise Exception("0x007")

        # 시간이 고정된 강의인 경우
        if lecture.isFixedTime:
            lectureByTime.available = [[False for _ in range(13)] for _ in range(5)]
            day_index = lecture.FixedTime[0][0]
            period_index = lecture.FixedTime[0][1]
            if 0 <= day_index < 5 and 0 <= period_index < 13:
                lectureByTime.available[day_index][period_index] = True
            else:
                print(f"강의 '{lecture.name}'의 고정 시간이 잘못되었습니다: {lecture.FixedTime}")
                raise Exception("0x003")
            lecturesByTimes.append(lectureByTime)
            continue

        # 교수 탐색
        exist = False
        for professor in professors:
            if professor.profCode == lecture.profCode:
                exist = True
                # 교수의 'free' 배열 크기 검증 및 출력
                # 해당 부분은 디버깅 시에만 활성화
                """
                print(f"교수 '{professor.name}'의 가능한 시간 (free 배열):")
                for day in range(5):
                    print(f"  Day {day}: {professor.free[day]}")
                """
                if len(professor.free) != 5 or any(len(day) != 13 for day in professor.free):
                    print(f"교수 '{professor.name}'의 'free' 배열 크기가 올바르지 않습니다.")
                    raise Exception("0x004")

                # 해당 강의의 교수 쉬는날에 의거하여 제거
                for day in range(5):
                    for period in range(13):
                        if professor.free[day][period]:
                            lectureByTime.available[day][period] = False
                break
        if not exist:
            print(f"강의 '{lecture.name}'의 교수 코드 '{lecture.profCode}'를 찾을 수 없습니다.")
            raise Exception("0x001")

        # 그 외 시간 중 duration에 의거하여 배치 불가능한 시간대 제거
        if not lecture.atNight:  # 주간인 경우
            limit = 9
            for day in range(5):
                for period in range(13):
                    if period >= limit or period + lecture.duration > limit:
                        lectureByTime.available[day][period] = False
        else:  # 야간인 경우
            limit = 13
            for day in range(5):
                for period in range(13):
                    if period < 9 or period + lecture.duration > limit:
                        lectureByTime.available[day][period] = False

        # 해당 강의가 가능한 시간대가 있으면 append, 아니면 오류 발생
        possible = any(
            lectureByTime.available[day][period]
            for day in range(5)
            for period in range(13)
        )
        if possible:
            lecturesByTimes.append(lectureByTime)
        else:
            print(f"강의 '{lecture.name}'에 배치 가능한 시간이 없습니다.")
            raise Exception("0x002")

    return lecturesByTimes

# 강의실의 수용 인원과 대학원 강의 여부에 의거하여 강의실별 배치할 수 있는 강의
class LectureByClassroom:
    def __init__(self, lectureCode, division, TP):
        self.lectureCode = lectureCode
        self.division = division
        self.TP = TP
        self.classroomList = set()  # {(building, classroomNo)}

def get_lecturesByClassroom(lectures, classrooms):
    print("각 강의마다 배치가 가능한 강의실을 확인하고 있습니다...")
    lecturesByClassrooms = []

    for lecture in lectures:
        lectureByClassroom = LectureByClassroom(lecture.lectureCode, lecture.division, lecture.TP)

        exist = False
        if lecture.isgrad:  # 대학원 강의인 경우
            for gradClassroom in lecture.gradClassrooms:
                try:
                    building, classroomNo = gradClassroom.rsplit('-', 1)
                    lectureByClassroom.classroomList.add((building, classroomNo))
                    exist = True
                except ValueError:
                    print(f"강의 '{lecture.name}'의 gradClassrooms 형식이 잘못되었습니다: {gradClassroom}")
                    raise Exception("0x008")
            if exist:
                lecturesByClassrooms.append(lectureByClassroom)
        else:  # 대학교 강의인 경우
            for classroom in classrooms:
                if classroom.forGrad == 0 or classroom.forGrad == 2:  # 강의실이 기본 또는 대학원도 가능
                    if lecture.capacity <= classroom.capacity:
                        if lecture.group == classroom.group:
                            lectureByClassroom.classroomList.add((classroom.building, classroom.classroomNo))
                            exist = True
            if exist:
                lecturesByClassrooms.append(lectureByClassroom)
            else:
                print(f"강의 '{lecture.name}'를 배치할 수 있는 강의실이 없습니다.")
                raise Exception("0x004")

    return lecturesByClassrooms

# 위의 두 제약조건을 만족하는 강의별 배치 가능한 날짜와 강의실
def get_preprocessedLecture(lectures, lecturesByTimes, lecturesByClassrooms):
    print("강의들을 전처리 중입니다...")

    # 해시테이블(딕셔너리) 생성
    lecturesByClassrooms_dict = {
        (lecture.lectureCode, lecture.division, lecture.TP): lecture
        for lecture in lecturesByClassrooms
    }

    # 테이블 탐색
    for byTime in lecturesByTimes:
        key = (byTime.lectureCode, byTime.division, byTime.TP)

        # 해당 키가 있는지 확인
        if key in lecturesByClassrooms_dict:
            byClassroom = lecturesByClassrooms_dict[key]

            combined_available = set()
            for day in range(5):
                for period in range(13):
                    if byTime.available[day][period]:
                        for classroom in byClassroom.classroomList:
                            building, classroomNo = classroom
                            combined_available.add((day, period, building, classroomNo))

            # lectures에서 해당 강의를 찾아 combined_available을 추가
            for lecture in lectures:
                if (lecture.lectureCode, lecture.division, lecture.TP) == key:
                    lecture.available = combined_available
                    break
        else:
            print(f"키 {key}에 해당하는 강의실 정보가 없습니다.")
            raise Exception("0x005")

def preprocess_data(lectures, professors, classrooms):
    # 전처리 수행
    lecturesByTimes = get_lecturesByTime(lectures, professors)
    lecturesByClassrooms = get_lecturesByClassroom(lectures, classrooms)
    get_preprocessedLecture(lectures, lecturesByTimes, lecturesByClassrooms)

    # 데이터 확인 (필요한 경우)
    for lecture in lectures:
        if lecture.available is None or not lecture.available:
            print(f"강의 '{lecture.name}'에 배치 가능한 시공간이 없습니다.")
            raise Exception("0x006")

    # 데이터 확인 함수 호출
    display_data(lectures, professors)

    for lecture in lectures:
        print(lecture.name, lecture.available)
    return lectures

##### 데이터 확인 함수 #####
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
