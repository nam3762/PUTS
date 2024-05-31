# visualize.py

import matplotlib.pyplot as plt
import random
import os
import json
import matplotlib.font_manager as fm
from matplotlib.colors import to_rgba
import numpy as np
from PIL import Image
from data_classes import professors, classrooms, groups, lectures

# 폰트 설정
font_path = './nanum-gothic/NanumGothic.ttf'  # 설치된 폰트의 경로
fontprop = fm.FontProperties(fname=font_path)

# 색상 목록
colors = ['#FFB6C1', '#87CEFA', '#98FB98', '#FFD700', '#FF6347', '#40E0D0', '#DA70D6', '#F08080', '#E0FFFF', '#FAFAD2']
color_map = {}

# 교시 및 요일 정의
periods = list(range(1, 10))
days = ['월', '화', '수', '목', '금']

# 교수 코드, 강의 코드, 그룹 코드 매핑 테이블 생성
professor_name_map = {prof.prof_code: prof.name for prof in professors}
lecture_name_map = {f"{lec.lecture_code}-{lec.division}": lec.name for lec in lectures}
group_name_map = {grp.group_no: grp.name for grp in groups}


def read_schedule_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)


def crop_whitespace(image_path, output_path):
    image = Image.open(image_path)
    image_data = np.array(image)

    # 모든 축을 통해 흰색이 아닌 부분을 찾아낸다.
    non_empty_columns = np.where(image_data.min(axis=0) < 255)[0]
    non_empty_rows = np.where(image_data.min(axis=1) < 255)[0]

    # 흰색 부분을 제외한 영역으로 이미지를 자른다.
    crop_box = (min(non_empty_columns), min(non_empty_rows), max(non_empty_columns), max(non_empty_rows))
    cropped_image = image.crop(crop_box)
    cropped_image.save(output_path)
    print(f'{output_path} 저장 완료')


def plot_schedule(table_data, cell_colors, column_labels, output_path):
    fig, ax = plt.subplots(figsize=(40, len(table_data) * 1.5))

    table = ax.table(cellText=table_data, colLabels=column_labels, cellColours=cell_colors, loc='center',
                     cellLoc='center')
    table.auto_set_font_size(False)
    table.set_fontsize(14)
    table.scale(1, 2)

    for key, cell in table.get_celld().items():
        cell.get_text().set_fontproperties(fontprop)

    ax.axis('off')
    plt.tight_layout(pad=1)
    plt.savefig(output_path, dpi=300, bbox_inches='tight', pad_inches=1)
    plt.close()
    print(f'{output_path} 저장 완료')


def get_schedule_matrix(prof_schedules):
    schedule_matrix = [['' for _ in range(9)] for _ in range(5)]
    color_matrix = [['white' for _ in range(9)] for _ in range(5)]

    for lecture in prof_schedules['lectures']:
        day = lecture['day'] - 1
        period = lecture['period'] - 1
        duration = lecture['duration']
        lecture_code = lecture['lecture'] + '-' + lecture['division']
        lecture_name = lecture_name_map.get(lecture_code, lecture_code)
        classroom = lecture['classroom']
        cell_text = f'{lecture_name}\n({classroom})'
        cell_color = to_rgba(color_map.get(lecture_code, random.choice(colors)), 0.5)
        color_map[lecture_code] = cell_color
        for i in range(duration):
            if period + i < 9:
                schedule_matrix[day][period + i] = cell_text if i == 0 else ''
                color_matrix[day][period + i] = cell_color

    for off_time in prof_schedules['off_times']:
        day = off_time['day'] - 1
        period = off_time['period'] - 1
        schedule_matrix[day][period] = 'Off'
        color_matrix[day][period] = to_rgba('gray', 0.5)

    return schedule_matrix, color_matrix


def plot_professor_schedules(professor_schedules, output_directory):
    table_data = []
    cell_colors = []

    for prof_code, prof_schedules in professor_schedules.items():
        prof_name = professor_name_map.get(prof_code, prof_code)
        row = [prof_name]
        row_colors = ['#f2f2f2']

        schedule_matrix, color_matrix = get_schedule_matrix(prof_schedules)

        for day in range(5):
            for period in range(9):
                row.append(schedule_matrix[day][period])
                row_colors.append(color_matrix[day][period])

        table_data.append(row)
        cell_colors.append(row_colors)

    column_labels = [''] + [f'{day} {period}교시' for day in days for period in periods]
    output_path = os.path.join(output_directory, 'professor_schedules.png')
    plot_schedule(table_data, cell_colors, column_labels, output_path)
    crop_whitespace(output_path, output_path)


