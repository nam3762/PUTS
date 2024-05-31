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
    def __init__(self, prof_code, name, is_instructor, off_times=[], preferred_times=[]):
        self.prof_code = prof_code
        self.name = name
        self.is_instructor = is_instructor  # 0 for Professor, 1 for Instructor
        self.off_times = off_times  # [(day, period), ...]
        self.preferred_times = preferred_times  # [(day, period), ...]

    def __str__(self):
        role = "Instructor" if self.is_instructor else "Professor"
        return f"{self.name} ({role})"


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
    def __init__(self, lecture_code, division, section, year, building, classroom_no, date, period, prof_code, major_required=False, duration=1):
        self.lecture_code = lecture_code
        self.division = division
        self.section = section
        self.year = year
        self.building = building
        self.classroom_no = classroom_no
        self.date = date
        self.period = period
        self.prof_code = prof_code
        self.major_required = major_required
        self.duration = duration  # New attribute to handle multi-hour lectures


# Example instantiation with preferred_times added
professors = [
    Professor('P001', '이건명', 0, [(4, i) for i in range(1, 10)] + [(5, i) for i in range(1, 10)], [(2, 2), (3, 2)]),
    Professor('P002', '홍장의', 0, [(3, 3), (5, 6)], [(1, 2), (2, 3)]),
    Professor('P003', '최경주', 0, [(1, i) for i in range(1, 10)] + [(1, i) for i in range(1, 10)], [(3, 4), (4, 4)]),
    Professor('P004', '류관희', 0, [(4, 4), (2, 1)], [(3, 1), (5, 2)]),
    Professor('P005', '이재성', 0, [(1, 5), (2, 2), (4, 9)], [(2, 4), (3, 3)]),
    Professor('P006', '이종연', 0, [(3, 5), (5, 1), (4, 7)], [(1, 3), (2, 4)]),
    Professor('P007', 'Aziz', 0, [(1, 2), (3, 6)], [(3, 3), (4, 5)]),
    Professor('P008', '조오현', 0, [(5, 3), (1, 8)], [(2, 5), (4, 3)]),
    Professor('P009', '노서영', 0, [(4, 2), (2, 6), (1, 9)], [(3, 2), (5, 1)]),
    Professor('P010', '조희승', 0, [(3, 1), (5, 4), (2, 8)], [(1, 4), (2, 6)]),
    Professor('P011', '이의종', 0, [(4, 5), (1, 3), (3, 9)], [(2, 2), (4, 4)]),
    Professor('P012', '정지훈', 0, [(2, 3), (4, 6), (5, 8)], [(3, 1), (4, 3)]),
    Professor('P013', '홍신', 0, [(1, 4), (3, 2), (5, 9)], [(2, 5), (3, 4)]),
    Professor('P014', '박정희', 1, [(4, 3), (2, 7), (1, 6)], [(3, 6), (5, 7)]),
    Professor('P015', '김세민', 1, [(3, 4), (5, 2), (1, 7)], [(2, 2), (4, 1)]),
    Professor('P016', '김정훈', 1, [(2, 5), (4, 1), (1, 8)], [(3, 3), (5, 4)]),
    Professor('P017', '이병훈', 1, [(5, 4), (3, 8), (2, 2)], [(1, 5), (4, 6)]),
    Professor('P018', '안광모', 1, [(1, 5), (4, 7), (3, 1)], [(2, 1), (3, 2)]),
    Professor('P019', '김윤석', 1, [(2, 4), (5, 6), (4, 9)], [(1, 6), (3, 4)]),
    Professor('P020', '장순선', 1, [(3, 5), (1, 2), (2, 7)], [(4, 3), (5, 5)]),
    Professor('P021', '정태은', 1, [(4, 6), (2, 1), (5, 8)], [(3, 2), (4, 4)]),
    Professor('P022', '김용채', 1, [(1, 3), (3, 7), (4, 2)], [(2, 6), (3, 8)]),
    Professor('P023', '강재구', 1, [(5, 5), (2, 8), (1, 9)], [(3, 4), (4, 5)]),
    Professor('P024', '신재혁', 1, [(3, 2), (4, 4), (2, 6)], [(1, 2), (2, 3)]),
    Professor('P025', '문현주', 1, [(1, 1), (5, 3), (3, 9)], [(2, 5), (4, 6)]),
    Professor('P026', '주영관', 1, [(2, 5), (4, 7), (1, 8)], [(3, 2), (5, 3)]),
    Professor('P027', '황경순', 1, [(3, 6), (5, 2), (4, 8)], [(1, 4), (2, 7)])
]


