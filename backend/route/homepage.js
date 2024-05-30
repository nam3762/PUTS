/**
 * Mainpage.js
 * Login.js
 * Signup.js
 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
const mysql = require("mysql");
// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "puts.cjes4q80oazf.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "12341234",
  database: "puts",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패: ", err);
    return;
  }
  console.log("MySQL 연결 성공");
});

router.post("/loginProcess", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM user WHERE Email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("쿼리 실패: ", err);
        res.status(500).send("서버 에러");
        return;
      }

      if (results.length === 0) {
        res.status(401).send("Invalid email or password");
        return;
      }

      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.Password);

      if (!passwordIsValid) {
        res.status(401).send("Invalid email or password");
        return;
      }

      const token = jwt.sign({ id: user.Email }, SECRET_KEY, {
        expiresIn: 600,
      }); // 10 minutes

      res.status(200).send({ auth: true, token, nickname: user.Nickname });
    }
  );
});

router.post("/signupProcess", (req, res) => {
  const { email, nickname, password } = req.body;

  // 비밀번호 해싱
  const hashedPassword = bcrypt.hashSync(password, 8);

  // 사용자 데이터베이스에 삽입
  connection.query(
    "INSERT INTO user (Email, Nickname, Password) VALUES (?, ?, ?)",
    [email, nickname, hashedPassword],
    (err, results) => {
      if (err) {
        console.error("쿼리 실패: ", err);
        res.status(500).send("서버 에러");
        return;
      }
      res.status(201).send("회원가입 성공");
    }
  );
});

module.exports = router;
