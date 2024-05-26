const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.SECRET_KEY;

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "puts",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패: ", err);
    return;
  }
  console.log("MySQL 연결 성공");
});

// 사용자 로그인
app.post("/login", (req, res) => {
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
        expiresIn: 86400,
      }); // 24 hours

      res.status(200).send({ auth: true, token, nickname: user.Nickname });
    }
  );
});

// JWT 미들웨어 작성
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("토큰이 제공되지 않았습니다.");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send("토큰 인증 실패");
    }

    req.userId = decoded.id;
    next();
  });
};

// 보호된 라우트 설정
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).send("이것은 보호된 라우트입니다.");
});

// 사용자 회원가입
app.post("/signup", (req, res) => {
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

// 서버 시작
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 시작되었습니다.`);
});
