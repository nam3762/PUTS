import json
import common
from datetime import datetime
import time
error = common.error

##### 데이터 정의 #####
days = list(range(1, 6))    # 월-금
hours = list(range(1, 14))  # 오전 9시 ~ 오후 9시(10시 종료) 1에서 13교시 / for문상 0~12

# Option
class Option:
    def __init__(self, result_number = 10, isWeek = False, isLunch = False):
        self.result_number = result_number
        self.isWeek = isWeek
        self.isLunch = isLunch

# Class: 강의실
class Classroom:
    def __init__(self, building, classroomNo, capacity, group, forGrad=0):
        self.building = building        # 건물명
        self.classroomNo = classroomNo  # 강의실 번호
        self.capacity = capacity        # 수용 인원
        self.group = group              # 강의실 구분(0:이론, 1:실습, 2:대형, 3:기타)
        self.forGrad = forGrad          # 기본:0, 대학원 가능: 1, 대학원만 가능: 2
    
    def __str__(self):
        return json.dumps(vars(self), indent=2, ensure_ascii=False)
        
# Class: 교수
class Professor:
    def __init__(self, profCode, name, isprof=False, free=None, hope=None, lectureCnt=0):
        self.profCode = profCode        # 교번
        self.name = name                # 교수(강사)명
        self.isprof = isprof            # 교수인가 강사인가(주 4일근무 필요한가)
        self.lectureCnt = lectureCnt    # 강의 개수
        
        # 쉬는 날짜
        if free is None:
            self.free = [[False for _ in hours] for _ in days]  # 기본값으로 모든 시간이 자유시간이 아님
        else:
            self.free = free
        
        # 희망 날짜
        if hope is None:
            self.hope = [[False for _ in hours] for _ in days]  # 기본값으로 모든 시간이 희망시간이 아님
        else:
            self.hope = hope
    
    def __str__(self):
        return json.dumps(vars(self), indent=2, ensure_ascii=False)

# Class: 강의
class Lecture:
    def __init__(self, lectureCode, division, TP, name, year, MR,
                group, duration, capacity, profCode, isTPGroup=False,
                isgrad=False, gradClassrooms=[], atNight=False,
                isFixedTime=False, FixedTime=None, isFixedSpace=False, FixedSpace=None,
                available=None, batched=None):
        self.lectureCode = lectureCode      # 강의 코드(00001234)
        self.division = division            # 강의 분반(1,2,3)
        self.TP = TP                        # 강의 분할(한 강의가 다른 시간으로 나누어짐)(1,2,3)
        self.name = name                    # 강의명
        self.year = year                    # 학년(0:학년 구분 없음)
        self.MR = MR                        # 전공필수 여부(True,False)
        self.group = group                  # 수용가능한 강의실 구분
        self.duration = duration            # 강의 시간
        self.capacity = capacity            # 수용 인원
        self.profCode = profCode            # !강의 담당자 코드
        # 시간 그룹 관련
        self.isTPGroup = isTPGroup          # 분반 시간 그룹이 있는지
        # 대학원 관련
        self.isgrad = isgrad                # 대학원 강의 구분
        self.gradClassrooms = gradClassrooms# 대학원 강의인 경우 배정될 강의실
        self.atNight = atNight              # 야간 강의 구분
        # 사용자 지정
        self.isFixedTime = isFixedTime      # 사용자가 날짜을 지정해놨는지 (주3일을 제외한 제약조건 무효)
        self.FixedTime = FixedTime          # 사용자가 지정한 시간 [n, m]:[요일, 교시]
        self.isFixedSpace = isFixedSpace    # 사용자가 공간을 지정해놨는지
        self.FixedSpace = FixedSpace        # 사용자가 지정한 강의실 ["n","m"]:[건물명, 강의실번호]
        # 알고리즘 관련
        self.available = available          # 해당 강의가 가능한 시공간 [[day, period, building, classroomNo]...]
        self.batched = batched              # 해당 강의가 현재 배치된 곳 [day, period, building, classroomNo]

    def __str__(self):
        # available이 set일 경우 list로 변환
        if isinstance(self.available, set):
            available_list = list(self.available)
        else:
            available_list = self.available
        
        # JSON 형식으로 보기 좋게 출력
        data = vars(self)
        data['available'] = available_list  # 변환된 available을 사용
        return json.dumps(data, ensure_ascii=False)


