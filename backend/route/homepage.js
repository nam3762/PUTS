const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.js");
const { MongoClient } = require("mongodb");
const {
  connectDB,
  closeConnection,
  connectInput,
  connectOutput,
  connectUser
} = require("../db.js");

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
    const MONGO_URI = process.env.MONGO_URI;
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = await connectDB(client);
    const collection = await connectUser(db);
    await collection.insertOne(newUser);
    await closeConnection(client);
    res.status(201).send("회원가입 성공");
  } catch (err) {
    console.error("쿼리 실패: ", err);
    res.status(500).send("서버 에러");
  }
});

router.post("/loginProcess", async (req, res) => {
  const { email, password } = req.body;

  try {
    const MONGO_URI = process.env.MONGO_URI;
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = await connectDB(client);
    const collection = await connectUser(db);
    const user = await collection.findOne({ email }); // 사용자 찾기

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
    await closeConnection(client);
    res.status(200).send({ auth: true, token, nickname: user.nickname });
  } catch (err) {
    console.error("쿼리 실패: ", err);
    res.status(500).send("서버 에러");
  }
});

module.exports = router;
