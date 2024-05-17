const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/dbConfig");
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const PORT = 8000;
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles:true}));


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
