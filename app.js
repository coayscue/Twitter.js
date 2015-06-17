var express = require( 'express' );
var app = express();
var morgan = require('morgan');
var swig = require("swig");

swig.setDefaults({ cache: false });

app.use(morgan("dev"));

app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set("views", process.cwd()+"/views");

app.get('/', function (req, res) {
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );
});

app.get("/news", function(req, res){
	res.send("news!");
});

var server = app.listen(3000, function () {

 	var host = server.address().address;
	var port = server.address().port;

 	console.log('Example app listening at http://%s:%s', host, port);

});


