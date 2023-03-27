const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const port = 80;
var messages = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({extended: true, limit: "1mb"}));
app.use("/site", express.static(__dirname + "/site"));

app.get("/", (req, res) => {
    res.redirect("./site/main.html");
});
app.get("/message", (req, res) => {
    const {login, message} = req.query;
    if (login && message) messages.push({login: login, message: message, time: new Date()});
    console.log(messages);
    res.status(200).json({login, message});
});
app.get("/handlemessage", (req, res) => {
    console.log("reuq");
    res.send(messages);
});

app.listen(port, () => {
    console.log(`Strona aktywna pod portem: ${port}`);
});
app.all("*", (req, res, next) => {
    console.log("req"); // do anything you want here
    next();
});
