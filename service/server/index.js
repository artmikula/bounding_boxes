const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = 3001;
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Testing... success");
});

app.get("/USERS/:username", async (req, res) => {
  let conn;
  const userID = req.params.username;
  try {
    conn = await db.getConnection();
    let query = `select * from USERS WHERE username="${userID}"`;
    let rows = await conn.query(query);
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.post("/verify", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let conn;
  try {
    conn = await db.getConnection();
    let query = `SELECT password FROM USERS WHERE username="${username}"`;
    let rows = await conn.query(query);

    bcrypt.compare(password, rows[0].password, (error, response) => {
      if (response) {
        res.send(response);
      } else {
        res.send({ message: "wrong password" });
      }
    });
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.post("/adduser", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let conn;
  conn = await db.getConnection();
  bcrypt.hash(password, saltRounds, (err, hash) => {
    let query = `INSERT into USERS (username, password) VALUES ("${username}", "${hash}")`;
    let rows = conn.query(query);
    res.send(rows);
  });
  if (conn) return conn.release();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
