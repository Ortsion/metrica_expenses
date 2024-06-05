const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "metrica",
});

router.get("/", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  console.log("bucket route responsing");
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const query = "SELECT * FROM bucket WHERE userId = ?";

    db.query(query, [decoded.id], (err, result) => {
      if (err) {
        console.log("Error executing MySQL query:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json(result);
    });
  });
});

router.post("/", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const bucket = req.body.bucket;

  // Verify the token
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const query =
      "INSERT INTO bucket (userId, name, displayOrder) VALUES (?,?,?)";

    db.query(query, [decoded.id, bucket, 0], (err, result) => {
      if (err) {
        console.log("Error executing MySQL query:", err);

        if (err.errno === 1062) {
          return res.status(422).json({
            error: {
              code: "DUPLICATE_VALUE",
              message: "The provided bucket already exists.",
            },
          });
        }

        return res.status(500).json({ message: "Internal server error" });
      }

      // Only send a response here if there's no error
      res.json(result);
    });
  });
});

module.exports = router;

