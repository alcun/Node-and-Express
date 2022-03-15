var express = require('express');
var app = express();

console.log('Hello World')

// on get request at home serve the html file 
app.get("/", (req, res) => {
    res.sendFile(absolutePath = __dirname + "/views/index.html"
        );
  });

  //set up middleware
app.use(express.static(__dirname + "/public"))

// serve css

app.use("/public", express.static(__dirname + "/public") )


app.get("/json", (req, res) => {
    res.json({
        message: "Hello json"
    })
  });





















 module.exports = app;
