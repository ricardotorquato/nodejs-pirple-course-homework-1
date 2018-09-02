// Used to get the url information
const url = require('url');
// Used to parse the payload (using UTF-8)
const decoder = require('string_decoder').StringDecoder('utf-8');

const server = {
    routes: require('./routes'),

    handleRequests: (req, res) => {
        // First we need to get the parsed url of the request
        // The second parameter is used to parse the query string
        const parsedUrl = url.parse(req.url, true);

        // Now we need to get the path
        // It will be used to know what "route" has been called
        // And we will remove start and end slashs with regular expression
        const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

        // treating the path and give the return
        // First we need to see if the route choosed exists
        // If not we will sent a default 404 error
        const handler = typeof(server.routes[path]) == 'function' ? server.routes[path] : (data, callback) => {
            const errorMessage = {
                'error': 'The endpoint /' + data.path + ' does not exist'
            };

            callback(errorMessage, 404);
        };

        // We need to build the data we will send to the "controllers"
        // To do so we will get some more information as query string, headers, http method and payload
        // This example does not use none of this inside the controller
        // but it is a good thing to get the server ready to work with this
        const query = parsedUrl.query;
        const headers = req.headers;
        const method = req.method.toLowerCase();
        let bufferPayload = '';

        // The payload come in pieces to the server
        // Every pieces that arrives trigger this 'data' event
        // And then we will building our payload
        req.on('data', (data) => { bufferPayload += decoder.write(data); });

        // When the process finishes another event is triggered, the 'end'
        // And then we can continue our process
        req.on('end', () => {
            // building our data object
            const data = {
                path, query, headers, method,
                payload : bufferPayload
            };

            // calling our handler
            // Some of our controller or the 404 function
            handler(data, (payload, statusCode) => {
                // Setting the defaults
                payload = typeof(payload) === 'object' ? payload : {};
                statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

                // We need to say to the client that we are using json to response
                res.setHeader('Content-type', 'application/json');

                // Defining the http status code
                res.writeHead(statusCode);
                
                // Finnaly we can send the message
                const payloadString = JSON.stringify(payload);
                res.end(payloadString);
            });
        });
    },
};

module.exports = server;