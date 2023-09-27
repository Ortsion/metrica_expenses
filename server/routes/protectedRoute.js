const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "metrica",
});


router.get('/', (req, res) => {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
      
        // Verify the token
        console.log('token from user: ', token);
         jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
          if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        //   console.log(decoded);
        res.json({ message: 'Protected resource accessed',  user: decoded.id });
    });
})

module.exports = router;


// router.post("/", async (req, res) => {
    
//         const { email, password } = req.body;
      
//         const query = 'SELECT * FROM user WHERE email = ?';
      
//         db.query(query, [email], (err, results) => {
//           if (err) {
//             console.error('Error executing MySQL query:', err);
//             return res.status(500).json({ message: 'Internal server error' });
//           }
      
//           if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//           }
      
//           const user = results[0];
          
//           bcrypt.compare(password, user.Password, (bcryptErr, isPasswordValid) => {
//               if (bcryptErr) {
//               console.error('Error comparing passwords:', bcryptErr);
//               return res.status(500).json({ message: 'Internal server error' });
//             }
            
//             if (isPasswordValid) {

//                 const id = results[0].ID;
//                 const token = jwt.sign({id}, process.env.SECRET_TOKEN, {
//                     expiresIn: '1h',
//                 } )

//               return res.status(200).json({ 
//                 message: 'Login successful',
//                 auth: true,
//                 token: token,
//                 results: results,
//             });
//             } else {
//                 return res.status(401).json({ 
//                     message: 'Invalid email or password',
//                     auth: false,
//                 });
//             }
//           });
//         });
      
      
// });


// const verifyJWT = (req, res, next) => {
//     const token = req.headers[x-access-token];

//     if(!token) {
//         res.send("u need a token, try another time")
//     } else {
//         jwt.verify(token, process.dotenv.access.SECRET_TOKEN, (err, res) => {
//             if(err) {
//                 res.json({ auth: false , message: "u failed to authenticate"})
//             } else {
//                 req.userID = dacoded.id;
//                 next();
//             }
//         })
//     }
// }

// app.get('/api/isUserAuth', verifyJWT, (req, res) => {
//     res.send ("u r authenticated!!")
// })

