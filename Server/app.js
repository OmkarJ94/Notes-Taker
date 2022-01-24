const express = require("express");
const app = express();
require("dotenv").config({})
var cookieParser = require('cookie-parser')
app.use(cookieParser())
require("./db/conn")
const PORT =  5000
app.use(express.json())
app.use(require("./Router/auth"))

app.listen(5000);