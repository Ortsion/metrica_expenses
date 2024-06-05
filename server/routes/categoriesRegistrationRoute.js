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
  const father = req.query.father;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  console.log("connection available");
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const query = "SELECT * FROM category WHERE userId = ? AND father = ?";

    db.query(query, [decoded.id, father], (err, result) => {
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

  const category = req.body.category;
  const father = req.body.father;

  // Verify the token
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const query =
      "INSERT INTO category (userId, name, displayOrder, father) VALUES (?,?,?,?)";

    db.query(query, [decoded.id, category, 0, father], (err, result) => {
      if (err) {
        console.log("Error executing MySQL query:", err);

        if (err.errno === 1062) {
          return res.status(422).json({
            error: {
              code: "DUPLICATE_VALUE",
              message: "The provided name or email already exists.",
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

// router.post("/", (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }
//   const category = req.body.category;
//   const father = req.body.father;
//   // Verify the token
//   jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     // const userID = decoded.id;
//     const query =
//       "INSERT INTO category (userId, name, displayOrder, father) VALUES (?,?,?,?)";

//     db.query(query, [decoded.id, category, 0, father], (err, result) => {
//       if (err) {
//         console.log("Error executing MySQL query:", err);
//         if (err.errno == 1062) {
//           res.status(422).json({
//             error: {
//               code: "DUPLICATE_VALUE",
//               message: "The provided name or email already exists.",
//             },
//           });

//           // return res.status(500).json({ message: "Duplicate Values Error" });
//         }
//         return res.status(500).json({ message: "Internal server error" });
//       }
//       res.json(result);
//     });
//   });
// });
