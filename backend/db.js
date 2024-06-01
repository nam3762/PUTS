const { MongoClient } = require("mongodb");
require("dotenv").config();

async function connectDB(client) {
  let db;
  if (!db) {
    await client.connect();
    db = client.db('puts');
    console.log("MongoDB 연결 성공");
  }
  return db;
}

async function closeConnection(client) {
  await client.close();
  console.log("MongoDB 연결 종료");
}

async function connectInput(db) {
  return db.collection('input');
}

async function connectOutput(db) {
  return db.collection('output');
}

async function connectUser(db) {
  return db.collection('user');
}

module.exports = {
  MongoClient,
  connectDB,
  closeConnection,
  connectInput,
  connectOutput,
  connectUser
};
