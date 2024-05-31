# utils.py

import os
from datetime import datetime

class TimeoutException(Exception):
    pass

def map_professor_availability(professors):
    availability = {}
    for professor in professors:
        available_times = [(day, period) for day in range(1, 6) for period in range(1, 10) if (day, period) not in professor.off_times]
        availability[professor.prof_code] = available_times
    return availability

def create_output_directory():
    current_time = datetime.now().strftime('%Y%m%d_%H%M%S')
    directory_name = f"schedule_{current_time}"
    os.makedirs(directory_name, exist_ok=True)
    return directory_name

def evaluate_schedule(schedule, professor_scheduled_days, professors):
    score = 1000
    score_details = ""

    for prof_code, days in professor_scheduled_days.items():
        if len(days) < 2:
                deduction = 5
                score -= deduction
                score_details += f"- Professor {prof_code} did not lecture at least 2 days: -{deduction} points\n"

    for item in schedule:
        if item['start_period'] == 1:
            score -= 1
            score_details += f"- Lecture {item['lecture']} at 1st period: -1 point\n"
        if item['start_period'] == 4 or item['start_period'] == 5:
            score -= 5
            score_details += f"- Lecture {item['lecture']} during lunch time (4th or 5th period): -5 points\n"
        if (item['day'], item['start_period']) in professors[item['professor']].preferred_times and \
                professors[item['professor']].is_instructor == 0:
            score += 1
            score_details += f"- Preferred time slot for lecture {item['lecture']}: +1 point\n"

    return score, score_details
