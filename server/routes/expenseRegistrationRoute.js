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
        const father= req.query.father;
        console.log('data from categories route: params: ', req.query.father);
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
      
        // Verify the token
        console.log("got the token from the user");
         jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
          if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        
    });
});

router.post('/', (req, res) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const category = req.body.category;
        const father = req.body.father;
        const expenseDate =req.body.expenseDate;
        const amount =req.body.amount;
        const description =req.body.description;
        const taxRefund =req.body.taxRefund;
        const recordDate =req.body.recordDate;
        const primary =req.body.primary;
        const isDeductibleVAT =req.body.isDeductibleVAT;
        const comment = req.body.comment;
        const bucket = req.body.bucket;
        fixOrVar= req.body.fixOrVar;

        console.log("Values arrive to the server from expense reg: ", req.body)

        // Verify the token
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        const userID = decoded.id;
        const query = 'INSERT INTO expense (userId, categoryId, expenseDate, recordDate, amount, description, taxRefund, father, primaryCategory, DeductibleVAT, comment, bucket, fixOrVar) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        console.log("Category value from request:", category);
        const categoryValue = category !== '' ? category : null;
        console.log("Category value: ", categoryValue);
        db.query(query, [userID, categoryValue, expenseDate, recordDate, amount, description, taxRefund, father, primary, isDeductibleVAT, comment, bucket, fixOrVar], (err, result) => {
                if (err) {
                        console.log('Error executing MySQL query:',err);
                        return res.status(500).json({ message: 'Internal server error' })
                    }
                    res.json(result);
                })
                
                // console.log("data from expense route: ", 'user id: ',userID, req.body);
            });
        });
        
        
        module.exports = router;