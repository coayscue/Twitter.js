var express = require( 'express' );
var app = express();
var morgan = require('morgan');
var swig = require("swig");
var routes = require("./routes/");


swig.setDefaults({ cache: false });

app.use(morgan("dev"));

app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname+"/views");

app.use("/", routes);

app.use(express.static(__dirname+'/public'));

var server = app.listen(3000, function () {

 	var host = server.address().address;
	var port = server.address().port;

 	console.log('Example app listening at http://%s:%s', host, port);

});

