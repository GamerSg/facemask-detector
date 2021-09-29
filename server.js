"use strict";

const express = require("express");

var app = express();
var host = "localhost";
var port = 8080;
//var startPage = "index.html";
var startPage = "testMD.html";
//var startPage = "testFD.html";

function gotoIndex(req, res) {
    console.log("Loading test page");
    res.sendFile(__dirname + "/" + startPage);
}

app.get('/', gotoIndex);
app.use(express.static("./"));

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});
