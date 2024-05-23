# 시각화 수정 / 색 추가 / 교수별에 강의실 추가
# 시간표 여러개 출력
# 점수 추가

import random
import copy
import matplotlib.pyplot as plt
import numpy as np

# classD.py가 이미 임포트되었다고 가정하고 필요한 클래스와 데이터를 제공
from classD import Lecture, Professor, Classroom, Group, Time, Chosen, Assign, lectures, professors, classrooms, \
    chosen_instances

class Schedule:
    def __init__(self, lectures, professors, classrooms, groups):
        random.shuffle(lectures)  # Shuffles the lectures list randomly
        self.lectures = lectures
        self.professors = {prof.prof_code: prof for prof in professors}
        self.classrooms = classrooms
        self.groups = groups
        self.schedule = []
        self.lecture_day_schedule = {}
        self.major_required_schedules = {}
        self.year_schedules = {}

    def shuffle_classrooms(self):
        random.shuffle(self.classrooms)  # 강의실 순서를 무작위로 섞음

# 1. **교수의 Off-time 확인**: 교수가 지정한 off-time에는 강의를 배정하지 않습니다.
# 2. **강의실 용량 및 그룹 번호 검사**: 강의실의 용량이 강의가 필요로 하는 학생 수를 수용할 수 있어야 하며, 지정된 그룹 번호도 강의의 요구사항과 일치해야 합니다.
# 3. **시간 및 공간 충돌 검사**: 동일 교시에 동일 교수 또는 강의실이 중복되어 사용되지 않도록 합니다.
# 4. **같은 요일에 강의가 중복 스케줄링되는 경우 검사**: 동일 강의가 같은 요일에 여러 번 배정되지 않도록 합니다.
# 5. **전공 필수 강의의 중복 스케줄링 방지**: 전공 필수 강의가 동일 시간대에 다른 섹션과 중복되지 않도록 합니다.
# 6. **학년별 과목 시간대 중복 방지**: 같은 학년 내에서 다른 과목들이 겹치지 않도록 스케줄을 조정합니다.
    def check_constraints(self, lecture, day, start_period, professor, classroom):
        # Check for professor's off time
        off_times = [(d, p) for d, p in self.professors[professor].off_times]
        if (day, start_period) in off_times:
            print(f"Constraint failed: Professor {professor}'s off-time")
            return False
        if classroom.capacity < lecture.capacity or classroom.group_no != lecture.group:
            print(f"제약 위반: 강의실 {classroom.classroom_no}의 용량 또는 그룹 번호가 부적합합니다.")
            return False
        for item in self.schedule:
            if item['day'] == day and max(start_period, item['start_period']) < min(start_period + lecture.duration, item['start_period'] + item['duration']):
                if item['professor'] == professor or item['classroom'] == classroom.classroom_no:
                    print(f"제약 위반: 시간 또는 공간 충돌 (교수: {professor}, 강의실: {classroom.classroom_no})")
                    return False
        # 추가적인 제약 조건 체크
        if (lecture.lecture_code, lecture.division) in self.lecture_day_schedule and day in self.lecture_day_schedule[(lecture.lecture_code, lecture.division)]:
            print(f"제약 위반: 강의 {lecture.lecture_code}-{lecture.division}은 {day}에 이미 스케줄되어 있습니다.")
            return False
        if lecture.major_required and any(day == sched_day and start_period == sched_period for sched_day, sched_period in self.major_required_schedules.get(lecture.lecture_code, [])):
            print(f"제약 위반: 전공 필수 강의 {lecture.lecture_code}가 동일 시간에 이미 스케줄되어 있습니다.")
            return False
        # 같은 학년의 다른 과목이 같은 시간대에 배치되지 않도록 하는 로직
        if lecture.year in self.year_schedules:
            for (other_lecture_code, other_day, other_start_period, other_duration) in self.year_schedules[
                lecture.year]:
                end_period = start_period + lecture.duration
                other_end_period = other_start_period + other_duration

                # 현재 스케줄링하려는 강의와 기존에 스케줄된 강의의 시간이 겹치는지 검사
                if lecture.lecture_code != other_lecture_code and day == other_day and not (
                        end_period <= other_start_period or start_period >= other_end_period):
                    print(
                        f"제약 위반: 같은 학년({lecture.year})의 다른 과목({other_lecture_code})과 시간이 겹칩니다. ({day}일 {start_period}~{end_period}교시)")
                    return False

        return True

    def add_lecture_to_schedule(self, lecture, day, start_period, professor, classroom):
        self.schedule.append({
            'lecture': lecture.lecture_code, 'division': lecture.division, 'day': day,
            'start_period': start_period, 'duration': lecture.duration, 'professor': professor,
            'classroom': classroom.classroom_no, 'year': lecture.year  # 연도 정보 추가
        })
        print(f"강의 추가: {lecture.lecture_code}-{lecture.division} (교수: {professor}, 강의실: {classroom.classroom_no}, {day}일 {start_period}교시)")

        if lecture.major_required:
            if lecture.lecture_code not in self.major_required_schedules:
                self.major_required_schedules[lecture.lecture_code] = []
            self.major_required_schedules[lecture.lecture_code].append((day, start_period))
        if lecture.year not in self.year_schedules:
            self.year_schedules[lecture.year] = []
        self.year_schedules[lecture.year].append((lecture.lecture_code, day, start_period, lecture.duration))
        if (lecture.lecture_code, lecture.division) not in self.lecture_day_schedule:
            self.lecture_day_schedule[(lecture.lecture_code, lecture.division)] = []
        self.lecture_day_schedule[(lecture.lecture_code, lecture.division)].append(day)

    def remove_lecture_from_schedule(self, lecture, day, start_period):
        self.schedule = [item for item in self.schedule if not (
                item['lecture'] == lecture.lecture_code and item['division'] == lecture.division and item[
            'day'] == day and item['start_period'] == start_period)]
        if lecture.major_required:
            self.major_required_schedules[lecture.lecture_code].remove((day, start_period))
            if not self.major_required_schedules[lecture.lecture_code]:
                del self.major_required_schedules[lecture.lecture_code]

        for sched in list(self.year_schedules[lecture.year]):
            if sched[0] == lecture.lecture_code and sched[1] == day and sched[2] == start_period:
                self.year_schedules[lecture.year].remove(sched)
                break

        if not self.year_schedules[lecture.year]:
            del self.year_schedules[lecture.year]

        self.lecture_day_schedule[(lecture.lecture_code, lecture.division)].remove(day)
        if not self.lecture_day_schedule[(lecture.lecture_code, lecture.division)]:
            del self.lecture_day_schedule[(lecture.lecture_code, lecture.division)]

        print(f"강의 제거 및 백트래킹: {lecture.lecture_code}-{lecture.division} ({day}일 {start_period}교시)")

    def attempt_to_schedule_lecture(self, index=0):
        if index >= len(self.lectures):
            return True

        lecture = self.lectures[index]
        self.shuffle_classrooms()  # 강의실 순서 무작위화
        for professor in lecture.chosen_professors:
            for classroom in self.classrooms:
                for day in range(1, 6):
                    for start_period in range(1, 10 - lecture.duration + 1):
                        if self.check_constraints(lecture, day, start_period, professor, classroom):
                            self.add_lecture_to_schedule(lecture, day, start_period, professor, classroom)
                            if self.attempt_to_schedule_lecture(index + 1):
                                return True
                            self.remove_lecture_from_schedule(lecture, day, start_period)
        return False

    def generate_schedule(self):
        if self.attempt_to_schedule_lecture():
            print("성공적으로 스케줄 생성.")
            for item in self.schedule:
                print(f"{item['lecture']}-{item['division']} is scheduled on day {item['day']} at period {item['start_period']} with Professor {item['professor']} in classroom {item['classroom']}.")
        else:
            print("스케줄 생성 실패.")



