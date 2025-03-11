import winston from 'winston';

// Create a logger instance using the winston library
const logger = winston.createLogger({
  // Define the logging level based on the environment
  // If the environment is 'test', set the log level to 'warn' to reduce verbosity during tests
  // In all other environments, set the log level to 'info' for normal logging
  level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',

  // Define the format of the logs to be simple (just log the message)
  // You can customize the format to include additional information, like timestamps, if needed
  format: winston.format.simple(),

  // Define where the logs will be output
  // In this case, the logs will be displayed in the console
  transports: [
    new winston.transports.Console()  // Logs will be printed to the console
  ],
});

// Export the logger instance for use in other parts of the application
export default logger;