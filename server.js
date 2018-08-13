﻿// Import required external node modules
const http = require('http');
const express = require('express');
const path = require('path');
const util = require('util');
const config = require('./configurations/config');
const logger = require('./utils/logger');
const middlewares = require('./middlewares/index');
let app = express();

// set port.
app.set('port',process.env.PORT || 8080);

// required to get client IP when running via reverse proxy (HA proxy)
app.set('trust proxy', true);

// setup middlewares
middlewares(app);

app.use('/', express.static(path.join(__dirname + '/public')));

// start http server
let server = http.createServer(app).listen(app.get('port'), function () {
	//logger.info(util.format('ALGHANIM Web App with pid: %s listening on port: %s', process.pid, app.get('port')));
	//logger.info(util.format('Environment: %s', config.get('env')));
});

process.on('uncaughtException', function (e) {
	//logger.error(util.format('uncaught exception:- ', e.stack));
});

server.timeout = 600000;