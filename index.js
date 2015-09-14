/**
 * Created by Dell on 2015/9/7.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    //Router
    routes = require('./routes/index');

var app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');


var port = 3000;
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', routes);
/*app.get('/',function(req,res){
    res.json(kb);
    res.end();
});*/
var server = http.createServer(app);

server.listen(port);