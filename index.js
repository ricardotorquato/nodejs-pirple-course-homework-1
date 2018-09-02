/**
 * This application has been built as my first homework assignment of the Node.JS Master Class course
 * https://pirple.thinkific.com/courses/the-nodejs-master-class
 * 
 * The goal is to build a "Hello World" Api.
 * The Api just need to have a /hello endpoint (no matter the http method). 
 * No third-part modules are allowed. I can only use node native modules.
 * 
 */

 // importing the http and https server
const http = require('http');
const https = require('https');

// Our handler of the http and https server is here
const server = require('./server');

// importing our configurations too
const config = require('./config');

// importing fs module to read the certificates
const fs = require("fs");

// creating the HTTP Server first
const httpServer = http.createServer(server.handleRequests);

// Now we create the HTTPS Server
// To do so we will need to configure the certificates
const httpsServerOptions = {
    key : fs.readFileSync('./server/https/key.pem'),
    cert : fs.readFileSync('./server/https/cert.pem'),
};

const httpsServer = https.createServer(httpsServerOptions, server.handleRequests);

// Now we start the servers
httpServer.listen(config.httpPort, () => {
    console.log('The HTTP server is listening on port ' + config.httpPort);
});

httpsServer.listen(config.httpsPort, () => {
    console.log('The HTTPS server is listening on port ' + config.httpsPort);
});