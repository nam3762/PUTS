# classD.py

class Lecture:
    def __init__(self, name, lecture_code, division, section, major_required, group, duration, capacity, year):
        self.name = name
        self.lecture_code = lecture_code
        self.division = division
        self.section = section
        self.major_required = major_required
        self.group = group
        self.duration = duration
        self.capacity = capacity
        self.year = year
        self.chosen_professors = []  # To store Chosen relationships

    def add_chosen_professor(self, prof_code):
        if prof_code not in self.chosen_professors:
            self.chosen_professors.append(prof_code)


class Professor:
    def __init__(self, prof_code, name, off_days=[]):
        self.prof_code = prof_code
        self.name = name
        self.off_days = off_days


class Classroom:
    def __init__(self, building, classroom_no, capacity, group_no):
        self.building = building
        self.classroom_no = classroom_no
        self.capacity = capacity
        self.group_no = group_no


class Group:
    def __init__(self, group_no, name):
        self.group_no = group_no
        self.name = name


class Time:
    def __init__(self, day, period):
        self.day = day
        self.period = period


class Chosen:
    def __init__(self, lecture_code, division, prof_code):
        self.lecture_code = lecture_code
        self.division = division
        self.prof_code = prof_code


class Assign:
    def __init__(self, lecture_code, division, section, year, building, classroom_no, date, period, prof_code):
        self.lecture_code = lecture_code
        self.division = division
        self.section = section
        self.year = year
        self.building = building
        self.classroom_no = classroom_no
        self.date = date
        self.period = period
        self.prof_code = prof_code  # Added prof_code attribute


# Example instantiation
professors = [Professor('P001', '이건명', []), Professor('P002', '홍장의', [4]), Professor('P003', '최경주', [3]), Professor('P004', '류관희', [5])
              , Professor('P005', '이재성', [3]), Professor('P006', '이종연', [5]), Professor('P007', 'Aziz', []), Professor('P008', '조오현', [4])
              , Professor('P009', '노서영', [4]), Professor('P010', '조희승', [4]), Professor('P011', '이의종', [1]), Professor('P012', '정지훈', [1])
              , Professor('P013', '홍신', [4]), Professor('P014', '박정희', []), Professor('P015', '김세민', []), Professor('P016', '김정훈', [])
              , Professor('P017', '이병훈', []), Professor('P018', '안광모', []), Professor('P019', '김윤석', []), Professor('P020', '장순선', [])
              , Professor('P021', '정태은', []), Professor('P022', '김용채', []), Professor('P023', '강재구', []), Professor('P024', '신재혁', [])
              , Professor('P025', '문현주', []), Professor('P026', '주영관', []), Professor('P027', '황경순', [])]

classrooms = [Classroom('S4-1', '101', 50, 'G1'), Classroom('S4-1', '102', 70, 'G1'), Classroom('S4-1', '103', 70, 'G1')
              , Classroom('S4-1', '104', 70, 'G1'), Classroom('S4-1', '106', 100, 'G1'), Classroom('S4-1', '201', 54, 'G2')
              , Classroom('S4-1', '204', 54, 'G2'), Classroom('S4-1', '205', 48, 'G2'), Classroom('S4-1', '206', 46, 'G2')
              , Classroom('S4-1', '106', 60, 'G1')]

groups = [Group('G1', '1층 이론'), Group('G2', '2층 실습')]

