# config.py

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# 데이터베이스 설정
db = client.university  # 'university' 데이터베이스 사용

# 컬렉션 설정
timetablesCollection = db['Timetables']

# 연결 확인
try:
    client.admin.command('ping')
    print("MongoDB에 성공적으로 연결되었습니다!")
except Exception as e:
    print(f"MongoDB 연결 중 오류 발생: {e}")