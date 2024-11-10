# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import router
from fastapi.responses import JSONResponse, FileResponse
from fastapi.exceptions import RequestValidationError
import uvicorn
import logging
import os
import json

app = FastAPI()

# 로깅 설정
logging.getLogger("pymongo").setLevel(logging.WARNING)
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# 유효성 검사 예외 처리 핸들러
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    body = await request.body()
    try:
        body_data = json.loads(body)
    except json.JSONDecodeError:
        body_data = body.decode("utf-8")
    logger.error(f"Request body: {body_data}")
    logger.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=400,
        content={"detail": exc.errors()},
    )

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 추가
app.include_router(router)

# 기본 라우트
@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "API가 정상적으로 동작하고 있습니다."}

# 다운로드 엔드포인트
@app.get("/downloads/{filename}")
async def download_file(filename: str):
    file_path = os.path.join("C:/Users/PC/Desktop/pymongo/test", filename)
    if not os.path.exists(file_path):
        logger.error(f"File not found: {file_path}")
        return JSONResponse(status_code=404, content={"message": "File not found"})
    return FileResponse(
        path=file_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=filename
    )

# OPTIONS 메서드
@app.options("/timetables")
async def options_timetables():
    return {
        "allow": "GET, POST, OPTIONS",
        "message": "OPTIONS 메서드가 정상적으로 처리되었습니다."
    }

# 실행 설정 (HTTP로만 실행하여 Nginx가 SSL을 처리)
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="debug",
    )
