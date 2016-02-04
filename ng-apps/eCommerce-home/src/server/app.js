/*jshint node:true*/
'use strict';

var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var compress     = require('compression');
var cors         = require('cors');
var favicon      = require('serve-favicon');
var fileServer   = require('serve-static');
var http         = require('http');
var proxy        = require('express-http-proxy');
var logger       = require('morgan');
var port         = process.env['EMTS_HOME_PORT'] || 7300;
var server;

var appDir =  __dirname + '../../'; // Our NG code is served from root
var environment = process.env.NODE_ENV;
var pkg = require('./../../package.json');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());            // Compress response data with gzip
app.use(logger('dev'));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(fileServer(appDir));    // Support static file content
//app.use(cors());                // enable ALL CORS requests

app.use('/etms/rest', proxy('http://ttmfrdd01.ebiz.verizon.com:12300', {
    forwardPath: function(req, res) {
        var reqPath = require('url').parse(req.url).path;
        console.log('Forwarded Path -> ' + reqPath);
        return '/etms/rest' + reqPath;
    }
}));

app.use('/etms/grizz', proxy('http://localhost:9998', {
    forwardPath: function(req, res) {
        var reqPath = require('url').parse(req.url).path;
        console.log('Forwarded Path -> ' + reqPath);
        return '/etms/grizz' + reqPath;
    }
}));

console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

if(environment === 'stage') {
    console.log('** STAGE **');
    app.use('/', express.static('./build/stage/'));
} else {
    console.log('** DEV **');
    app.use('/', express.static(pkg.paths.client));
    app.use('/', express.static('./'));

    app.get('/ping', function(req, res, next) {
        console.log(req.body);
        res.send('pong');
    });
}

server = http.createServer(app);

server.listen(port, function(){
    console.log('Express server listening on port ' + port);
    console.log('env = '+ app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd() );
});
