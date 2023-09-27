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