# Schedule 인스턴스 생성
schedule = Schedule(lectures, professors, classrooms, Group)

# 시간표 생성
schedule.generate_schedule()

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap

# matplotlib 한글 폰트 설정
plt.rc('font', family='Malgun Gothic')


def visualize_schedule_beautiful(schedule, professors, classrooms, lectures, group_by='classroom', save_path=None):
    professor_map = {prof.prof_code: prof.name for prof in professors}
    lecture_map = {lec.lecture_code: lec.name for lec in lectures}

    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    max_periods = 10
    cmap = ListedColormap(['#ffffff', '#ffcccc'])

    # 모든 경우에 대해 접근 가능하도록 변수를 함수의 시작 부분에서 정의
    classroom_info = ''  # 기본값 설정
    day_classroom_combinations = [f"{day} {classroom.classroom_no}" for day in days for classroom in
                                  classrooms]  # 모든 경우에서 사용 가능하게 조정

    if group_by == 'year':
        schedule_matrix = {year: [["" for _ in range(len(days) * len(classrooms))] for _ in range(max_periods)] for year
                           in range(1, 5)}
        day_classroom_combinations = [f"{day} {classroom.classroom_no}" for day in days for classroom in classrooms]
    else:
        unique_keys = {classroom.classroom_no for classroom in classrooms} if group_by == 'classroom' else {prof.name
                                                                                                            for prof in
                                                                                                            professors}
        schedule_matrix = {key: [["" for _ in range(len(days))] for _ in range(max_periods)] for key in unique_keys}

    # 스케줄 데이터 채우기
    for item in schedule:
        lecture_name = lecture_map[item['lecture']]
        professor_name = professor_map[item['professor']]
        key, day_index, classroom_info = determine_key_day_index(item, group_by, professor_name)

        fill_schedule_matrix(item, schedule_matrix, key, day_index, classroom_info, lecture_name, professor_name, group_by, day_classroom_combinations, days)

    # 시각화
    nrows = len(schedule_matrix)
    fig, axs = plt.subplots(nrows=nrows, ncols=1, figsize=(10, nrows * 3), squeeze=False)
    plot_schedule_matrix(axs, schedule_matrix, group_by, day_classroom_combinations, cmap, days, max_periods)

    plt.tight_layout()
    if save_path:
        plt.savefig(save_path)
    plt.show()