def plot_grade_schedule(professor_schedules, output_directory):
    table_data = []
    cell_colors = []

    for year in range(1, 5):
        for i in range(3):
            row = [f'{year}학년' if i == 1 else ''] + [''] * (9 * 5)
            row_colors = ['#f2f2f2' if i == 1 else 'white'] + ['white'] * (9 * 5)
            table_data.append(row)
            cell_colors.append(row_colors)

    for professor, schedule in professor_schedules.items():
        for lecture in schedule['lectures']:
            year = lecture['year']
            day = lecture['day'] - 1
            period = lecture['period'] - 1
            duration = lecture['duration']
            lecture_code = lecture['lecture'] + '-' + lecture['division']
            lecture_name = lecture_name_map.get(lecture_code, lecture_code)
            professor_name = professor_name_map.get(professor, professor)
            classroom = lecture['classroom']
            cell_text = f'{lecture_name}\n({professor_name})\n({classroom})'
            cell_color = to_rgba(color_map.get(lecture_code, random.choice(colors)), 0.5)
            color_map[lecture_code] = cell_color

            added = False
            for row_index in range((year - 1) * 3, (year - 1) * 3 + 3):
                row = table_data[row_index]
                if all(row[1 + day * 9 + period + i] == '' for i in range(duration) if period + i < 9):
                    for i in range(duration):
                        if period + i < 9:
                            row[1 + day * 9 + period + i] = cell_text if i == 0 else ''
                            cell_colors[row_index][1 + day * 9 + period + i] = cell_color
                    added = True
                    break

            if not added:
                for row_index in range((year - 1) * 3, (year - 1) * 3 + 3):
                    row = table_data[row_index]
                    if all(row[1 + day * 9 + period + i] == '' for i in range(duration) if period + i < 9):
                        for i in range(duration):
                            if period + i < 9:
                                row[1 + day * 9 + period + i] = cell_text if i == 0 else ''
                                cell_colors[row_index][1 + day * 9 + period + i] = cell_color
                        break

    column_labels = [''] + [f'{day} {period}교시' for day in days for period in periods]
    output_path = os.path.join(output_directory, 'grade_schedule.png')
    plot_schedule(table_data, cell_colors, column_labels, output_path)
    crop_whitespace(output_path, output_path)


def plot_classroom_schedules(classrooms, professor_schedules, output_directory):
    table_data = []
    cell_colors = []

    for classroom in classrooms:
        row = [f'{classroom.building}-{classroom.classroom_no}', classroom.capacity,
               group_name_map.get(classroom.group_no, classroom.group_no)]
        row_colors = ['#f2f2f2', '#f2f2f2', '#f2f2f2']

        schedule_matrix = [['' for _ in range(9)] for _ in range(5)]
        color_matrix = [['white' for _ in range(9)] for _ in range(5)]

        for prof_code, prof_schedules in professor_schedules.items():
            for lecture in prof_schedules['lectures']:
                if lecture['classroom'] == classroom.classroom_no:
                    day = lecture['day'] - 1
                    period = lecture['period'] - 1
                    duration = lecture['duration']
                    lecture_code = lecture['lecture'] + '-' + lecture['division']
                    lecture_name = lecture_name_map.get(lecture_code, lecture_code)
                    professor_name = professor_name_map.get(prof_code, prof_code)
                    cell_text = f'{lecture_name}\n({professor_name})'
                    cell_color = to_rgba(color_map.get(lecture_code, random.choice(colors)), 0.5)
                    color_map[lecture_code] = cell_color
                    for i in range(duration):
                        if period + i < 9:
                            schedule_matrix[day][period + i] = cell_text if i == 0 else ''
                            color_matrix[day][period + i] = cell_color

        for day in range(5):
            for period in range(9):
                row.append(schedule_matrix[day][period])
                row_colors.append(color_matrix[day][period])

        table_data.append(row)
        cell_colors.append(row_colors)

    column_labels = ['강의실 정보', '수용인원', '그룹번호'] + [f'{day} {period}교시' for day in days for period in periods]
    output_path = os.path.join(output_directory, 'classroom_schedules.png')
    plot_schedule(table_data, cell_colors, column_labels, output_path)
    crop_whitespace(output_path, output_path)
