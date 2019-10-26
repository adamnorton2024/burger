var express = require('express'); 

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static('/public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give server access to them
//var routes = require("./controllers/burgerController.js");

//app.use(routes);

//Start server listening
app.listen(PORT, function(){
    console.log("Server is listening on: http://localhost: " + PORT);
});