const express = require("express");
const app = express();
require("dotenv").config({})
var cookieParser = require('cookie-parser')
app.use(cookieParser())
require("./db/conn")
const PORT = process.env.PORT
app.use(express.json())
app.use(require("./Router/auth"))
if (process.env.NODE_ENV == "production") {

    app.use(express.static("Client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'));
    })
}
app.listen(PORT);