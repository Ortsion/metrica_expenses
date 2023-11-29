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

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.Password, (bcryptErr, isPasswordValid) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (isPasswordValid) {
        const id = results[0].ID;
        const expirationDate =
          Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60 * 100; // 365 days/year * 24 hours/day * 60 minutes/hour * 60 seconds/minute
        // const token = jwt.sign({ id, exp: expirationDate }, process.env.SECRET_TOKEN);
        const token = jwt.sign(
          { id, exp: expirationDate },
          process.env.SECRET_TOKEN
        );

        return res.status(200).json({
          message: "Login successful",
          auth: true,
          token: token,
          results: results,
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
          auth: false,
        });
      }
    });
  });
});

module.exports = router;
