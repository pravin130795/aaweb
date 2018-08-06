const convict = require('convict');
const fs = require('fs');

let config = convict({
	env: {
		doc: 'The applicaton environment.',
		format: ['production', 'development', 'local'],
		default: 'local',
		env: 'NODE_ENV',
		arg: 'env'
	},
	server: {
		port: {
			doc: 'HTTP port to bind',
			format: 'port',
			default: 8081,
			env: 'PORT'
		},
		enableStatic: {
			doc: 'Enable Express static server',
			format: Boolean,
			default: true
		},
		staticDirectory: {
			doc: 'Path To Static Directory',
			format: String,
			default: 'public'
		}
	},
	logger: {
		httpLogFormat: {
			doc: 'HTTP log format',
			format: String,
			default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] | :response-time ms ":referrer" ":user-agent"'
		},
		httpLogFileName: {
			doc: 'HTTP log File name',
			format: String,
			default: 'http.log'
		},
		logFileName: {
			doc: 'Log File name',
			format: String,
			default: 'logs.log'
		},
		exceptionLogFileName: {
			doc: 'Exception log File name',
			format: String,
			default: 'exceptions.log'
		},
		logFileSize: {
			doc: 'logs File Max File size',
			format: Number,
			default: 5242880
		}
	}
});

config.loadFile('./configurations/config-' + config.get('env') + '.json');

config.set('logger.httpLogFileName', config.get('logger.path') + config.get('logger.httpLogFileName'));
config.set('logger.logFileName', config.get('logger.path') + config.get('logger.logFileName'));
config.set('logger.exceptionLogFileName', config.get('logger.path') + config.get('logger.exceptionLogFileName'));

// validate
config.validate();

module.exports = config;