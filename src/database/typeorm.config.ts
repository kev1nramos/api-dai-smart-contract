/**
 * Module dependencies.
 */

import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';


/**
 * Load the test environment file if we are running migrations
 * In  the tests environment
 */

const path = process.env.NODE_ENV === 'test' ? '.env.test' : process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production';
dotenv.config({ path });

/**
 * DataSourceConfig is responsable for the postgres setup with typeorm.
 */

export const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../models/*.entity{.ts,.js}'],
  migrationsTableName: 'typeorm-migrations',
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
});

/**
 * Export `DataSourceConfig`;
 */

// export const dataSource = new DataSource(dataSourceOptions);
