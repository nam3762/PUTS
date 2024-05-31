# main.py

from schedule import Schedule
from data_classes import lectures, professors, classrooms, Group
from visualize import plot_professor_schedules, plot_grade_schedule, plot_classroom_schedules
import os
import json

def main():
    schedule = Schedule(lectures, professors, classrooms, Group)
    schedule.generate_schedule()

    # Get the highest score schedule
    highest_score = max(schedule.score_count.keys())
    highest_score_schedule_index = schedule.score_count[highest_score]
    schedule_file = f"{schedule.output_directory}/schedule_{highest_score}-{highest_score_schedule_index}.json"

    # Read the highest score schedule
    with open(schedule_file, 'r', encoding='utf-8') as file:
        schedule_data = json.load(file)
    professor_schedules = schedule_data['professor_schedules']

    # Create output directory for visualizations
    visualization_output_directory = os.path.join(schedule.output_directory, 'visualizations')
    os.makedirs(visualization_output_directory, exist_ok=True)

    # Visualize the schedules
    plot_professor_schedules(professor_schedules, visualization_output_directory)
    plot_grade_schedule(professor_schedules, visualization_output_directory)
    plot_classroom_schedules(classrooms, professor_schedules, visualization_output_directory)

if __name__ == "__main__":
    main()
