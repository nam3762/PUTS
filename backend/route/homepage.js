// homepage.js 파일
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.js");
const connectDB = require("../db.js");

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/signupProcess", async (req, res) => {
  const { email, nickname, password } = req.body;

  // 비밀번호 해싱
  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = new User({
    email,
    nickname,
    password: hashedPassword,
    user_input_no: []
  });

  try {
    const db = await connectDB();
    await db.insertOne(newUser);
    res.status(201).send("회원가입 성공");
  } catch (err) {
    console.error("쿼리 실패: ", err);
    res.status(500).send("서버 에러");
  }
});

router.post("/loginProcess", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectDB(); // MongoDB와 연결된 데이터베이스 가져오기
    const user = await db.findOne({ email }); // 사용자 찾기

    if (!user) {
      return res.status(401).send("Invalid email");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user.email }, SECRET_KEY, {
      // expiresIn: 600,
    });

    res.status(200).send({ auth: true, token, nickname: user.nickname });
  } catch (err) {
    console.error("쿼리 실패: ", err);
    res.status(500).send("서버 에러");
  }
});

module.exports = router;