lectures = [
    # group, duration, capacity, year
    Lecture('이산수학', 'SW001', 'A', 'S1', True, 'G1', 2, 40, 1),
    Lecture('이산수학', 'SW001', 'A', 'S2', True, 'G1', 1, 40, 1),
    Lecture('이산수학', 'SW001', 'B', 'S1', True, 'G1', 2, 40, 1),
    Lecture('이산수학', 'SW001', 'B', 'S2', True, 'G1', 1, 40, 1),
    Lecture('이산수학', 'SW001', 'C', 'S1', True, 'G1', 2, 40, 1),
    Lecture('이산수학', 'SW001', 'C', 'S2', True, 'G1', 1, 40, 1),
    Lecture('미래설계탐색', 'SW002', 'A', 'S1', False, 'G1', 2, 100, 1),
    Lecture('자료구조', 'SW003', 'A', 'S1', True, 'G1', 2, 40, 2),
    Lecture('자료구조', 'SW003', 'A', 'S2', True, 'G1', 1, 40, 2),
    Lecture('자료구조', 'SW003', 'B', 'S1', True, 'G1', 2, 40, 2),
    Lecture('자료구조', 'SW003', 'B', 'S2', True, 'G1', 1, 40, 2),
    Lecture('자료구조', 'SW003', 'C', 'S1', True, 'G1', 2, 40, 2),
    Lecture('자료구조', 'SW003', 'C', 'S2', True, 'G1', 1, 40, 2),
    Lecture('컴퓨터구조', 'SW004', 'A', 'S1', True, 'G1', 2, 40, 2),
    Lecture('컴퓨터구조', 'SW004', 'A', 'S2', True, 'G1', 1, 40, 2),
    Lecture('컴퓨터구조', 'SW004', 'B', 'S1', True, 'G1', 2, 40, 2),
    Lecture('컴퓨터구조', 'SW004', 'B', 'S2', True, 'G1', 1, 40, 2),
    Lecture('컴퓨터구조', 'SW004', 'C', 'S1', True, 'G1', 3, 40, 2),
    Lecture('소프트웨어 실전영어', 'SW005', 'A', 'S1', False, 'G1', 2, 50, 2),
    Lecture('소프트웨어 실전영어', 'SW005', 'A', 'S2', False, 'G1', 1, 50, 2),
    Lecture('객체지향 프로그래밍', 'SW006', 'A', 'S1', False, 'G1', 2, 40, 2),
    Lecture('객체지향 프로그래밍', 'SW006', 'A', 'S2', False, 'G2', 2, 40, 2),
    Lecture('객체지향 프로그래밍', 'SW006', 'B', 'S1', False, 'G1', 2, 40, 2),
    Lecture('객체지향 프로그래밍', 'SW006', 'B', 'S2', False, 'G2', 2, 40, 2),
    Lecture('객체지향 프로그래밍', 'SW006', 'C', 'S1', False, 'G1', 2, 40, 2),
    Lecture('객체지향 프로그래밍', 'SW006', 'C', 'S2', False, 'G2', 2, 40, 2),
    Lecture('선형대수학', 'SW007', 'A', 'S1', False, 'G1', 2, 40, 2),
    Lecture('선형대수학', 'SW007', 'A', 'S2', False, 'G1', 1, 40, 2),
    Lecture('선형대수학', 'SW007', 'B', 'S1', False, 'G1', 2, 40, 2),
    Lecture('선형대수학', 'SW007', 'B', 'S2', False, 'G1', 1, 40, 2),
    Lecture('미래설계구현', 'SW008', 'A', 'S2', False, 'G1', 2, 100, 2),
    Lecture('오픈소스 기초프로젝트', 'SW009', 'A', 'S1', False, 'G2', 4, 40, 2),
    Lecture('오픈소스 기초프로젝트', 'SW009', 'B', 'S1', False, 'G2', 4, 40, 2),
    Lecture('운영체제', 'SW010', 'A', 'S1', True, 'G1', 2, 40, 3),
    Lecture('운영체제', 'SW010', 'A', 'S2', True, 'G1', 1, 40, 3),
    Lecture('운영체제', 'SW010', 'B', 'S1', True, 'G1', 2, 40, 3),
    Lecture('운영체제', 'SW010', 'B', 'S2', True, 'G1', 1, 40, 3),
    Lecture('운영체제', 'SW010', 'C', 'S1', True, 'G1', 2, 40, 3),
    Lecture('운영체제', 'SW010', 'C', 'S2', True, 'G1', 1, 40, 3),
    Lecture('객체지향 설계', 'SW011', 'A', 'S1', True, 'G1', 2, 40, 3),
    Lecture('객체지향 설계', 'SW011', 'A', 'S2', True, 'G1', 1, 40, 3),
    Lecture('객체지향 설계', 'SW011', 'B', 'S1', True, 'G1', 2, 40, 3),
    Lecture('객체지향 설계', 'SW011', 'B', 'S2', True, 'G1', 1, 40, 3),
    Lecture('객체지향 설계', 'SW011', 'C', 'S1', True, 'G1', 2, 40, 3),
    Lecture('객체지향 설계', 'SW011', 'C', 'S2', True, 'G1', 1, 40, 3),
    Lecture('컴퓨터 네트워크', 'SW012', 'A', 'S1', False, 'G1', 2, 40, 3),
    Lecture('컴퓨터 네트워크', 'SW012', 'A', 'S2', False, 'G1', 1, 40, 3),
    Lecture('창업기획', 'SW013', 'A', 'S1', False, 'G1', 2, 100, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'A', 'S1', False, 'G1', 2, 40, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'A', 'S2', False, 'G2', 2, 40, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'B', 'S1', False, 'G1', 2, 40, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'B', 'S2', False, 'G2', 2, 40, 3),
    Lecture('오픈소스 전문프로젝트', 'SW015', 'A', 'S1', False, 'G2', 4, 40, 3),
    Lecture('오픈소스 전문프로젝트', 'SW015', 'B', 'S1', False, 'G2', 4, 40, 3),
    Lecture('인공지능수학', 'SW016', 'A', 'S1', False, 'G1', 3, 40, 3),
    Lecture('컴파일러', 'SW017', 'A', 'S1', False, 'G1', 2, 40, 3),
    Lecture('컴파일러', 'SW017', 'B', 'S2', False, 'G1', 1, 40, 3),
    Lecture('창업산학초청세미나 I', 'SW018', 'A', 'S1', False, 'G1', 2, 100, 4),
    Lecture('임베디드시스템', 'SW019', 'A', 'S1', False, 'G2', 4, 40, 4),
    Lecture('빅데이터시스템설계', 'SW020', 'A', 'S1', False, 'G1', 2, 40, 4),
    Lecture('빅데이터시스템설계', 'SW020', 'A', 'S2', False, 'G2', 2, 40, 4),
    Lecture('기계학습', 'SW021', 'A', 'S1', False, 'G1', 2, 40, 4),
    Lecture('기계학습', 'SW021', 'A', 'S2', False, 'G1', 1, 40, 4),
    Lecture('기계학습', 'SW021', 'B', 'S1', False, 'G1', 3, 40, 4),
    Lecture('캡스톤디자인', 'SW022', 'A', 'S1', True, 'G2', 4, 60, 4),
    Lecture('캡스톤디자인', 'SW022', 'B', 'S1', True, 'G2', 4, 58, 4),
    Lecture('정보·컴퓨터교재연구및지도법', 'SW023', 'A', 'S1', False, 'G1', 3, 40, 4)
]

