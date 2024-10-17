import dataLoading
import json
import common
import time

days = dataLoading.days
hours = dataLoading.hours
originalClassrooms = dataLoading.classrooms
originalProfessors = dataLoading.professors
originalLectures = dataLoading.lectures
error = common.error

# 특정 강의별 담당 교수의 쉬는날과 주야간 여부에 의거하여 배치 가능한 날짜와 시간
class LectureByTime:
    def __init__(self, lectureCode, division, TP, available=None):
        self.lectureCode = lectureCode
        self.division = division
        self.TP = TP
        if available is None:
            self.available = [[True for _ in hours] for _ in days]  # 기본값으로 모든 시간이 자유시간이 아님
        else:
            self.available = available 
            
    def __str__(self):
        return json.dumps(vars(self), indent=2, ensure_ascii=False)

def get_lecturesByTime(originalLectures, originalProfessors):
    print("각 강의마다 배치가 가능한 시간을 확인하고 있습니다...")
    for lecture in originalLectures:
        lectureByTime = LectureByTime(lecture.lectureCode, lecture.division, lecture.TP)

        # 시간이 고정된 강의인 경우
        if lecture.isFixedTime:
            for day in range(5):
                for period in range(13):
                    lectureByTime.available[day][period] = False # 나머지 날짜 모두 불가능
            lectureByTime.available[lecture.FixedTime[0]][lecture.FixedTime[1]] = True # 해당 날짜만 가능
            lecturesByTimes.append(lectureByTime)
            continue

        # 교수 탐색
        exist = False
        for professor in originalProfessors:
            if professor.profCode == lecture.profCode:
                exist = True
                # 해당 강의의 교수 쉬는날에 의거하여 제거
                for day in range(5):
                    for period in range(13):
                        if professor.free[day][period]:
                            lectureByTime.available[day][period] = False
                break
        if not exist: 
            print(lecture)
            return "0x001"
        
        # 그 외 시간 중 duration에 의거하여 배치 불가능한 시간대 제거
        # 주(8)야간(9~12)까지
        if not lecture.atNight: # 주간인 경우
            # 0부터 8까지 비교 9이상 False
            limit = 9
            for day in range(0, 5):
                for period in range(0, 9):
                    temp = lecture.duration + period
                    if temp > limit:
                        lectureByTime.available[day][period] = False
                for period in range(9, 13):
                    lectureByTime.available[day][period] = False
        else: # 야간인 경우
            # 9부터 12까지 비교 8이하 False
            limit = 13
            for day in range(0, 5):
                for period in range(0, 9):
                    lectureByTime.available[day][period] = False
                for period in range(9, 13):
                    temp = lecture.duration + period
                    if temp > limit:
                        lectureByTime.available[day][period] = False
                
        # 해당 강의가 가능한 시간대가 있으면 append, 아니면 return 0
        possible = False
        for day in range(0, 5):
            for period in range(0, 9):
                if lectureByTime.available[day][period]:
                    possible = True
                    break
        if possible:
            lecturesByTimes.append(lectureByTime)
        else:
            print(lectureByTime)
            return "0x002"


        
# 강의실의 수용 인원과 대학원 강의 여부에 의거하여 강의실별 배치할 수 있는 강의
class LectureByClassroom:
    def __init__(self, lectureCode, division, TP):
        self.lectureCode = lectureCode
        self.division = division
        self.TP = TP
        self.classroomList = set() # {[building, classroomNo]}

def get_lecturesByClassroom(originalLectures, originalClassrooms):
    print("각 강의마다 배치가 가능한 강의실을 확인하고 있습니다...")
    
    # 수용 인원 확인 함수
    def check_capacity(lecture, classroom):
        if lecture.capacity <= classroom.capacity:
            return True
        
    # 그룹 확인 함수
    def check_group(lecture, classroom):
        if lecture.group == classroom.group:
            return True
        
    # 대학교 강의실 추가 함수
    def add_lecturesByClassroom(lectureByClassroom,classroom):
        temp = (classroom.building, classroom.classroomNo)
        lectureByClassroom.classroomList.add(temp)
        lecturesByClassrooms.append(lectureByClassroom)
    
    # 대학원 강의실 추가 함수
    def add_lecturesByGradClassroom(lectureByClassroom, gradClassrooms):
        for gradClassroom in gradClassrooms:
            splited = gradClassroom.rsplit('_')
            temp = (splited[0], splited[1])
            lectureByClassroom.classroomList.add(temp)
            lecturesByClassrooms.append(lectureByClassroom)
    
    for lecture in originalLectures:
        lectureByClassroom = LectureByClassroom(lecture.lectureCode, lecture.division, lecture.TP)
        
        exist = False
        if lecture.isgrad: # 대학원 강의인 경우: 강의실이 정해짐
            add_lecturesByGradClassroom(lectureByClassroom, lecture.gradClassrooms)
            exist = True
        else: # 대학교 강의인 경우: 가능한 강의실 리스트를 뽑음
            for classroom in originalClassrooms:
                if classroom.forGrad == 0 or classroom.forGrad == 1: # 강의실이 기본 or 대학원도 가능
                    if check_capacity(lecture, classroom):
                        if check_group(lecture, classroom):
                            add_lecturesByClassroom(lectureByClassroom,classroom)
                            exist = True
        if not exist:
            print(lecture)
            print(classroom)
            return "0x004"



# 위의 두 제약조건을 만족하는 강의별 배치 가능한 날짜와 건물
def get_preprocessedLecture(originalLectures, lecturesByTimes, lecturesByClassrooms):
    print("강의들을 전처리중입니다...")
    
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
            
            # True 값의 위치를 탐색
            true_positions = [
                (i, j) for i, row in enumerate(byTime.available) for j, value in enumerate(row) if value
            ]
            
            combined_available = set()
            for (i, j) in true_positions:
                for classroom in byClassroom.classroomList:
                    building, classroomNo = classroom
                    combined_available.add((i, j, building, classroomNo))

            # originalLectures에서 해당 강의를 찾아 combined_available을 추가
            for originalLecture in originalLectures:
                if (originalLecture.lectureCode, originalLecture.division, originalLecture.TP) == key:
                    originalLecture.available = combined_available  # available 속성에 combined_available 할당
                    break  # 해당 강의를 찾았으므로 루프 종료
        else:
            print(key)
            return "0x005"



# 초기화
lecturesByTimes = []
lecturesByClassrooms = []

# 실행문
ret = get_lecturesByTime(originalLectures, originalProfessors)
error(ret)
ret = get_lecturesByClassroom(originalLectures, originalClassrooms)
error(ret)
ret = get_preprocessedLecture(originalLectures, lecturesByTimes, lecturesByClassrooms)
error(ret)

for lecture in originalLectures:
    if lecture.available is None:
        print(lecture.name, lecture.available)