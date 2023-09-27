const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'metrica',
});

const hashPassword = (password) => {
    const hashed =  bcrypt.hash(password, 10);
    console.log(hashed);
    return hashed;
} 
router.post('/', async (req, res) => {
    const companyName= req.body.companyName;
    const email= req.body.email;
    const password= await hashPassword (req.body.password);
    const token= req.body.token;
    const date= req.body.date;
    try{
        db.query('INSERT INTO user (CompanyName, Email, Password, Token, CreateDate) VALUES (?,?,?,?,?)',
        [companyName, email, password, token, date], (err, result) => {
            if (err) {console.log(err);}
            else {
                console.log('insertion success');
                res.send(result.data)
            }
        })
    } catch ( err ) {console.log('Error: ', err);}
});

module.exports = router;