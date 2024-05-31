const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('Project').collection('puts'); // 대소문자 구분하여 'Project'로 설정
  }
  return db;
}

module.exports = connectDB;
