var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var serveIndex = require('serve-index');


var privateKey  = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, 'server.cert'), 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var dirname = process.argv.slice(2)[0];

var servedPath = path.join(__dirname, dirname)

console.log("Serving", servedPath);

app.use(serveIndex(servedPath));
app.use(express.static(servedPath)); 

httpServer.listen(8080);
httpsServer.listen(8443);