##### 데이터 초기화 #####
# lectures = []
# professors = []
# classrooms = []

classrooms = [
    # [건물번호, 강의실명, 수용인원, 그룹, //forGrad(0,1,2)]
    Classroom("S4-1", "101", 40, 0, 1),
    Classroom("S4-1", "102", 40, 0),
    Classroom("S4-1", "103", 40, 0),
    Classroom("S4-1", "104", 40, 0),
    Classroom("S4-1", "105", 40, 0),
    Classroom("S4-1", "106", 40, 0),
    Classroom("S4-1", "201", 40, 1),
    Classroom("S4-1", "204", 40, 1),
    Classroom("S4-1", "205", 40, 1),
    Classroom("S4-1", "206", 40, 1),
    Classroom("S4-1", "222", 40, 3, 2),
    Classroom("E8-7", "235", 40, 3),
    Classroom("E8-7", "239", 80, 3),
    Classroom("E8-7", "440", 80, 3),
    Classroom("E8-10", "104", 80, 3),
    Classroom("E9", "105", 80, 3),
    Classroom("E9", "241", 80, 3),
    Classroom("E9", "271", 80, 3),
    Classroom("E9", "308", 80, 3),
]
professors = [
    # [교수코드, 이름,
    # //isprof(TF), 쉬는날, 희망날]
    # 코드 테스트를 위해 특정 교수만 교수로 지정
    Professor("P00", "미지정"),
    Professor("P01", "최경주", True, # 금요일
              [[True if i == 4 else False for _ in hours] for i in range(5)]
              ),
    Professor("P02", "안광모"),
    Professor("P03", "이병훈"),
    Professor("P04", "노서영", True, # 목요일
              [[True if i == 3 else False for _ in hours] for i in range(5)]
              ),
    Professor("P05", "신재혁"),
    Professor("P06", "이의종", True, # 월요일
              [[True if i == 0 else False for _ in hours] for i in range(5)]
              ),
    Professor("P07", "신임"),
    Professor("P08", "김정훈"),
    Professor("P09", "홍신", True, # 수요일
              [[True if i == 2 else False for _ in hours] for i in range(5)]
              ),
    Professor("P010", "조희승", True, # 금요일
              [[True if i == 4 else False for _ in hours] for i in range(5)]
              ),
    Professor("P011", "이건명", True, # 목요일
              [[True if i == 3 else False for _ in hours] for i in range(5)]
              ),
    Professor("P012", "강재구"),
    Professor("P013", "우창우"),
    Professor("P014", "김덕기"),
    Professor("P015", "류관희", True, # 금요일
              [[True if i == 4 else False for _ in hours] for i in range(5)]
              ),
    Professor("P016", "이종연", True, # 금요일
              
              [[True if i == 4 else False for _ in hours] for i in range(5)]
              ),
    Professor("P017", "정지훈", True, # 월요일
              [[True if i == 0 else False for _ in hours] for i in range(5)]
              ),
    Professor("P018", "이재성", True, # 금요일
              [[True if i == 4 else False for _ in hours] for i in range(5)]
              ), 
    Professor("P019", "홍장의", False, # 수요일
              [[True if i == 2 else False for _ in hours] for i in range(5)]
              ),
    Professor("P020", "장순선"),
    Professor("P021", "조오현", True, # 월요일
              [[True if i == 0 else False for _ in hours] for i in range(5)]
              ),
    Professor("P022", "김용채")
]
lectures = [
    # [코드, 분반, TP, 강의명, 학년, MR(TF), group, 기간, 수용인원, 교수코드, //
    #  isTPGroup(TF), isgrad(TF), gradClassrooms, atNight(TF), isFixed(TF), FixedTIme]
    # 전학년
    Lecture("L01", 1, 1, "기초컴퓨터프로그래밍", 0, False, 3, 2, 40, "P07"),
    Lecture("L01", 1, 2, "기초컴퓨터프로그래밍", 0, False, 3, 2, 40, "P07"),
    Lecture("L02", 1, 1, "응용컴퓨터프로그래밍", 0, False, 3, 2, 40, "P021", True),
    Lecture("L02", 1, 2, "응용컴퓨터프로그래밍", 0, False, 3, 2, 40, "P021", True),
    Lecture("L02", 2, 1, "응용컴퓨터프로그래밍", 0, False, 3, 2, 40, "P017", True),
    Lecture("L02", 2, 2, "응용컴퓨터프로그래밍", 0, False, 3, 2, 40, "P017", True),
    Lecture("L03", 1, 1, "정보기술프로그래밍", 0, False, 3, 2, 40, "P00"),
    Lecture("L03", 1, 2, "정보기술프로그래밍", 0, False, 3, 2, 40, "P00"),
    # 1학년
    Lecture("L04", 1 , 1, "컴퓨터시스템개론", 1, True, 0, 1, 40, "P01", False, False, None, False, True, [2, 1]), # 수 2교시
    Lecture("L04", 1 , 2, "컴퓨터시스템개론", 1, True, 0, 2, 40, "P01", False, False, None, False, True, [3, 0]), # 목 1교시
    Lecture("L04", 2 , 1, "컴퓨터시스템개론", 1, True, 0, 3, 40, "P02", True),
    Lecture("L04", 3 , 1, "컴퓨터시스템개론", 1, True, 0, 3, 40, "P03", True),
    Lecture("L04", 4 , 1, "컴퓨터시스템개론", 1, True, 0, 3, 40, "P02"),
    Lecture("L05", 1 , 1, "오픈소스소프트웨어 이해와 실습", 1, True, 1, 4, 40, "P04", True),
    Lecture("L05", 2 , 1, "오픈소스소프트웨어 이해와 실습", 1, True, 1, 4, 40, "P05", True),
    Lecture("L05", 3 , 1, "오픈소스소프트웨어 이해와 실습", 1, True, 1, 4, 40, "P03"),
    Lecture("L06", 1 , 1, "미래설계준비", 1, False, 3, 2, 40, "P01", False, False, None, False, True, [1, 1]), # 화 2교시
    # 2학년
    Lecture("L07", 1 , 1, "알고리즘", 2, True, 0, 2, 40, "P06", True),
    Lecture("L07", 1 , 2, "알고리즘", 2, True, 0, 1, 40, "P06", True),
    Lecture("L07", 2 , 1, "알고리즘", 2, True, 0, 2, 40, "P07", True),
    Lecture("L07", 2 , 2, "알고리즘", 2, True, 0, 1, 40, "P07", True),
    Lecture("L07", 3 , 1, "알고리즘", 2, True, 0, 2, 40, "P08", True),
    Lecture("L07", 3 , 2, "알고리즘", 2, True, 0, 1, 40, "P08", True),
    Lecture("L08", 1 , 1, "프로그래밍언어론", 2, False, 0, 2, 40, "P09"),
    Lecture("L08", 1 , 2, "프로그래밍언어론", 2, False, 0, 1, 40, "P09"),
    Lecture("L08", 2 , 1, "프로그래밍언어론", 2, False, 0, 2, 40, "P09"),
    Lecture("L08", 2 , 2, "프로그래밍언어론", 2, False, 0, 1, 40, "P09"),
    Lecture("L09", 1 , 1, "시스템소프트웨어", 2, False, 0, 2, 40, "P010"),
    Lecture("L09", 1 , 2, "시스템소프트웨어", 2, False, 0, 1, 40, "P010"),
    Lecture("L09", 2 , 1, "시스템소프트웨어", 2, False, 0, 2, 40, "P010"),
    Lecture("L09", 2 , 2, "시스템소프트웨어", 2, False, 0, 1, 40, "P010"),
    Lecture("L10", 1 , 1, "창업탐색", 2, False, 0, 1, 40, "P011"),
    Lecture("L11", 1 , 1, "오픈소스개발프로젝트", 2, False, 1, 4, 40, "P012", True),
    Lecture("L11", 2 , 1, "오픈소스개발프로젝트", 2, False, 1, 4, 40, "P013", True),
    Lecture("L12", 1 , 1, "확률및통계", 2, False, 0, 3, 40, "P014"),
    Lecture("L12", 2 , 1, "확률및통계", 2, False, 0, 3, 40, "P014"),
    Lecture("L13", 1 , 1, "컴퓨터그래픽스", 2, False, 0, 2, 40, "P015"),
    Lecture("L13", 1 , 2, "컴퓨터그래픽스", 2, False, 1, 2, 40, "P015"),
    # 3학년
    Lecture("L14", 1 , 1, "산학프로젝트(종합설계)", 3, True, 1, 4, 40, "P09", True),
    Lecture("L14", 2 , 1, "산학프로젝트(종합설계)", 3, True, 1, 4, 40, "P012", True),
    Lecture("L15", 1 , 1, "창업설계", 3, False, 3, 2, 40, "P017"),
    Lecture("L16", 1 , 1, "데이터베이스시스템", 3, False, 0, 2, 40, "P016"),
    Lecture("L16", 1 , 2, "데이터베이스시스템", 3, False, 1, 2, 40, "P016"),
    Lecture("L16", 2 , 1, "데이터베이스시스템", 3, False, 0, 2, 40, "P04"),
    Lecture("L16", 2 , 2, "데이터베이스시스템", 3, False, 1, 2, 40, "P04"),
    Lecture("L17", 1 , 1, "인공지능", 3, True, 0, 2, 40, "P011", True),
    Lecture("L17", 1 , 2, "인공지능", 3, True, 0, 1, 40, "P011"),
    Lecture("L17", 2 , 1, "인공지능", 3, True, 0, 2, 40, "P017", True),
    Lecture("L17", 2 , 2, "인공지능", 3, True, 0, 1, 40, "P017"),
    Lecture("L18", 1 , 1, "소프트웨어공학", 3, False, 0, 2, 40, "P016"), # 특이 케이스. 전필도 아님.
    Lecture("L18", 1 , 2, "소프트웨어공학", 3, False, 0, 1, 40, "P016"), # 얘만 시간 다름
    Lecture("L19", 1 , 1, "소프트웨어공학", 3, True, 0, 2, 40, "P019", True),
    Lecture("L19", 1 , 2, "소프트웨어공학", 3, True, 0, 1, 40, "P019", True),
    Lecture("L19", 2 , 1, "소프트웨어공학", 3, True, 0, 2, 40, "P06", True),
    Lecture("L19", 2 , 2, "소프트웨어공학", 3, True, 0, 1, 40, "P06", True),
    Lecture("L20", 1 , 1, "정보검색", 3, False, 0, 2, 40, "P018"),
    Lecture("L20", 1 , 2, "정보검색", 3, False, 0, 1, 40, "P018"),
    Lecture("L21", 1 , 1, "VR.AR.GAME 이론및실제", 3, False, 0, 2, 40, "P015"),
    Lecture("L21", 1 , 2, "VR.AR.GAME 이론및실제", 3, False, 1, 2, 40, "P015"),
    Lecture("L22", 1 , 1, "정보보호", 3, False, 0, 1, 40, "P021"),
    Lecture("L22", 1 , 2, "정보보호", 3, False, 0, 2, 40, "P021"),
    Lecture("L23", 1 , 1, "서버프로그래밍", 3, False, 1, 2, 40, "P010", True),
    Lecture("L23", 1 , 2, "서버프로그래밍", 3, False, 1, 2, 40, "P010", True),
    Lecture("L23", 2 , 1, "서버프로그래밍", 3, False, 1, 2, 40, "P07", True),
    Lecture("L23", 2 , 2, "서버프로그래밍", 3, False, 1, 2, 40, "P07", True),
    # 4학년
    Lecture("L24", 1 , 1, "창업산학초청세미나II", 4, False, 3, 2, 40, "P015"),
    Lecture("L25", 1 , 1, "클라우드컴퓨팅", 4, False, 0, 3, 40, "P04"),
    Lecture("L26", 1 , 1, "자연언어처리", 4, False, 0, 2, 40, "P018"),
    Lecture("L26", 1 , 2, "자연언어처리", 4, False, 0, 1, 40, "P018"),
    Lecture("L27", 1 , 1, "창업파일럿프로젝트(종합설계)", 4, False, 0, 4, 40, "P01", True, False, None, False, True, [0, 0]), # 월 1교시),
    Lecture("L27", 2 , 1, "창업파일럿프로젝트(종합설계)", 4, False, 0, 4, 40, "P016", True),
    Lecture("L28", 1 , 1, "빅데이터분석시각화", 4, False, 0, 3, 40, "P08"),
    Lecture("L29", 1 , 1, "정보.컴퓨터교육론", 4, False, 0, 3, 40, "P020"),
    # 대학원
    Lecture("L30", 1 , 1, "시각인식특강", 5, False, 0, 3, 40, "P015", False, True, ["S4-1_101", "S4-1_106"]),
    Lecture("L31", 1 , 1, "소프트웨어테스팅실전", 5, False, 0, 4, 40, "P09", False, True, ["S4-1_101"]),
    Lecture("L32", 1 , 1, "지식표현 및 의사결정추론", 5, False, 0, 3, 40, "P016", False, True, ["S4-1_101"]),
    Lecture("L33", 1 , 1, "컴퓨터과학특강", 5, False, 0, 3, 40, "P021", False, True, ["S4-1_101"]),
    Lecture("L34", 1 , 1, "동물의료인공지능", 5, False, 0, 3, 40, "P017", False, True, ["S4-1_101"]),
    Lecture("L35", 1 , 1, "연구윤리 및 연구과제I", 5, False, 0, 3, 40, "P018", False, True, ["S4-1_101"]),
    Lecture("L35", 2 , 1, "연구윤리 및 연구과제I", 5, False, 0, 3, 40, "P04", False, True, ["S4-1_101"]),
    Lecture("L35", 3 , 1, "연구윤리 및 연구과제I", 5, False, 0, 3, 40, "P011", False, True, ["S4-1_101"]),
    Lecture("L35", 4 , 1, "연구윤리 및 연구과제I", 5, False, 0, 3, 40, "P015", False, True, ["S4-1_101"]),
    Lecture("L36", 1 , 1, "연구윤리 및 연구과제II", 5, False, 0, 3, 40, "P015", False, True, ["S4-1_101"]),
    # [코드, 분반, TP, 강의명, 학년, MR(TF), group, 기간, 수용인원, 교수코드, //
    #  isTPGroup(TF), isgrad(TF), gradClassrooms, atNight(TF), isFixed(TF), FixedTIme]
]
option = Option(10, False, False)

##### 데이터 불러오기 #####


##### 데이터 맵핑 및 객체 생성 #####


##### 데이터 확인 #####
print("※ 본 프로그램은 시간표가 생성 가능한가에 대한 보장 여부를 갖지 않습니다.")
print(f"실행시간:{datetime.now().strftime("%H시 %M분 %S초")}")

print("교수별 총 강의 수를 확인중입니다...")
for professor in professors:
    if professor.isprof:
        for lecture in lectures:
            if lecture.profCode == professor.profCode:
                professor.lectureCnt += 1
for professor in professors:
    if professor.isprof:
        print(f"{professor.name}: {professor.lectureCnt}", end=" / ")
        if professor.lectureCnt < 4:
            print(f"{professor.name}의 과목이 4개 미만입니다. 주 4일조건이 해제되어야 합니다.", end=" / ")
print()

print("미리 고정된 강의 개수를 확인합니다...", end = " ")
fixedLectureCnt = 0
for lecture in lectures:
    if lecture.isFixedTime:
        fixedLectureCnt += 1