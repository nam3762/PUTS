import random
import os
from datetime import datetime
from classD import Lecture, Professor, Classroom, Group, Time, Chosen, Assign, lectures, professors, classrooms, \
    chosen_instances

class Schedule:
    def __init__(self, lectures, professors, classrooms, groups):
        self.professors = {prof.prof_code: prof for prof in professors}
        self.classrooms = classrooms
        self.groups = groups
        self.schedule = []
        self.lecture_day_schedule = {}
        self.major_required_schedules = {}
        self.year_schedules = {}
        self.fixed_assignments = [
            {'lecture_code': 'SW002', 'division': 'A', 'day': 1, 'period': 1, 'prof_code': 'P003', 'classroom_no': '505'},
            {'lecture_code': 'SW008', 'division': 'A', 'day': 2, 'period': 1, 'prof_code': 'P001', 'classroom_no': '505'},
            {'lecture_code': 'SW013', 'division': 'A', 'day': 3, 'period': 1, 'prof_code': 'P012', 'classroom_no': '505'},
            {'lecture_code': 'SW018', 'division': 'A', 'day': 4, 'period': 1, 'prof_code': 'P004', 'classroom_no': '505'}
        ]
        self.fixed_schedule = []
        self.add_fixed_assignments(lectures)
        self.lectures = [lec for lec in lectures if not any(
            f['lecture_code'] == lec.lecture_code and f['division'] == lec.division for f in self.fixed_schedule)]
        self.professor_scheduled_days = {prof.prof_code: set() for prof in professors}
        self.professor_available_times = self.map_professor_availability(professors)
        self.lecture_to_classrooms = {
            (lecture.lecture_code, lecture.division): [classroom for classroom in self.classrooms if
            classroom.capacity >= lecture.capacity and classroom.group_no == lecture.group]
            for lecture in lectures
        }
        self.output_directory = self.create_output_directory()
        self.all_schedules = []
        self.score_count = {}

    def map_professor_availability(self, professors):
        availability = {}
        for professor in professors:
            available_times = []
            for day in range(1, 6):
                for period in range(1, 10):
                    if (day, period) not in professor.off_times:
                        available_times.append((day, period))
            availability[professor.prof_code] = available_times
        return availability

    def add_fixed_assignments(self, lectures):
        for assignment in self.fixed_assignments:
            lecture = next((lec for lec in lectures if
                            lec.lecture_code == assignment['lecture_code'] and lec.division == assignment['division']),
                           None)
            if lecture:
                self.schedule.append({
                    'lecture': lecture.lecture_code, 'division': lecture.division, 'day': assignment['day'],
                    'start_period': assignment['period'], 'duration': lecture.duration,
                    'professor': assignment['prof_code'], 'classroom': assignment['classroom_no'], 'year': lecture.year,
                    'section': lecture.section
                })
                self.fixed_schedule.append(assignment)

    def shuffle_classrooms(self):
        random.shuffle(self.classrooms)

    def check_constraints(self, lecture, day, start_period, professor, classroom):
        for item in self.schedule:
            if item['day'] == day and max(start_period, item['start_period']) < min(start_period + lecture.duration,
                                                                                    item['start_period'] + item['duration']):
                if item['professor'] == professor or item['classroom'] == classroom.classroom_no:
                    return False
        if lecture.major_required and any(
                day == sched_day and start_period == sched_period for sched_day, sched_period in
                self.major_required_schedules.get(lecture.lecture_code, [])):
            return False
        if (lecture.lecture_code, lecture.division) in self.lecture_day_schedule and day in self.lecture_day_schedule[
            (lecture.lecture_code, lecture.division)]:
            return False
        if lecture.year in self.year_schedules:
            for (other_lecture_code, other_day, other_start_period, other_duration) in self.year_schedules[
                lecture.year]:
                end_period = start_period + lecture.duration
                other_end_period = other_start_period + other_duration
                if lecture.lecture_code != other_lecture_code and day == other_day and not (
                        end_period <= other_start_period or start_period >= other_end_period):
                    return False
        return True

    def add_lecture_to_schedule(self, lecture, day, start_period, professor, classroom):
        self.schedule.append({
            'lecture': lecture.lecture_code, 'division': lecture.division, 'day': day, 'start_period': start_period,
            'duration': lecture.duration, 'professor': professor, 'classroom': classroom.classroom_no,
            'year': lecture.year, 'section': lecture.section
        })

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

        if self.professors[professor].is_instructor == 0:
            if professor not in self.professor_scheduled_days:
                self.professor_scheduled_days[professor] = set()
            self.professor_scheduled_days[professor].add(day)

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

    def generate_random_schedule(self, max_schedules=10000):
        attempts = 0
        while attempts < max_schedules:
            self.schedule = []
            self.lecture_day_schedule = {}
            self.major_required_schedules = {}
            self.year_schedules = {}
            self.professor_scheduled_days = {prof.prof_code: set() for prof in self.professors.values()}
            random.shuffle(self.lectures)

            for lecture in self.lectures:
                self.shuffle_classrooms()
                for professor in lecture.chosen_professors:
                    possible_times = self.professor_available_times[professor]
                    random.shuffle(possible_times)
                    possible_classrooms = self.lecture_to_classrooms.get((lecture.lecture_code, lecture.division), [])
                    for (day, start_period) in possible_times:
                        for classroom in possible_classrooms:
                            if self.check_constraints(lecture, day, start_period, professor, classroom):
                                self.add_lecture_to_schedule(lecture, day, start_period, professor, classroom)
                                break
                        else:
                            continue
                        break

            if len(self.schedule) == len(self.lectures):
                self.save_schedule()
                attempts += 1

        print(f"총 {len(self.all_schedules)}개의 스케줄이 생성되었습니다.")

    def create_output_directory(self):
        current_time = datetime.now().strftime('%Y%m%d_%H%M%S')
        directory_name = f"schedule_{current_time}"
        os.makedirs(directory_name, exist_ok=True)
        return directory_name

    def save_schedule(self):
        score, score_details = self.evaluate_schedule()
        if score not in self.score_count:
            self.score_count[score] = 0
        self.score_count[score] += 1
        file_name = f"{self.output_directory}/table_{score}-{self.score_count[score]}.txt"
        with open(file_name, 'w') as file:
            professor_schedules = self.generate_professor_schedules()
            for professor, schedule in professor_schedules.items():
                file.write(f"\n{professor}'s Schedule:\n")
                for item in schedule:
                    line = f"Day {item['day']}, Period {item['start_period']}: {item['lecture']}-{item['division']} in classroom {item['classroom']} (year-{item['year']})\n"
                    file.write(line)
                file.write("=======================================\n")
            file.write("\nEvaluation Details:\n")
            file.write(score_details)
        self.all_schedules.append(self.schedule.copy())

    def evaluate_schedule(self):
        score = 1000
        score_details = ""

        for prof_code, days in self.professor_scheduled_days.items():
            if len(days) < 2:
                deduction = 5
                score -= deduction
                score_details += f"- Professor {prof_code} did not lecture at least 2 days: -{deduction} points\n"

        for item in self.schedule:
            if item['start_period'] == 1:
                score -= 1
                score_details += f"- Section {item['section']} of lecture {item['lecture']} at 1st period: -1 point\n"
            if item['start_period'] == 4 or item['start_period'] == 5:
                score -= 5
                score_details += f"- Section {item['section']} of lecture {item['lecture']} during lunch time (4th or 5th period): -5 points\n"
            if (item['day'], item['start_period']) in self.professors[item['professor']].preferred_times and \
                    self.professors[item['professor']].is_instructor == 0:
                score += 1
                score_details += f"- Preferred time slot for section {item['section']} of lecture {item['lecture']}: +1 point\n"

        return score, score_details

    def generate_professor_schedules(self):
        professor_schedules = {professor: [] for professor in self.professors.keys()}
        for item in self.schedule:
            professor_schedules[item['professor']].append(item)
        return professor_schedules

# Schedule 인스턴스 생성
schedule = Schedule(lectures, professors, classrooms, Group)
# 1,000개의 시간표 생성
schedule.generate_random_schedule(max_schedules=1000)
