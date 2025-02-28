import { config } from "dotenv";
config();

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;
  

export {config, PORT, MONGODB_URI, SECRET};