# Create Chosen instances and associate them with lectures
chosen_instances = [
    Chosen('SW001', 'A', 'P014'),
    Chosen('SW001', 'B', 'P014'),
    Chosen('SW001', 'C', 'P014'),
    Chosen('SW002', 'A', 'P003'),
    Chosen('SW003', 'A', 'P009'),
    Chosen('SW003', 'B', 'P011'),
    Chosen('SW003', 'C', 'P013'),
    Chosen('SW004', 'A', 'P010'),
    Chosen('SW004', 'B', 'P013'),
    Chosen('SW004', 'C', 'P015'),
    Chosen('SW005', 'A', 'P013'),
    Chosen('SW006', 'A', 'P003'),
    Chosen('SW006', 'B', 'P018'),
    Chosen('SW006', 'C', 'P018'),
    Chosen('SW007', 'A', 'P009'),
    Chosen('SW007', 'B', 'P021'),
    Chosen('SW008', 'A', 'P001'),
    Chosen('SW009', 'A', 'P027'),
    Chosen('SW009', 'B', 'P019'),
    Chosen('SW010', 'A', 'P010'),
    Chosen('SW010', 'B', 'P010'),
    Chosen('SW010', 'C', 'P013'),
    Chosen('SW011', 'A', 'P002'),
    Chosen('SW011', 'B', 'P006'),
    Chosen('SW011', 'C', 'P011'),
    Chosen('SW012', 'A', 'P008'),
    Chosen('SW013', 'A', 'P012'),
    Chosen('SW014', 'A', 'P004'),
    Chosen('SW014', 'B', 'P016'),
    Chosen('SW015', 'A', 'P023'),
    Chosen('SW015', 'B', 'P019'),
    Chosen('SW016', 'A', 'P012'),
    Chosen('SW017', 'A', 'P005'),
    Chosen('SW018', 'A', 'P004'),
    Chosen('SW019', 'A', 'P017'),
    Chosen('SW020', 'A', 'P016'),
    Chosen('SW021', 'A', 'P001'),
    Chosen('SW021', 'B', 'P012'),
    Chosen('SW022', 'A', 'P003'),
    Chosen('SW022', 'B', 'P006'),
    Chosen('SW023', 'A', 'P020')
]

# Linking chosen instances to lectures
for chosen in chosen_instances:
    # Find the lectures that match the chosen instance
    for lecture in lectures:
        if (lecture.lecture_code == chosen.lecture_code and
                lecture.division == chosen.division):
            lecture.add_chosen_professor(chosen.prof_code)
