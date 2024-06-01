const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const {
  connectDB,
  closeConnection,
  connectInput,
  connectOutput,
  connectUser
} = require("../db.js");

router.post("/FinishInsertProcess", async (req, res) => {
    const { 
        timetableName,
        timetableDescription,
        professors,
        classrooms,
        groupInfo,
        lectures,
    } = req.body;

    console.log(professors);

    try {
        const MONGO_URI = process.env.MONGO_URI;
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // 가장 높은 input_no 값을 가져와서 다음 값을 설정
        const db = await connectDB(client);
        const collection = await connectInput(db);
        const highestInputNoDoc = await collection.findOne({}, { sort: { input_no: -1 } });
        const nextInputNo = highestInputNoDoc ? highestInputNoDoc.input_no + 1 : 1;

        // classroom에 group 필드 추가
        const parsedClassrooms = JSON.parse(classrooms);
        const classroomGroups = JSON.parse(groupInfo);

        parsedClassrooms.forEach(classroom => {
            classroom.group = classroomGroups.map(group => group.groupName);
        });

        // 새로운 입력 생성
        const newInput = {
            input_no: nextInputNo,
            name: timetableName,
            introduce: timetableDescription,
            date: new Date(),
            professor: JSON.parse(professors),
            classroom: parsedClassrooms,
            lecture: JSON.parse(lectures)
        };
        await collection.insertOne(newInput);
        await closeConnection(client);

        // 파이썬 알고리즘 코드 실행 (여기에 실행 코드 추가)
        // 세션 스토리지 전부 제거 (여기에 제거 코드 추가)

        // 데이터 처리 성공 응답 전송
        res.status(201).send("데이터 처리 성공");
    } catch (err) {
        // 에러 발생 시 에러 로그 출력 및 서버 에러 응답 전송
        console.error("데이터 처리 실패: ", err);
        res.status(500).send("서버 에러");
    }
});

router.get("/ModifyTimetable", (req, res) => {
    // 이 엔드포인트에 대한 처리를 추가하세요
});

module.exports = router;
