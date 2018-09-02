# Hello world API - Homework Assignment #1
This application has been built as my first homework assignment of the [Node.JS Master Class course](https://pirple.thinkific.com/courses/the-nodejs-master-class)

## What this api does and why?
Basically it responds the endpoint `/hello` with a message `{ "message": "Hello World" }` and status code 200 and every other endpoint with `error 404`.

The goal of this course is to learn how to use the native modules of the Node.JS and because of that I wasn't allowed to use third-part modules. That is why it is so simple. Because the goal here is to learn how to build a http server handler.

## Project structure
* `./index.js` : This file starts the node server;
* `./server` : This module contains the handler of the server, in other words how it handles the requests and does the responses;
* `./server/https/` : This folder contains the certificates and if you clone this repo it also contains the command line instruction to create your own certificates;
* `./controllers` : This module was created to allow expansion of the controllers and exports them as needed;
* `./controllers/hello` : This module is my hello world controller, basically it exports a function that is called from the `/server` module;
* `./config` : This module is responsible to export the configuration information. Basically we have the http and https ports.
* `./config/config.json` : This file contains the environments configurations that are used in the `./config` module.

## Https Server
To initialize the HTTPS server you will need to create your certificates. Just ensure that you have openssl installed and execute the command on `./server/https/command.txt`

## Start the server
To start the server you can do one of the follow from the `/`:

*Staging environment*
```
$ node index.js
```
```
$ NODE_ENV=staging node index.js
```

*Production environment*
```
$ NODE_ENV=production node index.js
```

### Why the two environments?
Again the goal here is not to put a hello world application in production of course but to learn how to deal with environment variables and how to use them to set different configurations.