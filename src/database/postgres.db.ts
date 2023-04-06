/**
 * Module dependencies.
 */

import { Logger } from '../config';
import { myDataSource } from './typeorm.config';

const start = () => {
    myDataSource
    .initialize()
    .then(() => Logger.info('Database has been initialized!'))
    .catch((error) => Logger.error('Error during database initialization: ', error));
};

/**
 * Export PostgresDB;
 */

export const PostgresDB = {
  start,
};
