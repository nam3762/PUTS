import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import pandas as pd
import os

# 색상 팔레트
COLORS = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99', '#FFD700', '#9F79EE', '#FF6EB4', '#FF6347', '#00FF7F', '#20B2AA']

def load_schedule(file_path):
    """
    시간표 파일을 읽어 데이터프레임으로 변환합니다.

    Parameters:
        file_path (str): 시간표 파일 경로

    Returns:
        pd.DataFrame: 시간표 데이터프레임
    """
    with open(file_path, 'r') as file:
        lines = file.readlines()

    schedule_data = []
    current_professor = None
    for line in lines:
        line = line.strip()
        if not line:  # 빈 줄 건너뛰기
            continue
        if line.endswith("Schedule:"):
            current_professor = line.split("'s Schedule:")[0].strip()
        elif line.startswith("Day"):
            try:
                parts = line.split(': ')
                if len(parts) < 2:
                    print(f"Skipping line due to unexpected format: {line}")
                    continue
                day_period = parts[0].split(', ')
                day = int(day_period[0].split()[1])
                period = int(day_period[1].split()[1])
                lecture_section = parts[1].split(' in ')[0]
                lecture_code, section = lecture_section.split('-')
                classroom = parts[1].split(' in ')[1].split()[-1]
                schedule_data.append([current_professor, day, period, lecture_code, section, classroom])
            except (IndexError, ValueError) as e:
                print(f"Error processing line: {line}\nError: {e}")
                continue

    columns = ['Professor', 'Day', 'Period', 'Lecture', 'Section', 'Classroom']
    df = pd.DataFrame(schedule_data, columns=columns)
    return df

def create_schedule_plot(data, title, file_name, output_dir):
    """
    주어진 데이터를 사용하여 시간표를 시각화하고 저장합니다.

    Parameters:
        data (pd.DataFrame): 시간표 데이터프레임
        title (str): 플롯 제목
        file_name (str): 저장할 파일 이름
        output_dir (str): 파일을 저장할 디렉토리
    """
    fig, ax = plt.subplots(figsize=(10, 8))
    ax.set_title(title)
    ax.set_xlabel('Day')
    ax.set_ylabel('Period')

    day_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    period_labels = [str(i) for i in range(1, 10)]

    ax.set_xticks(range(1, 6))
    ax.set_xticklabels(day_labels)
    ax.set_yticks(range(1, 10))
    ax.set_yticklabels(period_labels)

    lecture_colors = {lecture: COLORS[i % len(COLORS)] for i, lecture in enumerate(data['Lecture'].unique())}

    for idx, row in data.iterrows():
        rect = mpatches.Rectangle((row['Day'] - 0.5, row['Period'] - 0.5), 1, 1, color=lecture_colors[row['Lecture']],
                                  alpha=0.6)
        ax.add_patch(rect)
        ax.text(row['Day'], row['Period'], f"{row['Lecture']}-{row['Section']}\n{row['Classroom']}", ha='center',
                va='center')

    handles = [mpatches.Patch(color=color, label=lecture) for lecture, color in lecture_colors.items()]
    ax.legend(handles=handles, bbox_to_anchor=(1.05, 1), loc='upper left')

    plt.grid(True)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    plt.savefig(os.path.join(output_dir, file_name), bbox_inches='tight')
    plt.close()

def visualize_schedule(file_path, output_dir):
    """
    시간표 파일을 시각화하여 저장합니다.

    Parameters:
        file_path (str): 시간표 파일 경로
        output_dir (str): 파일을 저장할 디렉토리
    """
    df = load_schedule(file_path)

    # 교수별 시간표 시각화
    for professor in df['Professor'].unique():
        prof_data = df[df['Professor'] == professor]
        title = f"{professor}'s Schedule"
        file_name = f"{professor.replace(' ', '_')}_schedule.png"
        create_schedule_plot(prof_data, title, file_name, output_dir)

    # 강의실별 시간표 시각화
    for classroom in df['Classroom'].unique():
        class_data = df[df['Classroom'] == classroom]
        title = f"Classroom {classroom} Schedule"
        file_name = f"Classroom_{classroom.replace(' ', '_')}_schedule.png"
        create_schedule_plot(class_data, title, file_name, output_dir)

if __name__ == "__main__":
    file_path = 'schedule_20240517_012628/table_898-1.txt'  # 시간표 파일 경로를 입력하세요
    output_dir = 'output_schedules'  # 파일을 저장할 디렉토리
    visualize_schedule(file_path, output_dir)
