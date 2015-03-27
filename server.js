var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 8000;

//app.get("/", function (req, res) {
//  res.redirect("/index.html");
//});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/src'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/vendor', express.static(__dirname + '/vendor'));

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

console.log("WebSite running on http://localhost:" + port);
app.listen(port);
