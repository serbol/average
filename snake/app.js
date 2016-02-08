
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , game = require('./routes/game')
  , result = require('./routes/result')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

app.locals.jsonNames = require('./names.json');
app.locals.result = "0";

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/jsonload', function(request, response) {
	app.locals.newname = Object.keys(request.body)[0];
});
app.post('/resultload', function(request, response) {
	app.locals.result = Object.keys(request.body)[0];
	app.locals.jsonNames.names.push({name: app.locals.newname, result: app.locals.result});
	fs.writeFileSync("./names.json", JSON.stringify(app.locals.jsonNames));
});

app.get('/', routes.index);
app.get('/game', game.index);
app.get('/result', result.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
