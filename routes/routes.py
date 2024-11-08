# routes.py
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
from config.config import timetablesCollection
from model.model import Timetable, Lecture, Classroom, Professor
from algorithm.dataLoading import load_and_map_data
from algorithm.dataPreprocessing import preprocess_data
from algorithm.backtracking import run_backtracking
from algorithm.excelizing import generate_timetable
import os
from serializer.serializer import serialize_dict
from typing import List
import os

router = APIRouter()

# 1. 시간표 생성
@router.post('/timetables', status_code=status.HTTP_201_CREATED)
def create_timetable(timetable: Timetable):
    if timetablesCollection.find_one({"id": timetable.id}):
        raise HTTPException(status_code=400, detail="이미 존재하는 시간표 ID입니다.")
    timetablesCollection.insert_one(timetable.dict())
    return {"message": "시간표가 성공적으로 생성되었습니다."}

# 2. 시간표 조회
@router.get('/timetables/{timetable_id}')
def get_timetable(timetable_id: str):
    timetable = timetablesCollection.find_one({"id": timetable_id})
    if not timetable:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    return serialize_dict(timetable)

# 3. 시간표 수정
@router.put('/timetables/{timetable_id}')
def update_timetable(timetable_id: str, updated_timetable: Timetable):
    result = timetablesCollection.update_one(
        {"id": timetable_id},
        {"$set": updated_timetable.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    return {"message": "시간표가 성공적으로 수정되었습니다."}

# 4. 시간표 삭제
@router.delete('/timetables/{timetable_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_timetable(timetable_id: str):
    result = timetablesCollection.delete_one({"id": timetable_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    return {"message": "시간표가 성공적으로 삭제되었습니다."}

# 5. 시간표 내 강의 추가
@router.post('/timetables/{timetable_id}/lectures', status_code=status.HTTP_201_CREATED)
def add_lecture_to_timetable(timetable_id: str, lecture: Lecture):
    timetable = timetablesCollection.find_one({"id": timetable_id})
    if not timetable:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    timetablesCollection.update_one(
        {"id": timetable_id},
        {"$push": {"lectures": lecture.dict()}}
    )
    return {"message": "강의가 시간표에 성공적으로 추가되었습니다."}

# 6. 시간표 내 강의실 추가
@router.post('/timetables/{timetable_id}/classrooms', status_code=status.HTTP_201_CREATED)
def add_classroom_to_timetable(timetable_id: str, classroom: Classroom):
    timetable = timetablesCollection.find_one({"id": timetable_id})
    if not timetable:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    timetablesCollection.update_one(
        {"id": timetable_id},
        {"$push": {"classrooms": classroom.dict()}}
    )
    return {"message": "강의실이 시간표에 성공적으로 추가되었습니다."}

# 7. 시간표 내 교수 추가
@router.post('/timetables/{timetable_id}/professors', status_code=status.HTTP_201_CREATED)
def add_professor_to_timetable(timetable_id: str, professor: Professor):
    timetable = timetablesCollection.find_one({"id": timetable_id})
    if not timetable:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    timetablesCollection.update_one(
        {"id": timetable_id},
        {"$push": {"professors": professor.dict()}}
    )
    return {"message": "교수가 시간표에 성공적으로 추가되었습니다."}



# 9. 시간표 생성 알고리즘 실행
@router.post('/timetables/{timetable_id}/generate')
def generate_timetable_endpoint(timetable_id: str):
    try:
        # 데이터 로드 및 매핑
        lectures, professors, classrooms, option = load_and_map_data(timetable_id)

        # 데이터 전처리
        preprocess_data(lectures, professors, classrooms)

        # 백트래킹 알고리즘 실행
        currentschedule = run_backtracking(lectures, professors, option)

        # 시간표 생성 및 엑셀 파일 저장
        file_path = generate_timetable(currentschedule, lectures, professors, classrooms)

        # 생성된 엑셀 파일을 클라이언트에게 반환
        return FileResponse(
            path=file_path,
            filename=os.path.basename(file_path),
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )

    except Exception as e:
        # 상세한 오류 메시지를 로깅하거나 출력할 수 있습니다.
        print(f"시간표 생성 중 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail="시간표 생성 중 오류가 발생했습니다.")
