/**
 * Created by Massil on 13/01/2017.
 */
var express = require("express");
var session = require("express-session");
var app = express();

app.engine("html" , require("ejs").__express);

app.set("view engine" , "html");

app.use("/public" , express.static(__dirname + "/public"));
app.use(session({saveUninitialized : true, resave : true ,secret : "session-control"}));
app.use("/" , require("./controller"));

app.listen(1337 , function(){
    console.log("Server launched");
});