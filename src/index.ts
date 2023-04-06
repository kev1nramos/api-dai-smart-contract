/**
 * Module dependencies.
 */

import dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV}`) });
import { PostgresDB } from './database/postgres.db';
import { Web3Service } from './services';
import { Logger } from './config/logger';
import app from './app';

/**
 * Constants.
 */

let server: any;

/**
 * Start application.
 */

(() => {
  try {
    process.on('uncaughtException', (ex) => {
      Logger.error('Unhandled error', ex);
    })

    server = app.listen('3000', async () => {
      // Start all apps inside
      Logger.info(`Starting tessera-code-challenge app, in env: ${process.env.NODE_ENV}, listening to port ${process.env.PORT}`);
      PostgresDB.start();
      await Web3Service.getLast24hBlocks();
      await Web3Service.subscribe();
    })

  } catch (error) {
    Logger.error('The server crash...', error);
  }
})();
