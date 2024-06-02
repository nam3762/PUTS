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
    res.status(200).json({ 
        message: "TimetableManageProcess 데이터 처리 성공", 
        timetableName: timetableName,
        timetableDescription: timetableDescription
    });
});

router.post("/ProfessorProcess", (req, res) => {
    const { professors } = req.body;
    res.status(200).json({ 
        message: "ProfessorProcess 데이터 처리 성공", 
        professors: professors,
    });
});

router.post("/ClassroomProcess", (req, res) => {
    const { classrooms } = req.body;
    res.status(200).json({ 
        message: "ClassroomProcess 데이터 처리 성공", 
        classrooms: classrooms,
    });
});

router.post("/ClassroomGroupProcess", (req, res) => {
    const { groupInfo } = req.body;
    res.status(200).json({ 
        message: "ClassroomGroupProcess 데이터 처리 성공", 
        groupInfo: groupInfo,
    });
});

router.post("/LectureProcess", (req, res) => {
    const { lectures } = req.body;
    res.status(200).json({ 
        message: "LectureProcess 데이터 처리 성공", 
        lectures: lectures,
    });
});
module.exports = router;
