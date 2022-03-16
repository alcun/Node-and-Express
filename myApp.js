var express = require("express");
var app = express();
var bodyParser = require('body-parser');

require("dotenv").config()

// request logger 
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})
console.log("Hello World");


//using body-parser to parse post requests 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/parsed-body-info", (res, req, next) => {
    console.log(bodyParser)
})








//set a function to get a current time stamp

const newCurrentTimeString = () => {
    return new Date().toString();

}

//chain middleware to create a time server 

app.get('/now', (req, res, next) => {
    req.time = newCurrentTimeString();
    console.log("Time Request: Method: " + req.method + " Path: " + req.path + " ip: " + req.ip);
    console.log("The Time Is: " + req.time);
    next();
},
  (req, res) => {
    res.json({time: req.time});
  }
)

//function to display route parameter as json 

app.get("/:word/echo", (req, res, next) => {
    userWord = req.params.word;
    console.log("Echoing Your Word: " + userWord)
    next();
},   (req, res) => {
    res.json({echo: req.params.word});
  }
    
)

//get query parameter input from client + return data in json correct full name format

app.get("/name", (req, res, next) => {
        console.log(req.query)
        firstName = req.query.first;
        lastName = req.query.last;
        console.log("Query Input: " + firstName + " " + lastName)
        res.json({name: firstName + " " + lastName});
    }

)

//get data from POST requests - body payload + return in json

app.post("/name", (req, res) => {
    res.json({name: req.body.first + " " + req.body.last});
})


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
