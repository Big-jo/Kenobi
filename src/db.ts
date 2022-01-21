import "reflect-metadata";
import { createConnection } from "typeorm";
import { Tedis } from "tedis";
import logger from './shared/Logger';
import { Comment } from "./entities/Comment";

export async function intializeDB(): Promise<void> {
  try {
    // Credentials should be in environment variables, due to a bug, as a quick workaround, this is here.
    // DO NOT TRY THIS IN PROD
    await createConnection({
      url: "postgres://wzamuzgh:2msU2PDnm8Un0NZYk0Ek9JaeHjPfzaxg@rosie.db.elephantsql.com/wzamuzgh",
      type: "postgres"
  });
    logger.info('Database successfully initialized');

  } catch (error) {
    logger.error(error)
  }
}

// export function initializeCache(port: number | undefined): unknown {
//   const tedis = new Tedis({
//     port: port,
//     host: "127.0.0.1"
//   });

  // logger.info('Redis cache successfully initialized');
  // return tedis;
