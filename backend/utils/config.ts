import { config } from "dotenv";
// Load environment variables from a .env file into process.env
config();

// Read the port number from environment variables
// process.env.PORT will be populated from the .env file
const PORT = process.env.PORT;

// Read the secret key from environment variables
// process.env.SECRET will hold the secret key for JWT or other secure processes
const SECRET = process.env.SECRET;

// Set the MongoDB URI based on the environment
// If the environment is 'test', use the TEST_MONGODB_URI from the .env file
// Otherwise, use the regular MONGODB_URI for the database connection
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI  // For testing environment, use the test MongoDB URI
  : process.env.MONGODB_URI;      // For other environments, use the default MongoDB URI

// Export the variables so that they can be used in other parts of the application
export { config, PORT, MONGODB_URI, SECRET };