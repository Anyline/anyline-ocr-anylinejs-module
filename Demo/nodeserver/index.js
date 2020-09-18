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
var port = process.argv.slice(2)[1] ? process.argv.slice(2)[1] : 8443;

var servedir = path.join(__dirname, dirname);

console.log("\n *** Serving\n\tDirectory:", servedir, "\n\tPort:", port,  "\n\tURL: https://127.0.0.1:" + port);

app.use(serveIndex(servedir));
app.use(express.static(servedir)); 

httpsServer.listen(port);