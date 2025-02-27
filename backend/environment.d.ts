import { Secret } from "jsonwebtoken";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGODB_URI: string;
        NODE_ENV: 'development' | 'production' | 'test';
        PORT?: string;
        SECRET: Secret;
      }
    }
  }
  export {};