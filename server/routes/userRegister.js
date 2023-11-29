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

const hashPassword = (password) => {
  const hashed = bcrypt.hash(password, 10);
  // console.log(hashed);
  return hashed;
};
router.post("/", async (req, res) => {
  const companyName = req.body.companyName;
  const email = req.body.email;
  const password = await hashPassword(req.body.password);
  const token = req.body.token;
  const date = req.body.date;

  try {
    db.query(
      "INSERT INTO user (CompanyName, Email, Password, Token, CreateDate) VALUES (?,?,?,?,?)",
      [companyName, email, password, token, date],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        } else {
          const id = result.insertId; // Assuming your ID is auto-incremented
          const expirationDate =
            Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60 * 100; // 365 days/year * 24 hours/day * 60 minutes/hour * 60 seconds/minute
          const token = jwt.sign(
            { id, exp: expirationDate },
            process.env.SECRET_TOKEN
          );

        //   console.log("insertion success", "id = result.id: ", id);
        //   res.send(result.data);
        return res.status(200).json({
            message: "Login Successful",
            token: token,
            id: id,
        })
        }
      }
    );
  } catch (err) {
    console.log("Error: ", err);
  }
});

module.exports = router;
