import os
import logging
from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from config.config import timetablesCollection
from model.model import Timetable
from algorithm.dataLoading import load_and_map_data
from algorithm.dataPreprocessing import preprocess_data
from algorithm.backtracking import run_backtracking
from algorithm.excelizing import generate_timetable
from serializer.serializer import serialize_dict

# 로그 설정 추가
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()

# 파일 저장 경로 설정
FILE_SAVE_DIR = "C:/Users/PC/Desktop/pymongo/test"

# 모든 시간표 조회
@router.get('/timetables', status_code=status.HTTP_200_OK)
def get_all_timetables():
    timetables = timetablesCollection.find()
    return [serialize_dict(timetable) for timetable in timetables]

# 시간표 생성 (자동으로 시간표 파일 생성 시작)
@router.post('/timetables', status_code=status.HTTP_201_CREATED)
async def create_timetable(timetable: Timetable, background_tasks: BackgroundTasks):
    if timetablesCollection.find_one({"id": timetable.id}):
        raise HTTPException(status_code=400, detail="이미 존재하는 시간표 ID입니다.")
    
    # 시간표 데이터 저장
    timetablesCollection.insert_one(timetable.dict())
    logger.info("Timetable data inserted. Starting background task for file generation...")

    # 백그라운드에서 시간표 파일 생성 시작
    background_tasks.add_task(generate_timetable_file, timetable.id)
    
    return {"message": "시간표가 성공적으로 생성되었으며, 파일 생성이 진행 중입니다."}

# 개별 시간표 조회
@router.get('/timetables/{timetable_id}')
def get_timetable(timetable_id: str):
    timetable = timetablesCollection.find_one({"id": timetable_id})
    if not timetable:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    return serialize_dict(timetable)

# 시간표 업데이트
@router.put('/timetables/{timetable_id}')
def update_timetable(timetable_id: str, updated_timetable: Timetable):
    result = timetablesCollection.update_one(
        {"id": timetable_id},
        {"$set": updated_timetable.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    return {"message": "시간표가 성공적으로 수정되었습니다."}

# 시간표 삭제
@router.delete('/timetables/{timetable_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_timetable(timetable_id: str):
    result = timetablesCollection.delete_one({"id": timetable_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="시간표를 찾을 수 없습니다.")
    return {"message": "시간표가 성공적으로 삭제되었습니다."}

# 파일 상태 확인
@router.get('/timetables/{timetable_id}/status')
def get_timetable_status(timetable_id: str):
    file_name = f"timetable_{timetable_id}.xlsx"
    file_path = os.path.join(FILE_SAVE_DIR, file_name)
    if os.path.exists(file_path):
        logger.info(f"File is ready for timetable_id {timetable_id}")
        return {"status": "Ready", "file_url": f"https://125.251.212.92/downloads/{file_name}"}
    logger.info(f"File is still processing for timetable_id {timetable_id}")
    return {"status": "Processing"}

# 시간표 생성 로직 함수
async def generate_timetable_file(timetable_id: str):
    logger.info(f"generate_timetable_file was called for timetable_id: {timetable_id}")
    try:
        # 데이터 로딩 및 매핑
        logger.info("Starting data loading and mapping...")
        lectures, professors, classrooms, option = load_and_map_data(timetable_id)
        logger.info("Data loaded successfully.")

        # 데이터 전처리
        logger.info("Starting data preprocessing...")
        preprocess_data(lectures, professors, classrooms)
        logger.info("Data preprocessed.")

        # 백트래킹으로 시간표 생성
        logger.info("Starting backtracking algorithm...")
        currentschedule = run_backtracking(lectures, professors, option)
        logger.info("Backtracking completed.")

        # 파일 경로 설정
        file_path = os.path.join(FILE_SAVE_DIR, f"timetable_{timetable_id}.xlsx")
        
        # 엑셀 파일 생성 및 저장
        logger.info("Starting timetable generation and saving to file...")
        saved_file_path = generate_timetable(currentschedule, lectures, professors, classrooms, file_path)
        
        if os.path.exists(saved_file_path):
            logger.info(f"Timetable successfully generated and saved at: {saved_file_path}")
        else:
            logger.error(f"File {saved_file_path} not found after generation.")

    except Exception as e:
        logger.error(f"Error during timetable generation for {timetable_id}: {str(e)}")
