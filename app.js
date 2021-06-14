const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var session = require('express-session');
const userRoutes = require("./routes/user");
const casRoutes = require("./routes/cas");
const eventRoutes = require("./routes/event");
const app = express();

mongoose
    .connect(
        "mongodb://127.0.0.1:27017/giveBD"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


app.use("/api/user", userRoutes);
app.use("/api/cas", casRoutes);
app.use("/api/event", eventRoutes);
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app;
