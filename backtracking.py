import dataPreprocessing
import dataLoading
import random
import common
import time
import multiprocessing as mp
import pandas as pd

pd.set_option('display.max_colwidth', None)

# 데이터 로딩
error = common.error
days = dataLoading.days
hours = dataLoading.hours
originalClassrooms = dataLoading.classrooms
originalProfessors = dataLoading.professors
originalLectures = dataPreprocessing.originalLectures
option = dataLoading.option

for lecture in originalLectures:
    lecture.available = list(lecture.available)
    random.shuffle(lecture.available)
random.shuffle(originalLectures)
random.shuffle(originalClassrooms)
random.shuffle(originalProfessors)

print("시간표 조합을 생성 중입니다.")
currentschedule = []
def run_schedule():
    random.shuffle(originalLectures)  # 결과 랜덤

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
        isValid_week(isprof, lectureCnt, profCode, day, currentschedule) and
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
    
    # TP 그룹 시간이 겹쳐야 됨
    def isValid_TPGroup(day, period, isTPGroup, lectureCode, TP, currentschedule):
        if not isTPGroup:
            return True  # TPGroup에 속하지 않음
        for scheduled in currentschedule:
            if (scheduled.isTPGroup and # 같은 TP 그룹이 존재하는 경우
                (lectureCode, TP) == (scheduled.lectureCode, scheduled.TP)):
                scheduled_day, scheduled_period, _, _ = scheduled.batched
                if not (scheduled_day == day and scheduled_period == period): # 시간대가 같아야 함
                    return False
        return True

    # 전공 필수 시간 겹침 확인
    def isValid_MR(day, period, MR, lectureCode, TP, lecture_duration, currentschedule):
        if not MR:  # 전필이 아닌 경우 시간 겹침 확인 안함
            return True
        for scheduled in currentschedule:
            if (scheduled.MR and # 전필이면서 같은 TPGroup이 아닌 경우에만 겹치면 안 됨. 즉, 같은 TPGroup이면 겹쳐도 됨
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
        if year == 0 or year == 5: # 학년 구분 제외 교과목(학과 교양, 대학원 등)
            return True
        for scheduled in currentschedule:
            if (year == scheduled.year and # 학년이 같으면서 같은 TPGroup이 아닌 경우에만 겹치면 안 됨. 위와 같음
                (lectureCode, TP) != (scheduled.lectureCode, scheduled.TP)):  
                scheduled_day, scheduled_period, _, _ = scheduled.batched
                if day == scheduled_day:
                    scheduled_duration = scheduled.duration
                    if not (period + lecture_duration <= scheduled_period or
                            period >= scheduled_period + scheduled_duration):
                        return False
        return True
    
    # 한 강의의 TP가 다른 날짜에 배정되었는지.
    def isValid_TP_DayDif(day, lectureCode, division, currentschedule):
        for scheduled in currentschedule:
            if (lectureCode == scheduled.lectureCode and
                division == scheduled.division): # 현재 강의 다른 TP가 존재하는 경우
                scheduled_day, _, _, _ = scheduled.batched
                if day == scheduled_day: # 다른 날짜에 배정되어야 함.
                    return False
        return True
    
    # 교수가 주당 4일 근무하는지
    def isValid_week(isprof, lectureCnt, profCode, day, currentschedule):
        if option.isWeek:
            if isprof and lectureCnt == 1:          # 교수의 남은 강의 수가 1개인 경우
                day_lists = [False for _ in days]   # 해당 날짜를 근무하는지
                day_lists[day] = True               # 현재 강의의 대입을 가정,
                for scheduled in currentschedule:   # 이미 존재하던 강의 확인
                    if profCode == scheduled.profCode:
                        day_lists[scheduled.batched[0]] = True
                cnt = 0
                for day in day_lists:   # 강의하는 날짜 카운트
                    if day:
                        cnt += 1
                if cnt < 4:             # 주 4일이 안 되면 안 됨
                    return False
        return True
    
    # 특정 학년의 어느 날에 점심시간이 존재하는지(11시에서 15시 사이에 공백이 존재하는지)
    def isValid_lunch(day, period, duration, year, currentschedule):
        if year == 0 or year == 5:
            return True
        if option.isLunch:
            period_lists = [True for _ in hours]           # 빈 시간 목록

            for period in range(period, period + duration): # 현재 과목 검토
                period_lists[period] = False
            for scheduled in currentschedule:               # 같은 날과 학년의 과목들 검토
                if (year == scheduled.year and
                    day == scheduled.batched[0]): 
                    for period in range(scheduled.batched[1], scheduled.batched[1] + scheduled.duration):
                        period_lists[period] = False        # 사용중으로 변경

            if any(period_lists[i] for i in range(2, 6)):   # 공백 존재 확인
                return True
            else:
                return False
        return True
    
    def find_professor(profCode):
        for professor in originalProfessors:
            if professor.profCode == profCode:
                return professor
    
    def backtrack(currentschedule, index, start_time, time_limit, highest):
        if time.time() - start_time > time_limit:
            return False

        if index > highest: # 시간표 완성에 가까워지는 경우 추가 시간 부여
            highest  = index
            time_limit += 0.005

        if index == len(originalLectures): # 스케쥴 길이가 가득 참
            return True

        lecture = originalLectures[index]
        professor = find_professor(lecture.profCode)
        for availability in lecture.available:
            if schedule_validation(lecture, professor, availability, currentschedule): # 제약조건 확인
                lecture.batched = availability  # 배치 업데이트
                currentschedule.append(lecture)  # 스케줄에 추가
                if professor.isprof:
                    professor.lectureCnt -= 1       # 강의 수 변경

                if backtrack(currentschedule, index + 1, start_time, time_limit, highest):
                    return True

                # 실패 시 되돌아가기
                currentschedule.pop()  # 스케줄에서 제거
                lecture.batched = None  # 배치 초기화
                if professor.isprof:
                    professor.lectureCnt += 1 # 강의 수 변경
        return False

    # 초기화 및 실행
    start_time = time.time()                # 시작 시간 기록
    time_limit = 0.015                      # 제한시간
    highest = len(originalLectures) * 0.8   # 시간 연장 기준
    return backtrack(currentschedule, 0, start_time, time_limit, highest)

while True:
    if run_schedule():
        break  # 성공 시 루프 탈출