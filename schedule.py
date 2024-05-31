# schedule.py

import random
import threading
import os
from datetime import datetime
import json
from utils import TimeoutException, map_professor_availability, create_output_directory, evaluate_schedule
from data_classes import Classroom

class Schedule:
    def __init__(self, lectures, professors, classrooms, groups):
        self.professors = {prof.prof_code: prof for prof in professors}
        self.classrooms = classrooms
        self.groups = groups
        self.initial_schedule = []
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
        self.professor_scheduled_days = {prof.prof_code: set() for prof in professors}
        self.professor_available_times = map_professor_availability(professors)
        self.add_fixed_assignments(lectures)
        self.lectures = [lec for lec in lectures if not any(f['lecture_code'] == lec.lecture_code and f['division'] == lec.division for f in self.fixed_schedule)]
        random.shuffle(self.lectures)
        self.lecture_to_classrooms = {}
        for lecture in lectures:
            self.lecture_to_classrooms[lecture.lecture_code, lecture.division] = [
                classroom for classroom in self.classrooms
                if classroom.capacity >= lecture.capacity and classroom.group_no == lecture.group
            ]
        self.shuffle_classrooms()
        self.output_directory = create_output_directory()
        self.all_schedules = []
        self.score_count = {}

    def add_fixed_assignments(self, lectures):
        for assignment in self.fixed_assignments:
            lecture = next((lec for lec in lectures if lec.lecture_code == assignment['lecture_code'] and lec.division == assignment['division']), None)
            if lecture:
                self.add_lecture_to_schedule(lecture, assignment['day'], assignment['period'], assignment['prof_code'], self.get_classroom_by_no(assignment['classroom_no']))
                self.fixed_schedule.append(assignment)
                print(f"미리 배치된 강의 추가: {assignment['lecture_code']}-{assignment['division']} (Day {assignment['day']}, Period {assignment['period']})")
        self.initial_schedule = self.schedule.copy()

    def shuffle_classrooms(self):
        random.shuffle(self.classrooms)

    def get_classroom_by_no(self, classroom_no):
        return next((classroom for classroom in self.classrooms if classroom.classroom_no == classroom_no), None)

    def check_constraints(self, lecture, day, start_period, professor, classroom):
        if self.is_time_space_conflict(day, start_period, lecture.duration, professor, classroom.classroom_no):
            return False
        if self.is_major_required_conflict(lecture, day, start_period):
            return False
        if self.is_lecture_day_conflict(lecture, day):
            return False
        if self.is_year_schedule_conflict(lecture, day, start_period):
            return False
        return True

    def is_time_space_conflict(self, day, start_period, duration, professor, classroom_no):
        for item in self.schedule:
            if item['day'] == day and max(start_period, item['start_period']) < min(start_period + duration, item['start_period'] + item['duration']):
                if item['professor'] == professor or item['classroom'] == classroom_no:
                    return True
        for period in range(start_period, start_period + duration):
            if (day, period) in self.professors[professor].off_times:
                return True
        return False

    def is_major_required_conflict(self, lecture, day, start_period):
        if lecture.major_required and any(day == sched_day and start_period == sched_period for sched_day, sched_period in self.major_required_schedules.get(lecture.lecture_code, [])):
            return True
        return False

    def is_lecture_day_conflict(self, lecture, day):
        if (lecture.lecture_code, lecture.division) in self.lecture_day_schedule and day in self.lecture_day_schedule[(lecture.lecture_code, lecture.division)]:
            return True
        return False

    def is_year_schedule_conflict(self, lecture, day, start_period):
        if lecture.year in self.year_schedules:
            for (other_lecture_code, other_day, other_start_period, other_duration) in self.year_schedules[lecture.year]:
                end_period = start_period + lecture.duration
                other_end_period = other_start_period + other_duration
                if lecture.lecture_code != other_lecture_code and day == other_day and not (end_period <= other_start_period or start_period >= other_end_period):
                    return True
        return False

    def add_lecture_to_schedule(self, lecture, day, start_period, professor, classroom):
        self.schedule.append({
            'lecture': lecture.lecture_code, 'division': lecture.division, 'day': day,
            'start_period': start_period, 'duration': lecture.duration, 'professor': professor,
            'classroom': classroom.classroom_no, 'year': lecture.year
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
            self.professor_scheduled_days[professor].add(day)

    def remove_lecture_from_schedule(self, lecture, day, start_period):
        self.schedule = [item for item in self.schedule if not (
            item['lecture'] == lecture.lecture_code and item['division'] == lecture.division and item['day'] == day and item['start_period'] == start_period
        )]
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

    def generate_schedule(self, max_schedules=10, timeout=10):
        stop_event = threading.Event()

        def attempt_to_schedule_lecture(index=0):
            if stop_event.is_set():
                return False
            if index >= len(self.lectures):
                self.save_schedule()
                self.all_schedules.append(self.schedule.copy())
                return True
            lecture = self.lectures[index]
            random.shuffle(lecture.chosen_professors)
            for professor in lecture.chosen_professors:
                if stop_event.is_set():
                    return False
                possible_times = self.professor_available_times[professor]
                random.shuffle(possible_times)
                possible_classrooms = self.lecture_to_classrooms.get((lecture.lecture_code, lecture.division), [])
                random.shuffle(possible_classrooms)
                for (day, start_period) in possible_times:
                    if stop_event.is_set():
                        return False
                    for classroom in possible_classrooms:
                        if stop_event.is_set():
                            return False
                        if self.check_constraints(lecture, day, start_period, professor, classroom):
                            self.add_lecture_to_schedule(lecture, day, start_period, professor, classroom)
                            if attempt_to_schedule_lecture(index + 1):
                                return True
                            self.remove_lecture_from_schedule(lecture, day, start_period)
            return False

        self.all_schedules = []

        def run_with_timeout():
            return attempt_to_schedule_lecture(0)

        while len(self.all_schedules) < max_schedules:
            self.schedule = self.initial_schedule.copy()
            self.lecture_day_schedule = {}
            self.major_required_schedules = {}
            self.year_schedules = {}
            self.professor_scheduled_days = {prof.prof_code: set() for prof in self.professors.values()}
            random.shuffle(self.lectures)

            stop_event.clear()
            result = [False]
            def target():
                result[0] = run_with_timeout()

            thread = threading.Thread(target=target)
            thread.start()
            thread.join(timeout)

            if thread.is_alive():
                print(f"시간 초과: {timeout}초 내에 스케줄을 완성하지 못했습니다. 다음 스케줄로 넘어갑니다.")
                stop_event.set()
                thread.join()
            else:
                if result[0]:
                    print(f"스케줄 {len(self.all_schedules) + 1}가 성공적으로 생성되었습니다.")

        print(f"총 {len(self.all_schedules)}개의 스케줄이 생성되었습니다.")

    def save_schedule(self):
        score, score_details = evaluate_schedule(self.schedule, self.professor_scheduled_days, self.professors)
        if score not in self.score_count:
            self.score_count[score] = 0
        self.score_count[score] += 1
        file_name = f"{self.output_directory}/schedule_{score}-{self.score_count[score]}.json"
        log_file_name = f"{self.output_directory}/log_{score}-{self.score_count[score]}.txt"

        schedule_data = {"professor_schedules": {}, "evaluation_details": score_details}

        professor_schedules = self.generate_professor_schedules()
        for professor, schedule in professor_schedules.items():
            schedule_data["professor_schedules"][professor] = {
                "lectures": [
                    {
                        "day": item["day"],
                        "period": item["start_period"],
                        "lecture": item["lecture"],
                        "division": item["division"],
                        "classroom": item["classroom"],
                        "year": item["year"],
                        "duration": item["duration"]
                    }
                    for item in schedule
                ],
                "off_times": [
                    {"day": day, "period": period}
                    for day, period in self.professors[professor].off_times
                ]
            }

        with open(file_name, 'w') as file:
            json.dump(schedule_data, file, indent=4)

        with open(log_file_name, 'w') as log_file:
            log_file.write("Evaluation Details:\n")
            log_file.write(score_details)

    def generate_professor_schedules(self):
        professor_schedules = {professor: [] for professor in self.professors.keys()}
        for item in self.schedule:
            professor_schedules[item['professor']].append(item)
        return professor_schedules
