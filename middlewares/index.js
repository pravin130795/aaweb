const express = require('express');
const path = require('path');
const config = require('../configurations/config');

module.exports = function (app) {
	// Enable paths that we want to have it served statically
	if (config.get('server.enableStatic'))
		app.use(express.static(path.join(__dirname, config.get('server.staticDirectory'))));

	// Enable request logger
	require('./requestLog')(app);
};