import "reflect-metadata";
import { createConnection } from "typeorm";
import { Tedis } from "tedis";
import logger from '../src/shared/Logger';
import { Comment } from "./entities/Comment";

export async function intializeDB(): Promise<void> {
  try {
    await createConnection()
    logger.info('Database successfully initialized');

  } catch (error) {
    logger.error(error)
  }
}

export function initializeCache(port: number | undefined): unknown {
  const tedis = new Tedis({
    port: port,
    host: "127.0.0.1"
  });

  logger.info('Redis cache successfully initialized');
  return tedis;
}