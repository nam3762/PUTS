import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.lines import Line2D  # Import the Line2D for legend handles
import matplotlib.font_manager as fm
import numpy as np
import random
from classD import Lecture, Professor, Classroom, Group, Time, Chosen, Assign, lectures, professors, classrooms, \
    chosen_instances


# Helper functions
def is_professor_available(professor, day, period, scheduled_lectures):
    return day not in professor.off_days and not any(
        assign.prof_code == professor.prof_code and assign.date == day and assign.period == period
        for assign in scheduled_lectures)

def is_classroom_available(classroom, day, period, scheduled_lectures):
    return not any(
        assign.classroom_no == classroom.classroom_no and assign.date == day and assign.period == period
        for assign in scheduled_lectures)

def is_timeslot_available(lecture, day, period, scheduled_lectures):
    return not any(
        assign.lecture_code == lecture.lecture_code and assign.division == lecture.division and assign.period == period
        for assign in scheduled_lectures)

def can_schedule_major_required(lecture, day, period, scheduled_lectures, lectures):
    if not lecture.major_required:
        return True
    for assign in scheduled_lectures:
        # Find the corresponding lecture for the current assignment
        current_lecture = next((lec for lec in lectures if lec.lecture_code == assign.lecture_code and lec.division == assign.division and lec.section == assign.section), None)
        if current_lecture and current_lecture.major_required and assign.date == day and assign.period == period:
            return False
    return True


def can_schedule_for_year(lecture, day, period, scheduled_lectures):
    return not any(
        assign.year == lecture.year and assign.date == day and assign.period == period
        for assign in scheduled_lectures)


# Adjust the generate_schedule function to account for all constraints
def generate_schedule(lectures, professors, classrooms):
    scheduled_lectures = []

    # Iterate over each lecture to schedule it
    for lecture in lectures:
        for chosen in [c for c in chosen_instances if
                       c.lecture_code == lecture.lecture_code and c.division == lecture.division]:
            professor = next((p for p in professors if p.prof_code == chosen.prof_code), None)
            if not professor:
                continue  # Skip if no professor is found

            assigned_periods = 0
            for day in range(1, 6):  # Monday to Friday
                if day in professor.off_days:
                    continue  # Skip the professor's off days

                for period in range(1, 10):  # 9 periods a day
                    # Check if the lecture can be scheduled at this time
                    if assigned_periods < lecture.duration and \
                            is_professor_available(professor, day, period, scheduled_lectures) and \
                            is_timeslot_available(lecture, day, period, scheduled_lectures):

                        # Find an available classroom with enough capacity
                        for classroom in classrooms:
                            if classroom.group_no == lecture.group and \
                                    classroom.capacity >= lecture.capacity and \
                                    is_classroom_available(classroom, day, period, scheduled_lectures):
                                # Schedule the lecture
                                new_assignment = Assign(
                                    lecture.lecture_code, lecture.division, lecture.section, lecture.year,
                                    classroom.building, classroom.classroom_no, day, period, professor.prof_code)
                                scheduled_lectures.append(new_assignment)
                                assigned_periods += 1
                                break  # Found a classroom, break the classroom loop

                        if assigned_periods == lecture.duration:
                            break  # Scheduled all periods for this lecture, break the period loop

                if assigned_periods == lecture.duration:
                    break  # Scheduled all periods for this lecture, break the day loop

    return scheduled_lectures


generated_schedule = generate_schedule(lectures, professors, classrooms)

# 요일을 나타내는 딕셔너리
day_to_weekday = {
    1: "월요일",
    2: "화요일",
    3: "수요일",
    4: "목요일",
    5: "금요일"
}

# Output the schedule with duration
for assign in generated_schedule:
    # 원본 lectures 리스트에서 Assign 객체와 일치하는 Lecture 객체를 찾음
    matching_lecture = next((lec for lec in lectures if
                             lec.lecture_code == assign.lecture_code and lec.division == assign.division and lec.section == assign.section),
                            None)

    # 일치하는 Lecture 객체에서 duration 정보를 가져옴
    if matching_lecture:
        duration_hours = matching_lecture.duration  # duration을 가져옴
    else:
        duration_hours = "Unknown"  # 일치하는 Lecture 객체를 찾지 못한 경우

    # 숫자 day 값을 요일 문자열로 변환
    weekday = day_to_weekday.get(assign.date, "Unknown Day")

    # 출력문에 duration 정보 포함
    print(f'{assign.lecture_code}-{assign.division} '
          f'{assign.building}-{assign.classroom_no} {weekday} {assign.period}교시 '
          )


# 요일과 시간 설정
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
hours = list(range(9, 18))  # 9시부터 18시까지

# 한글 폰트 설정
plt.rcParams['font.family'] = 'IBM Plex Sans KR'
plt.rcParams['axes.unicode_minus'] = False  # 마이너스 기호 문제 해결

# 색상을 랜덤하게 생성하는 함수
def get_random_color():
    return "#" + ''.join([random.choice('0123456789ABCDEF') for j in range(6)])


# Generate a random color for each lecture code and division combination
lecture_colors = {
    f'{lec.lecture_code}-{lec.division}': get_random_color() for lec in lectures
}


# Function to create timetable plot for each professor
def create_prof_timetable(prof_code):
    # Filter the schedule for the current professor
    prof_schedule = [assign for assign in generated_schedule if assign.prof_code == prof_code]

    # Create the figure and axes
    fig, ax = plt.subplots(figsize=(10, 8))

    # Plot the background grid
    ax.set_xlim(0, 5)
    ax.set_ylim(0, 9)
    ax.set_xticks(np.arange(0, 5, 1))
    ax.set_yticks(np.arange(0, 9, 1))
    ax.set_xticklabels(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], ha='center')
    ax.set_yticklabels([f"{h}:00" for h in range(9, 18)], va='center')
    ax.grid(True)

    # Invert the y-axis to start from the top
    plt.gca().invert_yaxis()

    # Dictionary to hold legend entries to prevent duplicates
    legend_entries = {}

    # Plot each class in the professor's schedule
    for assign in prof_schedule:
        day_index = assign.date - 1
        hour_index = assign.period - 1
        lecture_key = f'{assign.lecture_code}-{assign.division}'
        color = lecture_colors.get(lecture_key, '#FFFFFF')  # Default to white if not found

        # Add a colored patch for each class
        rect = patches.Rectangle((day_index, hour_index), 1, 1, linewidth=1, edgecolor='black', facecolor=color)
        ax.add_patch(rect)

        # Construct legend entry
        matching_lecture = next((lec for lec in lectures if lec.lecture_code == assign.lecture_code and lec.division == assign.division), None)
        classroom_info = next((f"{classroom.building}-{classroom.classroom_no}" for classroom in classrooms if classroom.group_no == matching_lecture.group), "Unknown")
        label = f'{matching_lecture.name} ({matching_lecture.lecture_code}-{matching_lecture.division}), {classroom_info}'

        if label not in legend_entries:
            legend_entries[label] = Line2D([0], [0], marker='s', color=color, label=label, markersize=10)

    # Add the legend outside of the plot
    ax.legend(handles=legend_entries.values(), bbox_to_anchor=(1.05, 1), loc='upper left', fontsize='small')

    # Set title for each professor's timetable
    prof_name = next((p.name for p in professors if p.prof_code == prof_code), "Unknown")
    plt.title(f"Timetable for {prof_name}")

    # Adjust layout and show the plot
    plt.tight_layout()
    plt.show()

# Create a timetable for each professor
for prof in professors:
    create_prof_timetable(prof.prof_code)