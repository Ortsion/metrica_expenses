const express = require('express');
const app =express();
const { verify } = require('jsonwebtoken');
const dotenv= require('dotenv');
const cors = require('cors');
const userRegisterRoutes = require('./routes/userRegister')
const loginRoute = require('./routes/login');
const protectedRoute =require('./routes/protectedRoute');
const categoriesRegistrationRoute =require('./routes/categoriesRegistrationRoute');
const expenseRegistrationRouter = require('./routes/expenseRegistrationRoute');

dotenv.config();
// const router = express.Router();
// const mysql = require('mysql');


// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'root',
//     database: 'metrica',
// });

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace with your domain
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/api/userRegister', userRegisterRoutes);
app.use('/api/login', loginRoute);
app.use('/api/categoriesRegistration', categoriesRegistrationRoute);
app.use('/api/protectedRoute', protectedRoute);
app.use('/api/expenseRegistration', expenseRegistrationRouter);

// app.get('/api/protectedRoute',(req, res) => {
//     res.send('hello from index/js')
// })


app.listen(3008, () =>{
    console.log("server is running on port 3008")
})

// public-token-test-76806a37-b0a2-4356-a8bb-f64b4f3c392f