classrooms = [Classroom('S4-1', '101', 50, 'G1'), Classroom('S4-1', '102', 70, 'G1'), Classroom('S4-1', '103', 70, 'G1')
              , Classroom('S4-1', '104', 70, 'G1'), Classroom('S4-1', '106', 101, 'G1'), Classroom('S4-1', '201', 54, 'G2')
              , Classroom('S4-1', '204', 54, 'G2'), Classroom('S4-1', '205', 48, 'G2'), Classroom('S4-1', '206', 46, 'G2')
              , Classroom('S4-1', '505', 101, 'G3')]

groups = [Group('G1', '1층 이론'), Group('G2', '2층 실습'),Group('G3', '3층 실습')]

lectures = [
    Lecture('이산수학', 'SW001', 'A', 'S1', True, 'G1', 2, 40, 1),
    Lecture('이산수학', 'SW001', 'A', 'S2', True, 'G1', 1, 40, 1),
    Lecture('이산수학', 'SW001', 'B', 'S1', True, 'G1', 2, 40, 1),
    Lecture('이산수학', 'SW001', 'B', 'S2', True, 'G1', 1, 40, 1),
    Lecture('이산수학', 'SW001', 'C', 'S1', True, 'G1', 2, 40, 1),
    Lecture('이산수학', 'SW001', 'C', 'S2', True, 'G1', 1, 40, 1),
    Lecture('미래설계탐색', 'SW002', 'A', 'S1', False, 'G3', 2, 100, 1),
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
    Lecture('미래설계구현', 'SW008', 'A', 'S2', False, 'G3', 2, 100, 2),
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
    Lecture('창업기획', 'SW013', 'A', 'S1', False, 'G3', 2, 100, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'A', 'S1', False, 'G1', 2, 40, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'A', 'S2', False, 'G2', 2, 40, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'B', 'S1', False, 'G1', 2, 40, 3),
    Lecture('오픈소스 웹소프트웨어', 'SW014', 'B', 'S2', False, 'G2', 2, 40, 3),
    Lecture('오픈소스 전문프로젝트', 'SW015', 'A', 'S1', False, 'G2', 4, 40, 3),
    Lecture('오픈소스 전문프로젝트', 'SW015', 'B', 'S1', False, 'G2', 4, 40, 3),
    Lecture('인공지능수학', 'SW016', 'A', 'S1', False, 'G1', 3, 40, 3),
    Lecture('컴파일러', 'SW017', 'A', 'S1', False, 'G1', 2, 40, 3),
    Lecture('컴파일러', 'SW017', 'A', 'S2', False, 'G1', 1, 40, 3),
    Lecture('창업산학초청세미나 I', 'SW018', 'A', 'S1', False, 'G3', 2, 100, 4),
    Lecture('임베디드시스템', 'SW019', 'A', 'S1', False, 'G2', 4, 40, 4),
    Lecture('빅데이터시스템설계', 'SW020', 'A', 'S1', False, 'G1', 2, 40, 4),
    Lecture('빅데이터시스템설계', 'SW020', 'A', 'S2', False, 'G2', 2, 40, 4),
    Lecture('기계학습', 'SW021', 'A', 'S1', False, 'G1', 2, 40, 4),
    Lecture('기계학습', 'SW021', 'A', 'S2', False, 'G1', 1, 40, 4),
    Lecture('기계학습', 'SW021', 'B', 'S1', False, 'G1', 3, 40, 4),
    Lecture('캡스톤디자인', 'SW022', 'A', 'S1', True, 'G1', 4, 60, 4),
    Lecture('캡스톤디자인', 'SW022', 'B', 'S1', True, 'G2', 4, 54, 4),
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
