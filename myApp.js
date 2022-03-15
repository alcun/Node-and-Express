var express = require("express");
var app = express();
require("dotenv").config()

// request logger 
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})
console.log("Hello World");

//chain middleware to create a time server 

const newCurrentTimeString = () => {
    return new Date().toString();

}


app.get('/now', (req, res, next) => {
    req.time = newCurrentTimeString();
    console.log("Time Request: Method: " + req.method + " Path: " + req.path + " ip: " + req.ip);
    console.log("The Time Is: " + req.time);
    next();
},
  (req, res) => {
    res.json({"Time": req.time});
  }
)



// on get request at home serve the html file
app.get("/", (req, res) => {
  res.sendFile((absolutePath = __dirname + "/views/index.html"));
});

//set up middleware
app.use(express.static(__dirname + "/public"));

// serve css

app.use("/public", express.static(__dirname + "/public"));

//our get route handler
app.get("/json", (req, res) => {
  //set json obj as var
  var jsonResponse = { "message": "Hello json" };
  //if our .env var is uppercase the perform the method
  if (process.env.MESSAGE_STYLE === "uppercase") {
    jsonResponse.message = jsonResponse.message.toUpperCase();
  }
  //response object is var with uppercase applied or not
  res.json(jsonResponse);
});

module.exports = app;
