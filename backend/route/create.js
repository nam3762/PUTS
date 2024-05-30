/**
 * FixedLecture.js
 * TimetableManage.js
 * Professor.js
 * Classroom.js
 * ClassroomGroup.js
 * Lecture.js
 */
const express = require("express");
const router = express.Router();

router.post("/FixedLectureProcess", (req, res) => {

});

router.post("/TimetableManageProcess", (req, res) => {
    const { timetableName, timetableDescription } = req.body;

    console.log(req.body);
    res.status(200).json({ 
        message: "데이터 처리 성공", 
        timetableName: timetableName,
        timetableDescription: timetableDescription
    });
});

router.post("/ProfessorProcess", (req, res) => {
    const { professors } = req.body;

    professors.forEach((professor, index) => {
        console.log(`교수 ${index + 1}:`, professor);
    });
    res.status(200).json({ 
        message: "데이터 처리 성공", 
        professors: professors,
    });
});

router.post("/ClassroomProcess", (req, res) => {
    const { classrooms } = req.body;
    console.log("ㅇㅇ");

    classrooms.forEach((classroom, index) => {
        console.log(`강의실 ${index + 1}:`, classroom);
    });
    res.status(200).json({ 
        message: "데이터 처리 성공", 
        classrooms: classrooms,
    });
});

router.post("/ClassroomGroupProcess", (req, res) => {
    const { groupInfo } = req.body;

    groupInfo.forEach((groupInfo, index) => {
        console.log(`그룹 ${index + 1}:`, groupInfo);
    });
    res.status(200).json({ 
        message: "데이터 처리 성공", 
        groupInfo: groupInfo,
    });
});

router.post("/LectureProcess", (req, res) => {
    const { lectures } = req.body;

    lectures.forEach((lectures, index) => {
        console.log(`강의 ${index + 1}:`, lectures);
    });
    res.status(200).json({ 
        message: "데이터 처리 성공", 
        lectures: lectures,
    });
});
module.exports = router;
