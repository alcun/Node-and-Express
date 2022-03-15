var express = require('express');
var app = express();

console.log('Hello World')

app.get("/", (req, res) => {
    res.sendFile(absolutePath = __dirname + "/views/index.html"
        );
  });




























 module.exports = app;
