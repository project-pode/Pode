const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

module.exports = logger;
