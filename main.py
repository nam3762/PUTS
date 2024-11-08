# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from routes.routes import router
# from fastapi.responses import JSONResponse
# import uvicorn
# from fastapi.exceptions import RequestValidationError
# import logging

# app = FastAPI()

# # 로깅 설정
# # logging.basicConfig(level=logging.DEBUG)
# logging.getLogger("pymongo").setLevel(logging.WARNING)


# @app.exception_handler(RequestValidationError)
# async def validation_exception_handler(request: Request, exc: RequestValidationError):
#     logging.error(f"Validation error: {exc.errors()}")
#     return JSONResponse(
#         status_code=422,
#         content={"detail": exc.errors()},
#     )

# # CORS 설정 추가
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # 모든 도메인 허용 (보안을 위해 특정 도메인을 지정하는 것이 좋습니다)
#     allow_credentials=True,
#     allow_methods=["*"],  # 모든 HTTP 메서드 허용
#     allow_headers=["*"],  # 모든 헤더 허용
# )

# # 라우터 추가
# app.include_router(router)

# # 기본 라우트
# @app.get("/")
# def read_root():
#     return {"message": "API가 정상적으로 동작하고 있습니다."}

# # /timetables에 대해 OPTIONS 메서드 추가 (예시)
# @app.options("/timetables")
# async def options_timetables():
#     return {
#         "allow": "GET, POST, OPTIONS",
#         "message": "OPTIONS 메서드가 정상적으로 처리되었습니다."
#     }

# # 이 코드를 추가하여 직접 실행될 때만 uvicorn을 실행하도록 설정
# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="debug")


from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import router
from fastapi.responses import JSONResponse, StreamingResponse
import uvicorn
from fastapi.exceptions import RequestValidationError
import logging
from io import BytesIO

app = FastAPI()

# 로깅 설정
logging.getLogger("pymongo").setLevel(logging.WARNING)

# WebSocket 연결 관리
clients = {}

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logging.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
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
    return {"message": "API가 정상적으로 동작하고 있습니다."}

# WebSocket 엔드포인트
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    clients[client_id] = websocket
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        del clients[client_id]

# 시간표 생성 및 WebSocket 알림
@app.post("/timetables/{timetable_id}/generate")
async def generate_timetable(timetable_id: str, client_id: str):
    # 파일 생성 로직
    file_path = r"C:\Users\PC\Desktop\pymongo\test"

    # WebSocket으로 알림 전송
    if client_id in clients:
        await clients[client_id].send_text("FileReady")
        
    # 응답으로 파일 URL 반환
    return {"message": "File is being prepared", "file_url": f"/downloads/{file_path.split('/')[-1]}"}

# 다운로드 엔드포인트
@app.get("/downloads/{filename}")
async def download_file(filename: str):
    file_path = f"./downloads/{filename}"
    return StreamingResponse(
        open(file_path, "rb"),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

# OPTIONS 메서드 추가 예시
@app.options("/timetables")
async def options_timetables():
    return {
        "allow": "GET, POST, OPTIONS",
        "message": "OPTIONS 메서드가 정상적으로 처리되었습니다."
    }

# 실행 설정
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="debug")
