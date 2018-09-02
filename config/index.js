const config = require('./config.json');

const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : 'staging';

module.exports = typeof(config[currentEnvironment]) == 'object' ? config[currentEnvironment] : config['staging'];