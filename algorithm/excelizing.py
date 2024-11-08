# excelizing.py
# 실질적으로 시간표 생성하는 부분
import pandas as pd
from openpyxl import load_workbook
from openpyxl.styles import Alignment, Border, Side, PatternFill
import random
import os
from datetime import datetime

def generate_timetable(currentschedule, lectures, professors, classrooms):
    def visualization(currentschedule, professors, classrooms):
        def add_columns(title, rows, df):
            new_row = pd.DataFrame([[''] * (df.shape[1])], columns=df.columns)
            df = pd.concat([df, new_row], ignore_index=True)
            return df

        def add_profName(lecture_str, profCode, professors):
            for professor in professors:
                if professor.profCode == profCode:
                    lecture_str += f"({professor.name})"
                    break
            return lecture_str

        def batch_lecture(df, day, period, duration, lecture_str):
            for j in range(duration):
                current_period = period + j
                if current_period < len(df.index):
                    cell_value = df.iloc[current_period, day]
                    if pd.isna(cell_value):
                        df.iloc[current_period, day] = lecture_str
                    else:
                        df.iloc[current_period, day] = f"{cell_value}\n{lecture_str}"

        # 강의 배치 정보 출력 (디버깅용)
        for lecture in currentschedule:
            print(f"{lecture.lectureCode} {lecture.division} {lecture.TP} "
                  f"{lecture.batched[0]}날짜에, {lecture.batched[1]}부터 {lecture.batched[1] + lecture.duration}까지 "
                  f"{lecture.batched[2]} 건물의 {lecture.batched[3]} 강의실")

        # 학년별-교수별-강의실별 순으로 시간표 제작
        columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        rows = [f'{h:02d}:00~{h+1:02d}:00' for h in range(9, 22)]

        dataframes = []
        titles = []

        # 학년별 시간표: 1~4학년 (대학원 제외)
        for i in range(1, 5):
            df = pd.DataFrame(index=rows, columns=columns)  # 빈 데이터프레임 생성

            # 학년별 강의 탐색
            for lecture in currentschedule:
                if lecture.year == i:
                    day = lecture.batched[0]
                    period = lecture.batched[1]
                    duration = lecture.duration
                    lecture_str = f"{lecture.lectureCode} {lecture.name}"
                    profCode = lecture.profCode
                    if lecture.MR:
                        lecture_str += "(전필)"
                    lecture_str = add_profName(lecture_str, profCode, professors)  # 교수명 추가
                    batch_lecture(df, day, period, duration, lecture_str)  # 강의 배치

            df = df.fillna('')  # 빈 값 처리
            title = f"{i}학년 시간표"  # 제목
            df = add_columns(title, rows, df)  # 열 추가
            dataframes.append(df)
            titles.append(title)

        # 교수별 시간표
        for professor in professors:
            if not professor.isprof:
                continue  # 전임교원만 포함
            df = pd.DataFrame(index=rows, columns=columns)  # 빈 데이터프레임 생성

            # 교수별 강의 탐색
            for lecture in currentschedule:
                if lecture.profCode == professor.profCode:
                    day = lecture.batched[0]
                    period = lecture.batched[1]
                    duration = lecture.duration
                    lecture_str = f"{lecture.lectureCode} {lecture.name}"
                    if lecture.MR:
                        lecture_str += "(전필)"
                    lecture_str = add_profName(lecture_str, lecture.profCode, professors)  # 교수명 추가
                    batch_lecture(df, day, period, duration, lecture_str)  # 강의 배치

            df = df.fillna('')  # 빈 값 처리
            title = f"{professor.name} 전임교원 시간표"  # 제목
            df = add_columns(title, rows, df)  # 열 추가
            dataframes.append(df)
            titles.append(title)

        # 강의실별 시간표
        for classroom in classrooms:
            df = pd.DataFrame(index=rows, columns=columns)  # 빈 데이터프레임 생성
            building = classroom.building
            classroomNo = classroom.classroomNo

            # 강의실별 강의 탐색
            for lecture in currentschedule:
                lecture_building = lecture.batched[2]
                lecture_classroomNo = lecture.batched[3]
                if (lecture_building == building and lecture_classroomNo == classroomNo):
                    day = lecture.batched[0]
                    period = lecture.batched[1]
                    duration = lecture.duration
                    lecture_str = f"{lecture.lectureCode} {lecture.name}"
                    profCode = lecture.profCode
                    if lecture.MR:
                        lecture_str += "(전필)"
                    lecture_str = add_profName(lecture_str, profCode, professors)  # 교수명 추가
                    batch_lecture(df, day, period, duration, lecture_str)  # 강의 배치

            df = df.fillna('')  # 빈 값 처리
            title = f"{building} 건물의 {classroomNo} 강의실 시간표"  # 제목
            df = add_columns(title, rows, df)  # 열 추가
            dataframes.append(df)
            titles.append(title)

        return dataframes, titles

    def get_excelFile(dataframes, titles):
        # 파일명(경로) 설정
        current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_path = f'./test/schedule_{current_time}.xlsx'

        # 디렉토리 경로가 없는 경우 생성
        directory = os.path.dirname(file_path)
        if not os.path.exists(directory):
            os.makedirs(directory)

        # 시간 범위 리스트 생성
        rows = [f'{h:02d}:00~{h+1:02d}:00' for h in range(9, 22)]

        # ExcelWriter 객체 생성
        with pd.ExcelWriter(file_path, engine='openpyxl') as writer:
            # 시작 위치 (행 번호)
            start_row = 0

            for title, df in zip(titles, dataframes):
                # 시간 범위 열 추가
                df_with_time = pd.DataFrame({'Time': rows[:len(df)]})
                df_with_time = pd.concat([df_with_time, df], axis=1)

                # 데이터프레임을 엑셀 시트에 추가
                df_with_time.to_excel(writer, sheet_name='MergedSheet', startrow=start_row, index=False)

                # 제목을 먼저 독립된 텍스트 행으로 추가
                worksheet = writer.sheets['MergedSheet']  # 시트가 없을 때는 새로 만듦
                worksheet.cell(row=start_row + 1, column=1).value = title  # title을 첫 번째 열에 추가

                # 세로 방향으로 같은 문자열을 포함한 셀들을 병합
                for col in range(2, df_with_time.shape[1] + 1):  # B열부터 시작
                    start_row_merge = None
                    for row in range(start_row + 2, start_row + 2 + len(df_with_time)):
                        cell_value = worksheet.cell(row=row, column=col).value
                        if cell_value:  # 셀이 비어있지 않은 경우
                            if start_row_merge is None:
                                start_row_merge = row  # 시작 행 저장
                            elif worksheet.cell(row=start_row_merge, column=col).value != cell_value:
                                if start_row_merge < row - 1:
                                    worksheet.merge_cells(start_row=start_row_merge, start_column=col, end_row=row - 1, end_column=col)
                                start_row_merge = row  # 새 시작 행으로 업데이트
                        else:
                            if start_row_merge is not None:
                                if start_row_merge < row - 1:
                                    worksheet.merge_cells(start_row=start_row_merge, start_column=col, end_row=row - 1, end_column=col)
                                start_row_merge = None  # 시작 행 초기화

                    # 마지막 남은 병합 처리
                    if start_row_merge is not None and start_row_merge < start_row + 1 + len(df_with_time):
                        worksheet.merge_cells(start_row=start_row_merge, start_column=col, end_row=start_row + 1 + len(df_with_time), end_column=col)

                # 시간 범위 열에 경계선 적용
                for row_idx in range(start_row + 2, start_row + 2 + len(df_with_time)):
                    cell = worksheet.cell(row=row_idx, column=1)  # 'Time' 열에 해당하는 셀
                    cell.border = Border(left=Side(style='thin'),
                                         right=Side(style='thin'),
                                         top=Side(style='thin'),
                                         bottom=Side(style='thin'))

                # 표 경계선 생성
                # 가로 경계선
                for col_idx in range(1, df_with_time.shape[1] + 1):  # 열의 개수만큼 반복
                    cell = worksheet.cell(row=start_row + 2 + len(df_with_time) - 1, column=col_idx)
                    cell.border = Border(top=Side(style='thin'))  # 아래쪽 경계선만 적용

                # 세로 경계선
                for row_idx in range(start_row + 2, start_row + 2 + len(df_with_time)):
                    cell = worksheet.cell(row=row_idx, column=df_with_time.shape[1])
                    cell.border = Border(right=Side(style='thin'))

                # 다음 데이터프레임이 들어갈 위치를 조정 (빈 행 추가)
                start_row += len(df_with_time) + 2  # 데이터프레임의 행 수 + 1 (빈 행) + 1 (추가 빈 행)

        # 파일 로드
        wb = load_workbook(file_path)
        ws = wb['MergedSheet']

        # 각 셀의 내용을 기반으로 같은 색으로 채우기
        colors = {}
        for row in ws.iter_rows(min_row=1, min_col=1, max_col=ws.max_column):
            for cell in row:
                if cell.value:
                    if cell.value not in colors:
                        colors[cell.value] = f"{random.randint(150, 255):02X}{random.randint(150, 255):02X}{random.randint(150, 255):02X}"
                    cell.fill = PatternFill(start_color=colors[cell.value], end_color=colors[cell.value], fill_type="solid")

        # 모든 셀을 중앙 정렬
        for row in ws.iter_rows():
            for cell in row:
                cell.alignment = Alignment(horizontal='center', vertical='center')

        # 교시 정렬
        for row in range(1, ws.max_row + 1):
            ws[f"A{row}"].alignment = Alignment(horizontal='right', vertical='top')

        # 교시 색상 변경
        period_fill = PatternFill(start_color="E6E6E6", end_color="E6E6E6", fill_type="solid")
        for row in range(1, ws.max_row + 1):
            ws[f"A{row}"].fill = period_fill
            if ws[f"A{row}"].value is None:  # 비어있는 셀 확인
                ws[f"A{row}"].fill = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

        # 요일 색상 변경
        day_fill = PatternFill(start_color="E6E6E6", end_color="E6E6E6", fill_type="solid")
        for row in range(1, ws.max_row + 1):
            if ws[f"A{row}"].value and "시간표" in ws[f"A{row}"].value:
                for col in range(1, ws.max_column + 1):  # 모든 열을 반복
                    ws.cell(row=row, column=col).fill = day_fill

        # 타이틀 색상 변경
        title_fill = PatternFill(start_color="FFDD00", end_color="FFDD00", fill_type="solid")
        for row in range(1, ws.max_row + 1):
            if ws[f"A{row}"].value and "시간표" in ws[f"A{row}"].value:
                ws[f"A{row}"].fill = title_fill  # A열에 있는 셀만 색상 변경

        wb.save(file_path)
        return file_path  # 파일 경로를 반환

    # 시간표 정렬
    currentschedule.sort(key=lambda x: (x.lectureCode, x.division, x.TP))
    professors = sorted(professors, key=lambda professor: not professor.isprof)

    # 시간표 생성 및 저장
    dataframes, titles = visualization(currentschedule, professors, classrooms)
    file_path = get_excelFile(dataframes, titles)
    print("시간표 생성 및 엑셀 파일 저장이 완료되었습니다.")

    return file_path