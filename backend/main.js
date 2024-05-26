const express = require("express");
const app = express();

// Middle-ware definition
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const compression = require("compression"); // network data interaction compressor
app.use(compression());
const helmet = require("helmet"); // Base security
app.use(helmet());
const dotenv = require("dotenv");
dotenv.config();

/*Page as routes*/
const homepageRouter = require("./route/homepage.js");
app.use("/", homepageRouter);
const createRouter = require("./route/create.js");
app.use("/create", createRouter);
const userRouter = require("./route/user.js");
app.use("/user", userRouter);
const generateRouter = require("./route/generate.js");
app.use("/generate", generateRouter);

/**
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
*/

/*Error page*/
app.use((request, response, next) => {
  response.status(404).send("404 not found");
});

app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).send("Something broke!");
});

var port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
