var util = require('util');
var _ = require('lodash');
var csrf = require('csurf');
var constants = require('../utils/constants');
var logger = require('../utils/logger');
var user = require('../users/user-model');
var config = require('../configurations/config');

module.exports = function(app) {
	// Check header for csrf token
	app.use(function(req, res, next) {
		// change for crate customer API, date: 08-09-2016
		// done by: Ishani Raval, suggested by Sanjay Patel
		// createCustomer API can call without authentication header
		if (req.method.toLowerCase() === 'post' && (req.url.toLowerCase().indexOf('outlook/createactivity') >= 0 || req.url.toLowerCase().indexOf('outlook/insertexception') >= 0 || req.url.toLowerCase().indexOf('customer/getcustomerlistforexport') >= 0 || req.url.toLowerCase().indexOf('customer/updatesanktioncustomerstatus') >= 0)) {
			next();
		} else if (req.method.toLowerCase() === 'post' && _.isUndefined(req.header('x-xsrf-token'))) {
			logger.warn('request without token  from: ' + req.url);
			res.status(403).send({
				code : 4006,
				messageKey : constants.messageKeys.code_4006,
				data : {}
			});
		} else {
			next();
		}
	});

	// Intialize CSRF middleware
	app.use(csrf());

	app.use(function(req, res, next) {
		logger.info(util.format('Request: URL:%s - SessionID:%s', req.url, req.sessionID));
		var token = req.csrfToken();
		// for web and mobile application
		res.header('XSRF-TOKEN', token);

		// change for crate customer API, date: 08-09-2016
		// done by: Ishani Raval, suggested by Sanjay Patel
		// createCustomer API can call without authentication header
		if (req.method.toLowerCase() === 'post' && (req.url.toLowerCase().indexOf('outlook/createactivity') >= 0 || req.url.toLowerCase().indexOf('outlook/insertexception') >= 0 || req.url.toLowerCase().indexOf('customer/getcustomerlistforexport') >= 0 || req.url.toLowerCase().indexOf('customer/updatesanktioncustomerstatus') >= 0)) {
			next();
		} else if (req.method.toLowerCase() === 'get' && req.isAuthenticated()) {
			if (req.url.indexOf('machine/downloadDocument') >= 0 || req.url.indexOf('/downloadReport') >= 0) {
				// Valid user
				next();
			} else if (!_.isUndefined(req.header('x-xsrf-token'))) {
				// Valid user
				next();
			} else if (req.isAuthenticated()) {

				// Something went wrong
				user.logout(req.userName).then(function(status) {
					req.logout();
					for ( var cookie in req.cookies) {
						res.clearCookie(cookie);
					}
					req.session.destroy();
					res.status(200).end();
				}, function(error) {
					res.status(500).send({
						code : 5000,
						messageKey : constants.messageKeys.code_5000,
						data : {}
					});
				});
			}
		} else {
			next();
		}
	});

	app.use(function(error, req, res, next) { // change for crate customer API, date: 08-09-2016 // done by: Ishani Raval, suggested by Sanjay Patel //
		// createCustomer API can call without authentication header
		if (req.method.toLowerCase() === 'post' && (req.url.toLowerCase().indexOf('outlook/createactivity') >= 0 || req.url.toLowerCase().indexOf('outlook/insertexception') >= 0 || req.url.toLowerCase().indexOf('customer/getcustomerlistforexport') >= 0 || req.url.toLowerCase().indexOf('customer/updatesanktioncustomerstatus') >= 0)) {
			next();
		} else {
			if (error.code !== 'EBADCSRFTOKEN') {
				return next(error);
			}
			logger.warn('possible CSRF attack detected');
			res.status(403).send({
				code : 4005,
				messageKey : constants.messageKeys.code_4005,
				data : {}
			});
		}
	});

};