# Helper functions used in the visualization
def determine_key_day_index(item, group_by, professor_name):
    day_index = item['day'] - 1
    classroom_info = ""  # classroom_info에 초기값 할당
    if group_by == 'classroom':
        key = item['classroom']
    elif group_by == 'professor':
        key = professor_name
    else:  # 'year'
        key = item['year']
        classroom_info = item['classroom']  # 'year' 그룹에서만 classroom_info 업데이트
    return key, day_index, classroom_info

def fill_schedule_matrix(item, schedule_matrix, key, day_index, classroom_info, lecture_name, professor_name, group_by,
                         day_classroom_combinations,days):
    if group_by == 'year':
        day_classroom_index = day_classroom_combinations.index(f"{days[day_index]} {classroom_info}")
    for period in range(item['start_period'], item['start_period'] + item['duration']):
        text = f"{lecture_name}\n{professor_name}" if group_by != 'professor' else lecture_name
        if group_by == 'year':
            schedule_matrix[key][period - 1][day_classroom_index] = text
        else:
            schedule_matrix[key][period - 1][day_index] = text


def plot_schedule_matrix(axs, schedule_matrix, group_by, day_classroom_combinations, cmap, days, max_periods):
    for idx, (key, matrix) in enumerate(schedule_matrix.items()):
        ax = axs[idx, 0]
        ax.imshow(np.where(np.array(matrix) != "", 1, 0), cmap=cmap, aspect="auto")
        ax.set_xticks(range(len(matrix[0])))
        ax.set_xticklabels(days if group_by != 'year' else day_classroom_combinations, rotation=45, ha="right",
                           fontsize=9)
        ax.set_yticks(range(max_periods))
        ax.set_yticklabels(range(1, max_periods + 1), fontsize=9)
        ax.set_ylabel("Periods", fontsize=10)
        ax.set_title(f"{group_by.capitalize()}: {key}", fontsize=12, fontweight='bold')

        for i, row in enumerate(matrix):
            for j, val in enumerate(row):
                if val:
                    ax.text(j, i, val, ha='center', va='center', fontsize=8, fontweight='regular')


visualize_schedule_beautiful(schedule.schedule, professors, classrooms, lectures, group_by='classroom', save_path='modified_classroom_schedule.png')
visualize_schedule_beautiful(schedule.schedule, professors, classrooms, lectures, group_by='professor', save_path='modified_professor_schedule.png')
visualize_schedule_beautiful(schedule.schedule, professors, classrooms, lectures, group_by='year', save_path='modified_year_schedule.png')

