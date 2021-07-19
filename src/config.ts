import * as dotenv from "dotenv";

/**
 * This file is show you to import > .env < file from rootDir
 * and load them to global variables in OS(NodeJS.process),
 * then you can used like OS variable.
 */
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

export const PORT: number = parseInt(process.env.PORT as string, 10);