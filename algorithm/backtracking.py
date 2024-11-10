# backtracking.py
import random
import time
import pandas as pd
import algorithm.common as common

pd.set_option('display.max_colwidth', None)

# 데이터 로딩
error = common.error

def run_backtracking(lectures, professors, option):
    print("가능한 시간표 조합을 짜는 중입니다...")

    # 데이터를 랜덤하게 섞어줍니다.
    random.shuffle(lectures)
    random.shuffle(professors)
    currentschedule = []

    # 제약조건 확인 함수
    def schedule_validation(lecture, professor, availability, currentschedule):
        day, period, building, classroomNo = availability
        lectureCode = lecture.lectureCode
        division = lecture.division
        TP = lecture.TP
        lecture_duration = lecture.duration
        profCode = lecture.profCode
        isprof = professor.isprof
        lectureCnt = professor.lectureCnt
        MR = lecture.MR
        year = lecture.year
        isTPGroup = lecture.isTPGroup
        duration = lecture.duration

        if (isValid_timeSpace(day, period, building, classroomNo, lecture_duration, currentschedule) and
        isValid_prof(day, period, profCode, lecture_duration, currentschedule) and
        isValid_TPGroup(day, period, isTPGroup, lectureCode, TP, currentschedule) and
        isValid_MR(day, period, MR, lectureCode, TP, lecture_duration, currentschedule) and
        isValid_sameGrade(day, period, year, lectureCode, TP, lecture_duration, currentschedule) and
        isValid_TP_DayDif(day, lectureCode, division, currentschedule) and
        isValid_week(professor, day, currentschedule) and  # 수정된 부분
        isValid_lunch(day, period, duration, year, currentschedule)
        ):
            return True
        return False

    # 건물, 교실, 날짜에 따른 시간이 겹치면 안 됨
    def isValid_timeSpace(day, period, building, classroomNo, lecture_duration, currentschedule):
        for scheduled in currentschedule:
            scheduled_day, scheduled_period, scheduled_building, scheduled_classroomNo = scheduled.batched
            # 같은 건물, 교실, 날짜에서 시간이 겹치는지 확인
            if (building == scheduled_building and
                classroomNo == scheduled_classroomNo and
                day == scheduled_day):
                scheduled_duration = scheduled.duration
                if not (period + lecture_duration <= scheduled_period or
                        period >= scheduled_period + scheduled_duration):
                    return False
        return True

    # 교수의 강의 시간 겹치면 안 됨
    def isValid_prof(day, period, profCode, lecture_duration, currentschedule):
        for scheduled in currentschedule:
            scheduled_day, scheduled_period, _, _ = scheduled.batched
            # 같은 교수와 날짜에서 시간이 겹치는지 확인
            if profCode == scheduled.profCode and day == scheduled_day:
                scheduled_duration = scheduled.duration
                if not (period + lecture_duration <= scheduled_period or
                        period >= scheduled_period + scheduled_duration):
                    return False
        return True

    # TP 그룹 시간이 겹쳐야 함
    def isValid_TPGroup(day, period, isTPGroup, lectureCode, TP, currentschedule):
        if not isTPGroup:
            return True  # TPGroup에 속하지 않음
        for scheduled in currentschedule:
            if (scheduled.isTPGroup and  # 같은 TP 그룹이 존재하는 경우
                (lectureCode, TP) == (scheduled.lectureCode, scheduled.TP)):
                scheduled_day, scheduled_period, _, _ = scheduled.batched
                if not (scheduled_day == day and scheduled_period == period):  # 시간대가 같아야 함
                    return False
        return True

    # 전공 필수 시간 겹침 확인
    def isValid_MR(day, period, MR, lectureCode, TP, lecture_duration, currentschedule):
        if not MR:  # 전필이 아닌 경우 시간 겹침 확인 안함
            return True
        for scheduled in currentschedule:
            if (scheduled.MR and
                (lectureCode, TP) != (scheduled.lectureCode, scheduled.TP)):
                scheduled_day, scheduled_period, _, _ = scheduled.batched
                if day == scheduled_day:
                    scheduled_duration = scheduled.duration
                    if not (period + lecture_duration <= scheduled_period or
                            period >= scheduled_period + scheduled_duration):
                        return False
        return True

    # 학년이 같은 과목끼리 겹치지 않기
    def isValid_sameGrade(day, period, year, lectureCode, TP, lecture_duration, currentschedule):
        if year == 0:  # 학년 구분 제외 교과목(학과 교양, 대학원 등)
            return True
        for scheduled in currentschedule:
            if (year == scheduled.year and
                (lectureCode, TP) != (scheduled.lectureCode, scheduled.TP)):
                scheduled_day, scheduled_period, _, _ = scheduled.batched
                if day == scheduled_day:
                    scheduled_duration = scheduled.duration
                    if not (period + lecture_duration <= scheduled_period or
                            period >= scheduled_period + scheduled_duration):
                        return False
        return True

    # 한 강의의 TP가 다른 날짜에 배정되었는지 확인
    def isValid_TP_DayDif(day, lectureCode, division, currentschedule):
        for scheduled in currentschedule:
            if (lectureCode == scheduled.lectureCode and
                division == scheduled.division):
                scheduled_day, _, _, _ = scheduled.batched
                if day == scheduled_day:  # 다른 날짜에 배정되어야 함
                    return False
        return True

    # 교수가 주당 4일 근무하는지
    def isValid_week(professor, day, currentschedule):
        if option.isWeek and professor.weekConstraint:
            # 주 4일 근무 제약 조건 적용 대상인 경우
            day_lists = [False for _ in range(5)]
            day_lists[day] = True  # 현재 강의를 해당 요일에 배정한다고 가정
            for scheduled in currentschedule:
                if professor.profCode == scheduled.profCode:
                    day_lists[scheduled.batched[0]] = True  # 이미 배정된 요일 표시
            cnt = sum(day_lists)
            remaining_lectures = professor.lectureCnt - 1  # 현재 강의를 배정한다고 가정하여 남은 강의 수 계산
            possible_days = 5 - cnt  # 남은 가능한 요일 수

            if cnt + remaining_lectures < 4:
                # 남은 강의를 모두 다른 요일에 배정해도 총 4일을 채울 수 없는 경우
                return False

            if remaining_lectures > possible_days:
                # 남은 강의를 배정할 수 있는 요일이 부족한 경우
                return False
        return True  # 제약 조건 미적용 또는 만족하는 경우


    # 특정 학년의 어느 날에 점심시간이 존재하는지 확인
    def isValid_lunch(day, period, duration, year, currentschedule):
        if option.isLunch:
            period_lists = [True for _ in range(13)]  # 빈 시간 목록

            for p in range(period, period + duration):  # 현재 과목 검토
                period_lists[p] = False
            for scheduled in currentschedule:  # 같은 날과 학년의 과목들 검토
                if (year == scheduled.year and
                    day == scheduled.batched[0]):
                    for p in range(scheduled.batched[1], scheduled.batched[1] + scheduled.duration):
                        period_lists[p] = False  # 사용 중으로 변경

            if any(period_lists[i] for i in range(2, 6)):  # 11시~15시 사이에 공백 존재 확인
                return True
            else:
                return False
        return True

    # 교수 찾기 함수
    def find_professor(profCode):
        for professor in professors:
            if professor.profCode == profCode:
                return professor
        return None

    # 백트래킹 함수
    def backtrack(currentschedule, index, start_time, time_limit, highest):
        if time.time() - start_time > time_limit:
            return False

        if index > highest:
            highest = index
            time_limit += 0.005

        if index == len(lectures):
            return True

        lecture = lectures[index]
        professor = find_professor(lecture.profCode)
        if professor is None:
            return False

        available_slots = list(lecture.available)
        random.shuffle(available_slots)
        for availability in available_slots:
            if schedule_validation(lecture, professor, availability, currentschedule):
                lecture.batched = availability
                currentschedule.append(lecture)
                if professor.isprof:
                    professor.lectureCnt -= 1

                if backtrack(currentschedule, index + 1, start_time, time_limit, highest):
                    return True

                # 실패 시 되돌아가기
                currentschedule.pop()
                lecture.batched = None
                if professor.isprof:
                    professor.lectureCnt += 1
        return False

    # 초기화 및 실행
    start_time = time.time()
    time_limit = 10  # 시간 제한을 적절히 설정
    highest = len(lectures) * 0.8

    while True:
        if backtrack(currentschedule, 0, start_time, time_limit, highest):
            break
        else:
            random.shuffle(lectures)
            random.shuffle(professors)
            currentschedule = []

    return currentschedule  # currentschedule을 반환하도록 수정